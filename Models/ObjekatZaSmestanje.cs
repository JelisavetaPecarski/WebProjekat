using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class ObjekatZaSmestanje
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(80)]
        [Required]
        public string Opis { get; set; }
        [Required]
        public string Boja {get; set;}
        public TipObjektaZaSmestanje Tip { get; set; }
        public Soba Soba { get; set; }
        [JsonIgnore]
        public List<Predmet> Predmeti { get; set; }
        public Korisnik Korisnik { get; set; }

    }
}