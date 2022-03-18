using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{

    public class Marca 
    {
  
        public int Id { get; set; }
        
        [Required]
        public string NombreMarca{ get; set; }
        
        public List<Producto> Producto { get; set; }

    }

}

