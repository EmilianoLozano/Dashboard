using System.ComponentModel.Design.Serialization;
using System.Threading;
using System;
using System.Globalization;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Models;
using Microsoft.EntityFrameworkCore;
using Dtos;
using WebApiDashboard;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace WebApiProducto.Controllers
{
    [ApiController]
    [Route("api/marcas/{marcaId:int}/productos")]   

    public class ProductoController : ControllerBase

    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ProductoController(ApplicationDbContext context,IMapper mapper)

        {
            this.context = context;
            this.mapper = mapper;
           
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductoDTO>>> Get(int marcaId)
        {

            var existeMarca = await context.Marcas.AnyAsync(x => x.Id == marcaId);

            if (!existeMarca)
            {
                return NotFound();
            }
            var productos = await context.Productos.Where(x => x.MarcaId == marcaId).ToListAsync();

            return mapper.Map<List<ProductoDTO>>(productos); 

        }

        [HttpPost]
        public async Task<ActionResult> Post(int marcaId, DtoAgregarProducto dtoAgregarProducto)
        {
            var existeMarca = await context.Marcas.AnyAsync(x => x.Id == marcaId);

            if (!existeMarca)
            {
                return NotFound();
            }

            var producto = mapper.Map<Producto>(dtoAgregarProducto);
            producto.MarcaId = marcaId;
            
            context.Add(producto);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int marcaId,DtoAgregarProducto dtoAgregarProducto, int id)
        {
            var existeMarca = await context.Marcas.AnyAsync(x => x.Id == marcaId);

            if (!existeMarca)
            {
                return NotFound();
            }

             var existeProducto = await context.Productos.AnyAsync(x => x.Id == id);

            if (!existeProducto)
            {
                return NotFound();
            }

            var producto = mapper.Map<Producto>(dtoAgregarProducto);
            producto.Id= id;
            producto.MarcaId=marcaId;
            context.Update(producto);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {

            var existe = await context.Productos.AnyAsync(x => x.Id == id); 

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Producto() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }

    
        
    





    }

}















