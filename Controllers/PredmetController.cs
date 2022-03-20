using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace WebProjekat_Nova_verzija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PredmetController : ControllerBase
    {
      public OrganizacijaDomaContext Context {get; set;}
        public PredmetController(OrganizacijaDomaContext context)
        {
            Context=context;
        }
        [Route("PremestiPredmet/{idPredmeta}/{idObjekta}")]
        [HttpPut]
        public async Task<ActionResult> PremestiPredmet(int idPredmeta,int idObjekta)
        {
             try
            {
                Predmet predmet=Context.Predmeti.Where(p => p.ID == idPredmeta).FirstOrDefault();
                ObjekatZaSmestanje objekat=Context.ObjektiZaSmestanje.Where(o => o.ID == idObjekta).FirstOrDefault();

                if(predmet!=null && objekat!=null)
                {
                    if(predmet.Smesten != objekat)
                    {
                        predmet.Smesten=objekat;
                        Context.Predmeti.Update(predmet);
                    
                        await Context.SaveChangesAsync();
                    }
                     return Ok("Predmet je premesten"); 
                }
                else if(predmet==null) 
                    return BadRequest("Predmet nije pronadjen");
                else
                    return BadRequest("Objekat za smestanje nije pronadjen");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodajPredmet/{naziv}/{idObjekta}")]
        [HttpPost]
        public async Task<ActionResult> DodajPredmet (string naziv,int idObjekta)
        {
            if(naziv.Length>80)
                return BadRequest("Naziv predmeta ne sme biti duzi od 80 karaktera");
            try
            {
                ObjekatZaSmestanje objekat=Context.ObjektiZaSmestanje.Where(s => s.ID == idObjekta).FirstOrDefault();
                if(objekat!= null)
                {
                    Predmet predmet=new Predmet();
                    predmet.Naziv=naziv;
                    predmet.Smesten=objekat;

                    await Context.Predmeti.AddAsync(predmet);
                    await Context.SaveChangesAsync();
                    return Ok(predmet.ID);
                }
                else return BadRequest("Nije pronadjen objekat za smestanje");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("UkloniPredmet/{idPredmeta}")]
        [HttpDelete]
        public async Task<ActionResult> UkloniPredmet(int idPredmeta)
        {
            try
            {
            Predmet predmet=Context.Predmeti.Where(p=> p.ID==idPredmeta).FirstOrDefault();
            if(predmet!=null)
            {
             Context.Predmeti.Remove(predmet);
             await Context.SaveChangesAsync();
             return Ok("Predmet je uklonjen");
            }
            else
             return BadRequest("Predmet nije pronadjen");

            }
             catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
        [Route("PronadjiPredmet/{idPredmeta}")]
        [HttpGet]
        public async Task<ActionResult> PronadjiPredmet(int idPredmeta)
        {
            try
            {
                var predmeti= Context.Predmeti.Where(p=> p.ID==idPredmeta);
                if(predmeti.Count()==0)
                    return BadRequest("Predmet nije pronadjen");
                else  return Ok(await predmeti.Select(q=>q.Smesten.ID ).ToListAsync()); 
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PreuzmiPredmete/{idKorisnika}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiPredmete(int idKorisnika)
        {
             try
            {
                var predmeti=Context.Predmeti
                    .Include(p=>p.Smesten)
                    .ThenInclude(p=>p.Korisnik);
                
               return Ok(await predmeti.Where(p=>p.Smesten.Korisnik.ID==idKorisnika).Select(p=>
                    new
                    {
                        ID=p.ID,
                        Naziv=p.Naziv,
                        ObjekatID=p.Smesten.ID
                    }
                    ).ToListAsync()
                ); 
             }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}