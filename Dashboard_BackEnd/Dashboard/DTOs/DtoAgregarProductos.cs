
using System.ComponentModel.DataAnnotations;
using Models;

namespace Dtos

{
    public class DtoAgregarProducto

    {     
        
        [Required]
        public string NombreProducto { get; set; }

        public int Stock {get;set;}

        public double Precio {get;set;}

        public int peso {get;set;}

        public string presentacion {get;set;}

        public DateTime FechaElaboracion {get;set;}
        public DateTime FechaVencimiento {get;set;}
    

    }


}


