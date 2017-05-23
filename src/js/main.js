var alumnos=[{"codigo":1,"nombre":"Maite","apellidos":"Monasterio Herrero","dni":"16071559X","email":"maitemonastreio@gmail.com"},
    {"codigo":2,"nombre":"Paco","apellidos":"Monasterio Herrero","dni":"16071559X","email":"maitemonastreio@gmail.com"}
    ,{"codigo":3,"nombre":"Rafa","apellidos":"Monasterio Herrero","dni":"16071559X","email":"maitemonastreio@gmail.com"},
    {"codigo":4,"nombre":"Lourdes","apellidos":"Monasterio Herrero","dni":"16071559X","email":"maitemonastreio@gmail.com"}];
/*javascript 5
var $ = require('jquery');
*/

//$.noConflict();
//$(document).ready(function($) {
// Code that uses jQuery's $ can follow here.

/*javascrip 6*/
import $ from "jquery";
window.jQuery = window.$ = $;
require("bootstrap");
import * as categoria from "./categorias";
import * as libreria from "./libreria";
var $listadoCategorias =$("#listadoCategorias");
var $pagebody =$("#page-body");
var $categoria =$("#categoria");
/*validacion de formulario del index*/
$("#contactForm").on("submit",validarFormularioContacto);
/*categorias*/
if($categoria.length){
    let codigo = libreria.getURLParameter('codigo');
    console.log(codigo);
    let p2 =categoria.rederizarFormulario(codigo);

    p2.then(function (html) {
        console.log(html);
        $categoria.find("div.flexcontainer:last-child").append(html);
    }).catch(function (txt) {

    });
}


if($listadoCategorias.length) {//estamos en la página de categorias
    let p1 = categoria.renderizar();
    p1.then(function (txt) {
        $listadoCategorias.find("div.flexcontainer:last-child").append(txt);
    }).catch(function (txt) {

    });
}
$listadoCategorias.find("div a:last-child").click(borrarVarios);
/*$listadoCategorias.find("div a:first-child").click(crearItem);*/
/*
$listadoCategorias.find("#tablaCategorias tbody").on("click","td:last-child button:last-child",function(){
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    $(this).parents("tr").remove();
});CAMBIA AHORA PQ LA TABLA ES DINAMICA
*/


$pagebody.on("click","tbody td:last-child button:last-child",function() {
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    $(this).parents("tr").remove();
});
$pagebody.on("click","tbody td:last-child button:first-child",function(){
//$listadoCategorias.find("#tablaCategorias tbody").on("click","td:last-child button:first-child",function(){
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();

    var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
    let nTable = $("table").attr("data-table");
    let txt= window.location.protocol + '//' + window.location.host+"/gestion-agenda/";

    console.log(nTable);
    console.log(codigo);
    switch(nTable){
        case 'categorias':
            console.log("URL"+txt);
            txt += "categorias/categoria.html?codigo="+codigo;

            break;
    }
    window.location = txt;
});



$("#listadoAlumnos a:last-child").click(borrarVarios);
/*$("#listadoAlumnos a:first-child").click(crearNuevo);*/

/*boton individual de borra y editar contacto*/
$("#tablaAlumnos").on("click","td:last-child button:last-child",function(){
    var  codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    var nombre =  $(this).parents("tr").find("td:nth-child(2)").text();
    console.log(nombre);
});
$("#tablaAlumnos").on("click","td:last-child button:first-child",function(){
    console.log("PRI");
    var codigo;
    codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    console.log(codigo);
    $(this).parents("tr").remove();
});
cargarArrayAlumnos();
function cargarArrayAlumnos() {
    //recorrer el array

    if (alumnos.length > 0) {
        for (var i=0; i< alumnos.length;i++) {
            console.log(alumnos[i]);
            var codigo=alumnos[i].codigo;
            var nombre=alumnos[i].nombre;
            var apellidos =alumnos[i].apellidos;
            var email =alumnos[i].email;
            var dni =alumnos[i].dni;
            var htmlEdit = "<button>Editar</button>";
            var htmlDelete = "<button>Borrar</button>";
            var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>" +nombre+ "</td><td>" +apellidos+ "</td><td>" +email+ "</td><td>"+dni+"</td><td>"+htmlDelete + htmlEdit+"</td></tr>";
            //añadir el html correspondiente a la página
            $("#tablaAlumnos tbody").append(texto);
            //-->
        }
        $("#tablaAlumnos tfoot td").html("<span class='text-error'>Total alumnos:"+alumnos.length,10+"</span>");
    }else{
        $("#tablaAlumnos").remove();
        $("#listadoAlumnos").text("No se han encontrado alumnos")
    }
}
//});

function borrarVarios() {
    //recoger los checksboxes marcados
    $("table tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();
    });
    $("tbody tr").length;
}

/*function crearItem(){

    $('#myModal').on('show.bs.modal', function (event) {

        console.log("hola");
        });
}*/


