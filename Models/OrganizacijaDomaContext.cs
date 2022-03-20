using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class OrganizacijaDomaContext : DbContext
    {
        public DbSet<ObjekatZaSmestanje> ObjektiZaSmestanje {get; set;}
        public DbSet<TipObjektaZaSmestanje> TipoviObjekataZaSmestanje {get; set;}
        public DbSet<Soba> Sobe {get; set;}
        public DbSet<Predmet> Predmeti {get; set;}
        public DbSet<Korisnik> Korisnici {get; set;}
        public OrganizacijaDomaContext(DbContextOptions options):base(options)
        {

        }
    }
} 