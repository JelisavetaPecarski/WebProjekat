using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Korisnik
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(30)]
        [Required]
        public string KorisniskoIme { get; set; }
        [MinLength(8)]
        [Required]
        public string Sifra { get; set; }
        
        public List<ObjekatZaSmestanje> ObjektiZaSmestanje { get; set; }
    }
}