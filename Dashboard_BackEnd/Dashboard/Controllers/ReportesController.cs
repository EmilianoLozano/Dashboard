
using System.IO.MemoryMappedFiles;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using AutoMapper;
using Dtos;
using WebApiDashboard;

namespace WebApiMarca.Controllers
{
    [ApiController]  
    
    public class ReportesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
      
        private readonly ProductosRepository repository;

        public ReportesController(ApplicationDbContext context, ProductosRepository repository)
        {
            this.context = context;
         
            this.repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
       
        [HttpGet]
        [Route("Todos_productos")]
        public async Task<ActionResult<IEnumerable<ProductosDTO>>> Get()
        {
            return await repository.obtenerTodosProductos();
        }


    }
}
