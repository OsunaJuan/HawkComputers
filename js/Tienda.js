let listadoCapsulas = JSON.parse(localStorage.getItem("listadoCapsulas"));
let listadoCafes = JSON.parse(localStorage.getItem("listadoCafes"));
let totalProductos = JSON.parse(localStorage.getItem("TotalProductos"));
let carrito = JSON.parse(localStorage.getItem("carrito"));

//Traemos el parrafo donde se indica la cantidad de productros en el carrito

let CarritoHTML = document.getElementById("carrito");

let cantidadArray;

//Actualizamos el los productos del carrito
if (carrito.length > 0) {
  CarritoHTML.innerText = String(carrito.length);
}

class Producto {
  constructor(idbtn, idunit, nombre, precio, inventario, categorias, unidades) {
    this.idBtn = idbtn;
    this.idUnit = "0" + idunit;
    this.name = nombre;
    this.value = precio;
    this.stock = inventario;
    this.category = categorias;
    this.units = unidades;
    this.imgURL = "../resources/imagenes/coffe_bag.webp";
  }
}

//Esta funcion nos permite Añadir elementos a los arrays de productos

function insertarProducto(
  array,
  idB,
  idU,
  nombre,
  precio,
  inventario,
  categoriasTienda,
  uni
) {
  let objetoTemporal = new Producto(
    idB,
    idU,
    nombre,
    precio,
    inventario,
    categoriasTienda,
    uni
  );
  array.push(objetoTemporal);
}

//funcion que Mostrara nuestros productos en la pagina

function tiendaHTML(arrayProductos, elementoPadreHTLM, index) {
  let divBSItem = document.createElement("div");
  divBSItem.classList.add("bestSeller--item");
  elementoPadreHTLM.prepend(divBSItem);

  divBSItem.innerHTML = `<img src=${arrayProductos[index].imgURL} alt="">
    <p>${arrayProductos[index].name}</p>
    <p> $${arrayProductos[index].value}</p>
    <div>
        <p>Cantidad</p>
        <input type="text" class="Tiendainput" id=${arrayProductos[index].idUnit}>
    </div>
    <button class="Tiendabttn" id="${arrayProductos[index].idBtn}">Comprar</button>`;
}

//Generacion de productos de Tienda.html

let elementoPadreTienda =
  document.getElementsByClassName("mainTienda--Grid")[0];

for (let i = 0; i < totalProductos.length; i++) {
  tiendaHTML(totalProductos, elementoPadreTienda, i);
}

//Generacion de tienda a partir de las preferencias del usuario ------------------------------------

//Traemos los input de los tipos de forma de organizar la tienda

let categoryCoffe = document.getElementById("categoryCoffe");
categoryCoffe.addEventListener("input", filtrar);

let categoryCapsules = document.getElementById("categoryCapsules");
categoryCapsules.addEventListener("input", filtrar);

let expensiveToCheaper = document.getElementById("expensiveToCheaper");
expensiveToCheaper.addEventListener("input", filtrar);

let cheaperToExpensive = document.getElementById("cheaperToExpensive");
cheaperToExpensive.addEventListener("input", filtrar);

//Funcion para generar la tienda segun el filtro

function generarTienda(arrayProductos, elementoPadreHTLM) {
  for (let i = 0; i < arrayProductos.length; i++) {
    tiendaHTML(arrayProductos, elementoPadreHTLM, i);
  }

  let botonesFiltro = Array.from(document.getElementsByClassName("Tiendabttn"));
  for (boton of botonesFiltro) {
    boton.addEventListener("click", añadirCarrito);
  }

  let CantidadInput = document.getElementsByClassName("Tiendainput");
  cantidadArray = Array.from(CantidadInput);
}

//Funcion que ejerce como filtro

function filtrar() {
  console.log(this.id);
  let id = this.id;
  filtroTienda(id);
}

function filtroTienda(filtro) {
  switch (filtro) {
    case "categoryCoffe":
      elementoPadreTienda.innerHTML = "";
      generarTienda(listadoCafes, elementoPadreTienda);

      break;
    case "categoryCapsules":
      elementoPadreTienda.innerHTML = "";
      generarTienda(listadoCapsulas, elementoPadreTienda);
      break;
    case "expensiveToCheaper":
      let eTc = totalProductos.sort((a, b) => {
        return a.value - b.value;
      });
      elementoPadreTienda.innerHTML = "";
      generarTienda(eTc, elementoPadreTienda);
      break;
    case "cheaperToExpensive":
      let cTe = totalProductos.sort((a, b) => {
        return b.value - a.value;
      });
      elementoPadreTienda.innerHTML = "";
      generarTienda(cTe, elementoPadreTienda);
      break;
    default:
      console.log("entro al default " + filtro);
      break;
  }
}

//---------------------------------------------------------------------

// traemos los botones generados
let botonesTienda = document.getElementsByClassName("Tiendabttn");

