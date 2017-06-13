/**
 * Created by Curso on 18/05/2017.
 */
"use strict";
//module categorias
import * as service from "./genericservice";
const urlCategorias = "http://localhost:8080/agenda/api/categorias";

export class CategoriaService extends service.GenericService {
    constructor(){
        super();
    }
    getAll(){
        return super.ajax(urlCategorias,"get",null,"text");

    }
    getById(idcategoria){
        return super.ajax(urlCategorias+"/"+idcategoria,"get",null,"text");
    }
    create(categoria){
        return super.ajax(urlCategorias,"post",categoria,"json");
    }
    update(categoria){
        return super.ajax(urlCategorias+"/"+categoria.codigo,"put",categoria,"json");
    }
}

export  function rederizarFormulario(codigo = -1){
    let cs = new CategoriaService();
    let categoria = new Categoria();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1){
            cs.getById(codigo)
                .then(function(cate){
                    txt = parseForm(JSON.parse(cate));
                    resolve(txt);
                })
                .catch(function () {
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(categoria);
            resolve(txt);
        }
    });


    //rellaner datos en el form
}



function parseForm(categoria) {
 let txt="";
 txt +="<form action='#' id='categoriaForm' method='post'>";
 txt += "<input type='text' name='nombre'"
 +" id='nombre' value='"+categoria.ncategoria+"'>"
 txt+="</form>";
 return txt;
 }


export function renderizar () {
    console.log("ESTOY EN RENDERIZAR");
    let cs = new CategoriaService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        cs.getAll().then(function(data) {
            let categorias = JSON.parse(data);
               console.log(data);
            if (categorias.length > 0) {
                txt ="<table data-table='categorias' id='tablaCategorias' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < categorias.length; i++) {
                    let categoria = categorias[i];
                   /* console.log("CATEGORIA:" +categoria);*/
                    txt += parseCategoria(categoria);
                }
                txt+="</tbody><tfoot><tr><td colspan='3'>Total Categorias: "+categorias.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran categorias en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de categorias";
            reject(txt);
        });
    });
}
function parseCategoria (categoria){
    let codigo = categoria.idcategoria;
    let nombre = categoria.ncategoria;
   /* let apellidos = alumno.apellidos;
    let email = alumno.email;
    let dni = alumno.dni;*/
  /*  let htmlEdit ="<button>Editar</button>";*/
    let htmlEdit='<div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">';
    htmlEdit+='Acciones';
    htmlEdit+='<span class="caret"></span></button>';
    htmlEdit+='<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' ;
    htmlEdit+= ' <li><a href="#">Editar</a></li>' ;
    htmlEdit+= ' <li><a href="#">Borrar</a></li>'  ;

  /*  htmlEdit+='<li role="separator" class="divider"></li>';
    htmlEdit+= '<li><a href="#">Separated link</a></li>';*/
    htmlEdit+='</ul></div>';
  /*  let htmlDelete ="<button>Borrar</button>";*/

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+htmlEdit+"</td></tr>";

    return texto;






}
export function crearCategoria(categoriajson){
    let cs = new CategoriaService();
   // let categoria = new Categoria();

    return new Promise(function(resolve, reject) {
        // txt = JSON.parse(categoriajson)
        cs.create(categoriajson).then(function (data) {
          /*  console.log(data);*/
            // let categorias = JSON.parse(data);
          /*  txt = parseForm(JSON.parse(cate));-*/
         //   console.log(txt);
            resolve(data);
        }, function (error) {//error
            console.log(error);
            reject(error);
        });

    });
}

export class Categoria {
    constructor(){
        this._idcategoria= -1;
        this._ncategoria = "";
        this._activo = true;

    }
    get idcategoria() {
         return  this._idcategoria;
    }
    set idcategoria(idcategori) {
        this._idcategoria = idcategori;
    }
    get ncategoria() {
        return  this._ncategoria;
    }
    set ncategoria(categoria) {
        this._ncategoria = categoria;
    }
    get activo() {
        return this._activo;
    }

    set activo(active) {
        this._activo = active;
    }
}

/*
export class Alumno {
    constructor(){
        this._codigo = -1;
        this._nombre ="";
        this._apellidos="";
        this._dni ="";
        this._fnacimiento="";
        this._email="";
        this._cursos= new Array();
        this._telefono="";
        this._nhermanos=0;
        this._direccion="";
        this._codigopostal="";
        this._poblacion="";
        this._activo = true;
    }
    get codigo() {
        return this._codigo;
    }

    set codigo(code) {
        this._codigo = code;
    }
    get nombre() {
        return this._nombre;
    }

    set nombre(name) {
        this._nombre = name;
    }
    get apellidos() {
        return this._apellidos;
    }

    set apellidos(surname) {
        this._apellidos = surname;
    }
    get dni() {
        return this._dni;
    }

    set dni(id) {
        this._dni = id;
    }
    get fnacimiento() {
        return this._fnacimiento;
    }

    set fnacimiento(dob) {
        this._fnacimiento = dob;
    }
    get email() {
        return this._email;
    }

    set email(mail) {
        this._email = mail;
    }

    get cursos() {
        return this._cursos;
    }

    set cursos(courses) {
        this._cursos = courses;
    }
    get telefono() {
        return this._telefono;
    }

    set telefono(telephone) {
        this._telefono = telephone;
    }
    get nhermanos() {
        return this._nhermanos;
    }

    set nhermanos(nsibblings) {
        this._nhermanos = nsibblings;
    }
    get direccion() {
        return this._direccion;
    }

    set direccion(address) {
        this._direccion = address;
    }
    get codigopostal() {
        return this._codigopostal;
    }

    set codigopostal(zipcode) {
        this._codigopostal = zipcode;
    }
    get poblacion() {
        return this._poblacion;
    }

    set poblacion(city) {
        this._poblacion = city;
    }
    get activo() {
        return this._activo;
    }

    set activo(active) {
        this._activo = active;
    }
}
*/
