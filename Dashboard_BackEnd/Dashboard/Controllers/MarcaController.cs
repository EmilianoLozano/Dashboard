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
    [Route("api/marcas")]
    
    public class MarcaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly ProductosRepository repository;

        public MarcaController(ApplicationDbContext context, IMapper mapper,ProductosRepository repository)
        {
            this.context = context;
            this.mapper = mapper;
            this.repository = repository ?? throw new ArgumentNullException(nameof(repository));
        }
         [HttpGet]
        public async Task<ActionResult<List<MarcaDTO>>> Get()
        {
            var marcas =  await context.Marcas.Include(x=> x.Producto).ToListAsync();
            return mapper.Map<List<MarcaDTO>>(marcas);
        }
    
        [HttpGet("{id:int}")]
        public async Task<ActionResult<MarcaDTO>> Get(int id)
        {
            var marcas = await context.Marcas.Include(x=> x.Producto).FirstOrDefaultAsync(x => x.Id == id);
            if(marcas == null)
            {
                return NotFound();
            }

            return mapper.Map<MarcaDTO>(marcas);

        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] DtoAgregarMarca dtoAgregarMarcas)
        {
            var existeMarca= await context.Marcas.AnyAsync(x => x.NombreMarca == dtoAgregarMarcas.NombreMarca);

            if(existeMarca)
            {
                return BadRequest($"Ya existe una marca con el nombre {dtoAgregarMarcas.NombreMarca}");
            }
            
            var marca = mapper.Map<Marca>(dtoAgregarMarcas);

            context.Add(marca);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id:int}")]   
        public async Task<ActionResult> Put(DtoAgregarMarca dtoAgregarMarca, int id)
        {
            var exists = await context.Marcas.AnyAsync(x => x.Id == id);
            if (!exists)
            {
                return NotFound();
            }

            var marca = mapper.Map<Marca>(dtoAgregarMarca);
            marca.Id= id;

            context.Update(marca);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {

            var existe = await context.Marcas.AnyAsync(x => x.Id == id); 

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Marca() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        
        }

    }
}
