//Se añaden Eventos a todos los botones
for (boton of botonesTienda) {
  boton.addEventListener("click", añadirCarrito);
}

//Traemos los inputs de cantidad
let CantidadInput = document.getElementsByClassName("Tiendainput");
cantidadArray = Array.from(CantidadInput);

//esta funcion recibe un producto y lo busca en un array de los inputs de cantidad hasta encontrar el correcto y de esta forma devuelve el valor

function encontrarCantidad(pdt, arrayUnidades) {
  for (unidad of arrayUnidades) {
    if (pdt.idUnit == unidad.id) {
      return Number(unidad.value);
    }
  }
}

//Esta funcion busca un producto en el carrito para verificar si ya existe

function BuscarCarrito(arrayCarrito, producto) {
  for (let unidad of arrayCarrito) {
    if (unidad.idBtn == producto.idBtn) return unidad;
  }
}

//Esta funcion almacena un objeto de tipo producto en el carrito cuando se pulsa el boton correspondiente

function añadirCarrito() {
  console.log("se ejecuta");

  let idProducto = this.id;

  let producto = totalProductos.find(function (a) {
    if (a.idBtn == idProducto) {
      return a;
    }
  });

  let cantidad = encontrarCantidad(producto, cantidadArray);

  console.log(producto, "can" + cantidad);

  if (cantidad > 0 && cantidad <= producto.stock) {
    if (BuscarCarrito(carrito, producto)) {
      console.log("ya existo");

      let productoSumarUnidades = BuscarCarrito(carrito, producto);
      productoSumarUnidades.units += cantidad;

      producto.stock -= cantidad;
    } else {
      console.log("no existo");
      producto.stock -= cantidad;
      insertarProducto(
        carrito,
        producto.idBtn,
        producto.idUnit,
        producto.name,
        producto.value,
        producto.stock,
        producto.category,
        cantidad
      );
    }

    CarritoHTML.innerText = String(carrito.length);
    if (localStorage.hasOwnProperty("carrito")) {
      localStorage.removeItem("carrito");
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }
}


// ------------------------------------------------------------------------------------------------
// Script del  modal

let totalModal = document.getElementById("totalModal");
let contenidoModal = document.getElementById("contenidoModal");
let modalClose = document.getElementById("modalClose");
let botonModal = document.getElementById("carritoModal");
let botonComprar = document.getElementById("comprar");
let botonVolver = document.getElementById("volver");

console.log(botonVolver);

botonModal.onclick = () => {
    mostrarCarrito(carrito,contenidoModal);
    totalModal.classList.add("mActive");
}


modalClose.onclick = () => {
    contenidoModal.innerHTML = "";
    totalModal.classList.remove("mActive");
}

window.onclick = (event) => {
    if(event.target == totalModal){
        contenidoModal.innerHTML = "";
        totalModal.classList.remove("mActive");
    }
}

botonVolver.onclick = () => {
  console.log("aaaaaaa");
}


//Funciones para eliminar productos del carrito
function eliminarCarrito(producto,arrayProductos,arrayTotal){
    let productoEliminado = arrayProductos.find( (a) => {
        if (a.name == producto){
            return arrayProductos.indexOf(a);
        }
    });

    console.log(productoEliminado);

    arrayTotal.find((a) =>{
        if(a.name == arrayProductos[productoEliminado]){
            console.log("entra")

            a.stock += arrayProductos[productoEliminado].units;
        }
    })


    arrayProductos.splice(productoEliminado,1);

    contenidoModal.innerHTML = "";

    mostrarCarrito(carrito,contenidoModal);

    if(localStorage.hasOwnProperty("carrito")){
        localStorage.removeItem("carrito");
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    CarritoHTML.innerText = String(carrito.length);
} 

function eliminarProducto(){
    let pdt = this.className;
    eliminarCarrito(pdt,carrito,totalProductos);
    
}

// Mostrar los productos del carrito en el modal
function mostrarCarrito(arrayCarrito,modal){
    if(arrayCarrito.length > 0){

        for(producto of arrayCarrito){

            let modalItem = document.createElement("div");
            modalItem.classList.add("modalItem");
            modal.append(modalItem);
    
            modalItem.innerHTML = `
            <img src="../imagenes/coffe_bag.webp" alt="">
            <p>${producto.name}</p>
            <p>$${producto.value}</p>
            <p> unidades: ${producto.units}</p>
            <span class="${producto.name}">&times;<span>    
            `;    
            let spanClose = document.getElementsByClassName(producto.name)[0];
            spanClose.addEventListener("click",eliminarProducto);

            
        }
    }else{
        let carritoVacio = document.createElement("div");
        carritoVacio.classList.add("carritoVacio");
        modal.append(carritoVacio);
        
        carritoVacio.innerHTML = `<p>Todavia nos has agreagado ningun producto :( </p>`;


    }
    
}

