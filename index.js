let iframe = document.querySelector("#main-iframe")
let listadoDeProducto = document.querySelector("#listadoProductos")
let agregarProductos = document.querySelector("#agregarProductos")


const renderizarListadoDeProducto = (event) => {
    event.preventDefault();
    iframe.src = "listado-producto/index.html"
    
}
const renderizarAgregarProducto = (event) => {
    event.preventDefault()
    window.localStorage.setItem("id", 0)
    iframe.src = "agregar-producto/index.html"
}

agregarProductos.addEventListener("click",renderizarAgregarProducto)
listadoDeProducto.addEventListener("click",renderizarListadoDeProducto)
