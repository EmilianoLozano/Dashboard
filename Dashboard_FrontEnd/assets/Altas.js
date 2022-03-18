var arrayProductos=[];
var stockProd=0;

$(document).ready(function () {
    $("#Alerta").hide(); 
    $("#AlertaProd").hide(); 
    comboMarcas();

    $('#btnInsertarMarca').click(function () {

        var Mensaje="";
        if($("#txtNombreMarca").val() == ''){
            $("#Alerta").show(); 
           Mensaje="Debe ingresar el nombre de la marca";
           $("#MensajeError").text(Mensaje);
        }
        else
        {
            realizarAltaMarca($("#txtNombreMarca").val());
            $.ajax({
                url: "https://webapiproductos.azurewebsites.net/api/marcas/",
                type: "POST",
                data : JSON.stringify(marca), 
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    TraerMarcas();
                    $('#modalAltaMarca').modal('hide');
                    swal("Registro insertado con exito","","success");            
                    comboMarcas();
                    $("#MensajeError").text("");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    swal("Ya existe la marca","","warning");
                }
            });
        }
    });

    $('#btnInsertarProducto').click(function () {

        var Mensaje="";
        if($("#txtNombreProducto").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar el nombre del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else if($("#comboMarcas").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar la marca del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else if($("#txtStock").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar el stock del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else if($("#txtPrecio").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar el precio del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else if($("#txtPeso").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar el peso del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else if($("#txtPresentacion").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar la presentacion del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else if($("#txtfechaElaboracion").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar la fecha elaboracion del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else if($("#txtFechaVencimiento").val() == ''){
            $("#AlertaProd").show(); 
           Mensaje="Debe ingresar la fecha vencimiento del producto";
           $("#MensajeErrorProd").text(Mensaje);
           return;
        }
        else{
            realizarAltaProducto(
            $("#txtNombreProducto").val(),
            $("#txtStock").val(),
            $("#txtPrecio").val(),
            $("#txtPeso").val(),
            $("#txtPresentacion").val(),
            $("#txtfechaElaboracion").val(),
            $("#txtFechaVencimiento").val());
            $.ajax({
                url: "https://webapiproductos.azurewebsites.net/api/marcas/"+$("#comboMarcas").val()+"/productos",
                type: "POST",
                data : JSON.stringify(producto), 
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    TraerTodosProductos();
                    $('#modalAltaProducto').modal('hide');
                    swal("Registro insertado con exito","","success");
                    

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    swal("Ya existe la marca","","warning");
                }
            });
        }
    });

    $('#comboMarcasPorcentaje').change(function () {
        if($("#comboMarcasPorcentaje").val()!='')
        {

        $.ajax({
            type: "GET",
            url: "https://webapiproductos.azurewebsites.net/api/marcas/"+$("#comboMarcasPorcentaje").val()+"/productos",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#comboProductos").empty();
                arrayProductos=[];
            
                var html = "<option value=''>SELECCIONE</option>";
                for(let i = 0; i < data.length; i++)
                {
                    
                    html += "<option value='";
                    html += data[i].id;
                    html += "'>";
                    html += data[i].nombreProducto;
                    html += "</option>";

                    arrayProductos.push({Id: data[i].id, Stock: data[i].stock});
                }
                $("#comboProductos").append(html);

                
             },
            error: function (data) {
              alert(data.responseText);
            }
            });
        }
    });


    $('#comboProductos').change(function () {
        console.log(arrayProductos);
        stockProd=0;
        if($("#comboProductos").val()!='')
        {
            for(let i = 0; i < arrayProductos.length; i++)
            {
            if($("#comboProductos").val() == arrayProductos[i].Id){
                stockProd=arrayProductos[i].Stock;
            }
            }
          
        }
        $("#stockTotal").text(stockTotal);
        $("#stockProducto").text(stockProd);
        var porcentaje=0;
        porcentaje= stockProd*100/stockTotal;
        porcentaje= porcentaje.toFixed(2) + "%";
        $("#porcentaje").text(porcentaje);
        f();
    });

});



function limpiarAlta(){
    $("#txtNombreProducto").val("");
    $("#txtStock").val("");
    $("#txtPrecio").val("");
    $("#txtPeso").val("");
    $("#txtPresentacion").val("");
    $("#txtfechaElaboracion").val("");
    $("#txtFechaVencimiento").val("");
    $("#comboMarcas").val("");
    $("#MensajeErrorProd").text("");
    $("#AlertaProd").hide();
}

function realizarAltaMarca(nombreMarca){
    marca= {  
        "nombreMarca": nombreMarca
    };
}

function realizarAltaProducto(nombreProducto,stock,precio,peso,presentacion,fechaElaboracion,fechaVencimiento){
    producto ={
        "nombreProducto": nombreProducto,
        "stock": stock,
        "precio": precio,
        "peso": peso,
        "presentacion": presentacion,
        "fechaElaboracion": fechaElaboracion,
        "fechaVencimiento": fechaVencimiento
    };
  }

function AltaMarca(){
    $("#modalAltaMarca").modal('show');
    $("#txtNombreMarca").val("");
    $("#MensajeError").text("");
    $("#Alerta").hide(); 
}
function AltaProducto(){
    $("#modalAltaProducto").modal('show');
    limpiarAlta();
}
function comboMarcas(){
    $.ajax({
            type: "GET",
            url: "https://webapiproductos.azurewebsites.net/api/marcas/",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result){

              var html = "<option value=''>SELECCIONE</option>";
                for(let i = 0; i < result.length; i++)
                {
                    
                    html += "<option value='";
                    html += result[i].id;
                    html += "'>";
                    html += result[i].nombreMarca;
                    html += "</option>";

                }
                $('#comboMarcas').empty();
                $('#comboMarcasPorcentaje').empty();
                $("#comboMarcas").append(html);
                $("#comboMarcasPorcentaje").append(html);
            },
            error: function (result){
                alert("error");
            }
        });
}







