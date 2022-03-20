using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Soba
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Naziv { get; set; }
        
        [JsonIgnore]
        public List<ObjekatZaSmestanje> ObjektiZaSmestanje { get; set; }

    }
}