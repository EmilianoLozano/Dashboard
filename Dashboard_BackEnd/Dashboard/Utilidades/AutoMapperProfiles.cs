
using AutoMapper;
using Dtos;
using Models;

namespace WebApiDashboard.Utilidades
{
    public class AutoMapperProfiles : Profile
    {

        public AutoMapperProfiles()
        {
            CreateMap<DtoAgregarMarca, Marca>();
            CreateMap<Marca,MarcaDTO>();

            CreateMap<DtoAgregarProducto,Producto>();

             CreateMap<Producto,ProductoDTO>();


        }
    }
}
