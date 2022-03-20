using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Predmet
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(80)]
        [Required]
        public string Naziv { get; set; }

        [JsonIgnore]
        public ObjekatZaSmestanje Smesten{ get; set; }


    }
}