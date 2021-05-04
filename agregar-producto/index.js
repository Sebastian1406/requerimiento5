import {    uriProductos  } from "../modulo.js"
let btnAgregar = document.querySelector('#btnAgregar');
let textoCodigo = document.querySelector('#textoCodigo');
let textoNombre = document.querySelector('#textoNombre');
let listaCategoria = document.querySelector("#categoria");
let textoRuc = document.querySelector("#textoRuc");
let textoProveedor = document.querySelector("#textoProveedor");
let textoPrecio = document.querySelector('#textoPrecio');
let afectaDeImpuesto = document.querySelector("#afectaDeImpuesto");
let idProducto = 0;

const modificarProducto = () => {
    let codigo = textoCodigo.value;
    let nombre = textoNombre.value;
    let categoria = listaCategoria.value;
    let ruc =  textoRuc.value;
    let proveedor = textoProveedor.value;
    let precio = textoPrecio.value;
    let impuesto = afectaDeImpuesto.value

    let productosApi = {"codigo" : codigo, "nombre" : nombre, "categoria" : categoria, "ruc" : ruc, "proveedor" : proveedor, "precio" : precio, "afectoIGV" : impuesto}

    fetch(uriProductos + idProducto,
        {
            method: "PUT",
            body : JSON.stringify(productosApi),
            headers: {
                "Content-type" : "application/json"
            }
        })
        .then(repuesta => repuesta.text())
        .then(data => alert("Producto modificado"))
        .catch(error => {
            alert(error)
        })
}
const crearProducto = () => {
    debugger
    let codigo = textoCodigo.value;
    let nombre = textoNombre.value;
    let categoria = listaCategoria.value;
    let ruc =  textoRuc.value;
    let proveedor = textoProveedor.value;
    let precio = textoPrecio.value;
    let descripcion = afectaDeImpuesto.value

    let productosApi = {"codigo" : codigo, "nombre" : nombre, "categoria" : categoria, "ruc" : ruc, "proveedor" : proveedor, "precio" : precio, "afectoIGV" : impuesto}

    fetch(uriProductos,
        {
            method: "POST",
            body : JSON.stringify(productosApi),
            headers: {
                "Content-type" : "application/json"
            }
        })
        .then(repuesta => repuesta.text())
        .then(data => alert("Producto creado su  id = " + data))
        .catch(error => {
            alert(error)
        })
}

const verificarCodicionProducto = (event) => {
    event.preventDefault()
    if(idProducto == 0){
        crearProducto()
    }else{
        modificarProducto()
    }
}

const datosGuardadoLocalStorange = () => {
    idProducto = window.localStorage.getItem("id")
    
    fetch(uriProductos + idProducto)

    .then(respuesta => respuesta.json())

    .then(data => {

        textoCodigo.value = data.codigo
        textoNombre.value = data.nombre
        listaCategoria.value = data.categoria
        textoRuc.value = data.ruc
        textoProveedor.value = data.proveedor
        textoPrecio.value = data.precio
    })
}

btnAgregar.addEventListener("click", verificarCodicionProducto)
window.addEventListener("load", datosGuardadoLocalStorange)
