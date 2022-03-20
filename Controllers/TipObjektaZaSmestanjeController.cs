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
    public class TipObjektaZaSmestanjeController : ControllerBase
    {
      public OrganizacijaDomaContext Context {get; set;}
        public TipObjektaZaSmestanjeController(OrganizacijaDomaContext context)
        {
            Context=context;
        }
       
        [Route("PreuzmiTipoveObjekataZaSmestanje")]
        [HttpGet]
         public async Task<ActionResult> PreuzmiTipove()
        {
             return Ok(await Context.TipoviObjekataZaSmestanje.Select(t=>
                new
                {
                  ID=t.ID,
                  Naziv=t.Naziv
                }
                ).ToListAsync()
            ); 
        }

       
    }
}