/*
Solo vale para alumnos
function borrarVarios(){
    //recoger los checksboxes marcados
    $("#tablaAlumnos tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();
        //actualizar el nº de alumnos

    });

}*/
$pagebody.on("click","#borrartodos" , function (event) {

    if($(this).is(":checked")){
        $("tbody input[type=checkbox]").prop("checked",true);
    }else{
        $("tbody input[type=checkbox]").prop("checked",false);
    }
});

function validarFormularioContacto(){
    //recoger los valores de la vista
    var pdni = $("#dni").val();
    var pnombre = $("#nombre").val();
    var papellidos = $("#apellidos").val();
    var ptelefono = $("#telefono").val();
    var valido = false;
    //evaluarlos
    var dniValido= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
    var nomValido = validarNombre(pnombre);
    var apeValido = validarApellidos(papellidos);
    var teleValido = validarTelefono(ptelefono);
    $("#dni").siblings("div.text-error").text("");
    $("#nombre").siblings("div.text-error").text("");
    $("#apellidos").siblings("div.text-error").text("");
    $("#telefono").siblings("div.text-error").text("");
    if(dniValido&&nomValido&&apeValido&&teleValido){
        // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
        valido = true;
    }else {
        //mostar mensaje de error
        if(!dniValido){
            $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
        }
        if(!nomValido){
            $("#nombre").siblings("div.text-error").text("El nombre tiene que tener al menos 3 letras");
        }
        if(!apeValido){
            $("#apellidos").siblings("div.text-error").text("Los apellidos tienen que tener al menos 7 letras");
        }
        if(!teleValido){
            $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 numeros");
        }
        //text y html
    }
    return false;
}
function validarNombre(nombre){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
function validarApellidos(apellidos) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(apellidos);
}
function validarTelefono(telefono){
    var valido = true;
    if(telefono!=""){
        const pattern = new RegExp(/\d{9}/);
        valido = pattern.test(telefono);
    }
    return valido ;
}
function validarDni(dni) {
    var valido =false;
    const pattern = new RegExp(/\d{8}[A-Za-z]{1}/);
    if(pattern.test(dni)){
        let numero = parseInt(dni.substr(0,dni.length-1),10);
        let letr = dni.substr(dni.length-1,1);
        numero = numero % 23;
        let letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra==letr.toUpperCase()) {
            valido = true;
        }
    }
    return valido;
}

/*MODAL*/
/*$('#myModal').on('show.bs.modal', function (event) {

    console.log("hola");
    var button = $(event.relatedTarget) // Button that triggered the modal
    var modal = $(this);
    console.log(modal);
    // modal.find('.modal-title').text('New message to ' + recipient)
    var nombre= modal.find('.modal-body input').val();
    console.log(nombre);

});*/
$("#myModal button:first-child").click(testFun);
function testFun() {
   // $('#myModal').find('.modal-body input').val("") ;
  var ncategoria = $('#myModal').find('.modal-body input').val();
    console.log(ncategoria);

    $('#myModal').find('.modal-body input').val("");

}


/***CAtegorias*/////
/*****Categoriadas*//////

/*Funcion q me da getbyid
 $("#tablaCategorias").on("click","td:last-child button:first-child",function(){
 var cs = new categoria.CategoriaService();
 console.log("PRI");
 var codigo;
 codigo = $(this).parents("tr").find("input[type=checkbox]").val();
 console.log(codigo);
 //   $(this).parents("tr").remove();
 cs.getById(codigo)
 .then(function (data) {
 console.log(data);
 // cargarArrayCategorias(JSON.parse(data));
 }, function (error) {//error
 console.log(error);
 }).catch(function () {

 });
 });

 */




/* quitamos pq lo tenemos renderizado
 if($listadoCategorias.length) {//estamos en la página de acategorias
 var cs = new categoria.CategoriaService();

 cs.getAll()
 .then(function (data) {
 console.log(data);
 cargarArrayCategorias(JSON.parse(data));
 }, function (error) {//error
 console.log(error);
 }).catch(function () {

 });
 }
 */
/* nos lo xcargamos pq renderizamos
function cargarArrayCategorias(categorias) {
    //recorrer el array
    console.log("----<>>>"+categorias.length );
    if (categorias.length > 0)
    {
        for(var i = 0; i < categorias.length; i++) {
            console.log(categorias[i]);
            var codigo = categorias[i].idcategoria;
            console.log("----->codigo:"+ codigo);
            var nombre = categorias[i].ncategoria;
            var htmlEdit ="<button>Editar</button>";
            var htmlDelete ="<button>Borrar</button>";
            var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";
            //añadir el html correspondiente a la página
            console.log("----->codigo:"+ texto);
            $("#tablaCategorias tbody").append(texto);
        }
        $("#tablaCategorias tfoot td").html("<span class='text-error'>Total Categorias:"+categorias.length,10+"</span>");
    }else
    {
        $("#listadoCategorias").append("No se han encontrado categorias")
    }
}
*/
