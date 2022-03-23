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
    public class ObjekatZaSmestanjeController : ControllerBase
    {
      public OrganizacijaDomaContext Context {get; set;}
        public ObjekatZaSmestanjeController(OrganizacijaDomaContext context)
        {
            Context=context;
        }
         [Route("PremestiObjekatZaSmestanje/{idObjekta}/{idSobe}")]
        [HttpPut]
        public async Task<ActionResult> PremestiObjekatZaSmestanje(int idObjekta,int idSobe)
        {
             try
            {
                ObjekatZaSmestanje objekat=Context.ObjektiZaSmestanje.Where(o => o.ID == idObjekta).FirstOrDefault();
                Soba soba=Context.Sobe.Where(s => s.ID == idSobe).FirstOrDefault();
                if(objekat!=null && soba!=null)
                {
                    if(objekat.Soba != soba)
                    {
                        objekat.Soba=soba;
                        Context.ObjektiZaSmestanje.Update(objekat);

                        await Context.SaveChangesAsync();
                    }
                   return Ok($"Objekat za smestanje je premesten u sobu: {objekat.Soba.Naziv}");
                }
                else if(objekat==null) 
                    return BadRequest("Objekat za smestanje nije pronadjen");
                else
                    return BadRequest("Soba nije pronadjena");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("DodajObjekatZaSmestanje/{opis}/{boja}/{idTipa}/{idSobe}/{idKorisnika}")]
        [HttpPost]
         public async Task<ActionResult> DodajObjekatZaSmestanje (string opis,string boja,int idTipa,int idSobe,int idKorisnika)
         {
            if(opis.Length>80)
             return BadRequest("Opis objekta za smestanje ne sme biti duzi od 80 karaktera");

             try
            {
                Soba soba=Context.Sobe.Where(s => s.ID == idSobe).FirstOrDefault();
                TipObjektaZaSmestanje tip=Context.TipoviObjekataZaSmestanje.Where(t => t.ID == idTipa).FirstOrDefault();
                Korisnik korisnik =Context.Korisnici.Where(k => k.ID == idKorisnika).FirstOrDefault();
                if(tip!=null && soba!=null && korisnik!=null)
                {
                    ObjekatZaSmestanje objekat=new ObjekatZaSmestanje();
                    objekat.Opis=opis;
                    objekat.Boja=boja;
                    objekat.Tip=tip;
                    objekat.Soba=soba;
                    objekat.Korisnik=korisnik;

                    await Context.ObjektiZaSmestanje.AddAsync(objekat);
                    await Context.SaveChangesAsync();

                    return Ok(objekat.ID);

                }
                else if (korisnik==null)
                    return BadRequest("Korisnik nije pronadjen");
                else if(tip==null) 
                    return BadRequest("Tip objekta za smestanje nije pronadjen");
                else 
                    return BadRequest("Soba nije pronadjena");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }
        [Route("ObrisiObjekatZaSmestanje/{idObjekta}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiObjekatZaSmestanje(int idObjekta)
        {
            try
            {
                ObjekatZaSmestanje objekat=Context.ObjektiZaSmestanje.Where(o => o.ID == idObjekta).FirstOrDefault();
                if(objekat!=null)
                {
                    Context.ObjektiZaSmestanje.Remove(objekat);
                    var predmeti = Context.Predmeti.Where(p => p.Smesten.ID==objekat.ID);
                    foreach(Predmet p in predmeti)
                    {
                        Context.Predmeti.Remove(p);
                    }
                    await Context.SaveChangesAsync();
                    return Ok("Obrisan je objekat");
                }
                else return BadRequest("Nije pronadjen objekat");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ObjektiZaSmestanjePrikaz/{idKorisnika}")]
        [HttpGet]
         public async Task<ActionResult> Prikaz(int idKorisnika)
         {
            return Ok(await Context.ObjektiZaSmestanje.Where(o => o.Korisnik.ID==idKorisnika).Select(o=>
                new
                {
                    ID=o.ID,
                    Opis=o.Opis,
                    Boja=o.Boja,
                    Soba=o.Soba.Naziv,
                    Tip=o.Tip.Naziv
                }
                ).ToListAsync()
            ); 

         }


       
    }
} 

   