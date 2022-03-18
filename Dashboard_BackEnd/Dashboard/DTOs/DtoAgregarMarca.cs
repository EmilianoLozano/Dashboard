using System.ComponentModel.DataAnnotations;


namespace Dtos
{
    public class DtoAgregarMarca
    {
        [Required]
        public string NombreMarca{ get; set; }
     
    }   
}
