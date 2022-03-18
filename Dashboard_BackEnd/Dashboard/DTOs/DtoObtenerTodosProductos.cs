
using Models;

namespace Dtos
{
public class ProductosDTO
{        

        public int id { get; set; }
        public string NombreProducto { get; set; }

        public string NombreMarca{ get; set; }

        public int Stock {get;set;}

        public double Precio {get;set;}
     
}
}
