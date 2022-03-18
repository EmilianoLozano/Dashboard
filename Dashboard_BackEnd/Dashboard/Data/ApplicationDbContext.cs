
using Microsoft.EntityFrameworkCore;
using Models;

namespace WebApiDashboard
{

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        // generar la tabla en la base de datos de la clase autor
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Marca> Marcas { get; set; }




    }
}
