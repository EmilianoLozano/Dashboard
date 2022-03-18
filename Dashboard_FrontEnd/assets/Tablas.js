
var stockTotal=0;
var idEditar;
$(document).ready(function () {
  
  $("#modalEditarMarca").modal('hide');
    TraerMarcas();
    TraerTodosProductos();
    $('#btnGrabarMarca').click(function () {

       var Mensaje="";
        if($("#txtNombreMarcaE").val() == ''){
            $("#AlertaE").show(); 
           Mensaje="Debe ingresar el nombre de la marca";
           $("#MensajeErrorE").text(Mensaje);
           return;
        }
        else
        {
          realizarEdicion($("#txtNombreMarcaE").val());
          $.ajax({
            url: "https://webapiproductos.azurewebsites.net/api/marcas/"+idEditar,
            type: "PUT",
            data : JSON.stringify(marca), 
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                TraerMarcas();
                $('#modalEditarMarca').modal('hide');
                swal("Registro modificado con exito","","success");            
                comboMarcas();
                $("#MensajeErrorE").text("");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                swal("Ya existe la marca","","warning");
            }
        });
        }
    });
  
});

function realizarEdicion(nombreMarca){
  marca= {  
    "nombreMarca": nombreMarca
};
}

var Dar_Formato_Tabla_Alineacion = function (Tabla, Datos, ColumnasAlineacion) {
    var table = Tabla.DataTable({
        "rowCallback": function (row, data, index) {
            $('td', row).css('fontSize', '14px');

            var ColumnaAlineacion = ColumnasAlineacion.toString().split('-');

            for (i = 0; i < ColumnaAlineacion.length ; i++) {
                var Columna = ColumnaAlineacion[i].toString().split(',');
                var Alineacion = '';
                switch (Columna[1]) {
                    case 'I':
                        Alineacion = 'left';
                        break;
                    case 'C':
                        Alineacion = 'center';
                        break;
                    case 'D':
                        Alineacion = 'right';
                        break;
                }
                $('td:eq(' + Columna[0] + ')', row).css('text-align', '' + Alineacion + '');
            }
        },
        data: Datos,
        "order": [],
        "scrollX": true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
        },
        "bDestroy": true,
        dom: 'Bfrtip',
        select: true
 
    });
}

function TraerMarcas() {
    
    $.ajax({
        type: "GET",
        url: "https://webapiproductos.azurewebsites.net/api/marcas/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

         var ListadoMarcas = [];
         var Ver='';
         var Borrar='';
         var EditarMarca='';
         var cantidadMarcas=0;
          for (i = 0; i < data.length; i++) {
              cantidadMarcas++;
              Ver = "<a href='#' onclick='return VerMarca(" + data[i].id + ")'  class='btn btn-info '><i class='fas fa-eye'></i></a>";
              Borrar = "<a href='#' onclick='return Borrar(" + data[i].id + ")'  class='btn btn-danger '><i class='fas fa-trash'></i></a>";
              EditarMarca="<a href='#' onclick='return EditarMarca(" + data[i].id + ")'  class='btn btn-warning '><i class='fas fa-pencil'></i></a>";
            ListadoMarcas.push([data[i].nombreMarca,Ver,EditarMarca,Borrar]);
          }
          var ColumnaAlineacion = '0,C-1,C-2,C';
          Dar_Formato_Tabla_Alineacion($('#tablaMarcas'), ListadoMarcas,ColumnaAlineacion);
          $("#totalMarcas").text(cantidadMarcas);
         },
        error: function (data) {
          alert(data.responseText);
        }
        });

}

function VerMarca(idMarca){

    TraerProductos_Marca(idMarca);
}

function TraerProductos_Marca(id) {
    
    $.ajax({
        type: "GET",
        url: "https://webapiproductos.azurewebsites.net/api/marcas/"+id+"/productos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

         var ListadoProductos = [];
        
          console.log(data);
          for (i = 0; i < data.length; i++) {

            var fechaElaboracion = formato(data[i].fechaElaboracion);
            var fechaVencimiento = formato(data[i].fechaVencimiento);
            ListadoProductos.push([data[i].nombreProducto,"$"+data[i].precio,data[i].stock,data[i].peso
                ,data[i].presentacion,fechaElaboracion,fechaVencimiento]);
          }
          var ColumnaAlineacion = '0,C-1,C-2,C-3,C-4,C-5,C-6,C';
          Dar_Formato_Tabla_Alineacion($('#tablaProductos'), ListadoProductos,ColumnaAlineacion);

         },
        error: function (data) {
          alert(data.responseText);
        }
        });

}
function formato(fecha){
    var fechaFormateada='';
    var anio = fecha.substring(0,4);
    var mes = fecha.substring(5,7);
    var dia = fecha.substring(8,10);
    return fechaFormateada = dia +'/'+mes+'/'+anio;
  }

function TraerTodosProductos() {
    
    $.ajax({
        type: "GET",
        url: "https://webapiproductos.azurewebsites.net/Todos_productos/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

         var ListadoProductos = [];
       
          var totalProductos=0;
          var sumPrecios=0;
          var precioMasCaro=0;
          var productoMasCaro=0;
          stockTotal=0;
          
          for (i = 0; i < data.length; i++) {
            totalProductos++;
            sumPrecios += data[i].precio;

            stockTotal +=  data[i].stock;
            if(precioMasCaro==0)
            {
                precioMasCaro=data[i].precio;
                productoMasCaro=data[i].nombreProducto;
            }
            else
            {
                if(precioMasCaro < data[i].precio)
                {
                precioMasCaro=data[i].precio;
                productoMasCaro=data[i].nombreProducto;
                }
            }
            ListadoProductos.push([data[i].nombreProducto,data[i].nombreMarca,"$"+data[i].precio,
                data[i].stock]);
          }
          var ColumnaAlineacion = '0,C-1,C-2,C-3,C-4,C';
          Dar_Formato_Tabla_Alineacion($('#tablaTodosProductos'), ListadoProductos,ColumnaAlineacion);
          $("#totalProductos").text(totalProductos);
          $("#sumPrecios").text("$"+sumPrecios);
          $("#masCaro").text(productoMasCaro+"-Precio: $"+precioMasCaro);
         },
        error: function (data) {
          alert(data.responseText);
        }
        });

}


function Borrar(id){

    swal({
        title: "Esta seguro que desea borrar el registro?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
               $.ajax({
        type: "DELETE",
        url: "https://webapiproductos.azurewebsites.net/api/marcas/"+id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {           
            TraerMarcas();
            $('#comboMarcas').empty();
            comboMarcas();
         },
        error: function (data) {
          alert(data.responseText);
        }
        });
          swal("Registro borrado con éxito", {
            icon: "success",
          });
        } else {
        
        }
      });
}


function EditarMarca(id){
  $("#modalEditarMarca").modal('show');
  $("#AlertaE").hide(); 
  idEditar=id;
  $.ajax({
      type: "GET",
      url: "https://webapiproductos.azurewebsites.net/api/marcas/"+id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (result){
        console.log(result.nombreMarca);
        var nombreMarca= result.nombreMarca;
        $("#txtNombreMarcaE").val(nombreMarca);
      },
      error: function (result){
          alert("error");
      }
  });

}
