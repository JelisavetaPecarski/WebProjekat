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
    public class KorisnikController : ControllerBase
    {
        public OrganizacijaDomaContext Context {get; set;}
        public KorisnikController(OrganizacijaDomaContext context)
        {
            Context=context;
        }
        [Route("DodajKorisnika/{sifra}/{korisnickoIme}")]
        [HttpPost]
         public async Task<ActionResult> DodajKorisnika(string sifra,string korisnickoIme)
         {
            if(sifra.Length<8)
                return BadRequest("Sifra mora sadrzati najmanje 8 karaktera");
            if(korisnickoIme.Length >30)
                return BadRequest("Korisnicko ime moze da ima maksimalno 30 karaktera");
            try
            {
                var postoji=Context.Korisnici.Where(k=>k.Sifra==sifra && k.KorisniskoIme==korisnickoIme);
                if (postoji.Count()!=0)
                 return BadRequest("Vec postoji korisnik sa ovim korisnickim imenom i sifrom");

                Korisnik korisnik=new Korisnik();
                korisnik.Sifra=sifra;
                korisnik.KorisniskoIme=korisnickoIme;

                await Context.Korisnici.AddAsync(korisnik);
                await Context.SaveChangesAsync();
                return Ok(korisnik.ID);

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("NadjiKorisnika/{sifra}/{korisnickoIme}")]
        [HttpGet]
         public async Task<ActionResult> NadjiKorisnika(string sifra,string korisnickoIme)
         {
             try
            {
                Korisnik korisnik=await Context.Korisnici.Where(k=>k.Sifra==sifra && k.KorisniskoIme==korisnickoIme).FirstOrDefaultAsync();
                if(korisnik==null)
                return BadRequest("Nije pronadjen korisnik,unesite ponovo korisnicko ime i sifru");
                else return Ok(korisnik.ID);    
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
         }
      
    }
}