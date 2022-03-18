using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Producto
    {
        public int Id { get; set; }

        [Required]
        public string NombreProducto { get; set; }

        public int Stock {get;set;}

        public double Precio {get;set;}

        public int peso {get;set;}

        public string presentacion {get;set;}

        public DateTime FechaElaboracion {get;set;}
        public DateTime FechaVencimiento {get;set;}
        public int MarcaId { get; set; }
        public Marca Marca { get; set; }

        

    }

}
