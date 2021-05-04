import { uriCategorias } from "../modulo.js"
import { uriProductos } from "../modulo.js"

let textoProducto = document.querySelector("#textoProducto");
let botonBuscar = document.querySelector("#botonBuscar");
let contenidoTabla = document.querySelector("#contenido");
let selectCategoria = document.querySelector("#categorias");
let body = document.querySelector("body");


const comboCategoria = () => {
    fetch(uriCategorias)
        .then(response => response.json())
        .then(data => {
        data.categorias.forEach(element => {
        selectCategoria.innerHTML += `<option>${element}</option>`;
        })  
    })
}

const buscarProductos = (event) => {
    event.preventDefault()
    let producto = textoProducto.value;
    let categoria = selectCategoria.value;

    fetch(uriProductos + `?Nombre=` + producto + `&Categoria=` + categoria) 

    .then(response => response.json())

    .then(data => renderizarTablaProductos(data))

}

const renderizarTablaProductos = (data) => {
    let salida = "";
    contenidoTabla.innerHTML = "";

    data.forEach(element => {        
        salida += 
        `<tr>
            <td>${element.codigo}</td>
            <td>${element.nombre}</td>
            <td>${element.categoria}</td>
            <td>$ ${element.precio}</td>
            <td>${element.proveedor}</td>
            <td><button class="style-boton"><i class="far fa-trash-alt"></i></button>
            <button class="style-boton" value="${element.id}"><i class="far fa-edit"></i></a> </button></td>
        </tr>`
    });
    contenidoTabla.innerHTML = salida;
}

const guardarDatosLocalStorange = (event) => {
    event.preventDefault();
    if(event.target.className == "style-boton"){
        window.localStorage.setItem("id", event.target.value)
        window.location.href = "../agregar-producto/index.html"
    }
}

botonBuscar.addEventListener("click", buscarProductos)
window.addEventListener("load", comboCategoria)
body.addEventListener("click", guardarDatosLocalStorange)
