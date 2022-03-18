using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dtos;


namespace WebApiDashboard
{
public class ProductosRepository
{
    private readonly string _connectionString;

    public ProductosRepository(IConfiguration configuration)
    {
    _connectionString = configuration.GetConnectionString("defaultConnection");
    }

    public async Task<List<ProductosDTO>> obtenerTodosProductos()
    {
        using (SqlConnection sql = new SqlConnection(_connectionString))
    {
        using (SqlCommand cmd = new SqlCommand("sp_Productos", sql))
        {
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        var response = new List<ProductosDTO>();
        await sql.OpenAsync();
    
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
            response.Add(MapToValue(reader));
            }
        }
    
        return response;
        }
    }
    }
    
    private ProductosDTO MapToValue(SqlDataReader reader)
    {
    return new ProductosDTO()
    {
        id = (int)reader["id"],
        NombreProducto = reader["Producto"].ToString(),
        NombreMarca = reader["Marca"].ToString(),
        Stock = (int)reader["Stock"],
        Precio = (double)reader["Precio"]
    };
    }    

    
}
}