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
    public class SobaController : ControllerBase
    {
      public OrganizacijaDomaContext Context {get; set;}
        public SobaController(OrganizacijaDomaContext context)
        {
            Context=context;
        }
       
        [Route("PreuzmiSobe")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSobe()
        {
            return Ok(await Context.Sobe.Select(s=>
                new
                {
                  ID=s.ID,
                  Naziv=s.Naziv
                }
                ).ToListAsync()
            ); 
        }

    }
}