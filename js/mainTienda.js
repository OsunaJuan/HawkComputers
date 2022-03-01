//Elemento padre donde se mostraran los productos de la seccion BestSeller
let elementoPadreBS = document.getElementById("BestSellerJS");


//Se define la clase producto

class Producto{
    constructor(idbtn,idunit,nombre,precio,inventario,categorias,unidades){
        this.idBtn = idbtn;
        this.idUnit = "0" + idunit
        this.name = nombre;
        this.value = precio;
        this.stock = inventario;
        this.category = categorias;
        this.units = unidades;
        this.imgURL = "../../resources/imagenes/coffe_bag.webp";
    }
}

//Esta funcion nos permite Añadir elementos a los arrays de productos

function insertarProducto(array,idB,idU,nombre,precio,inventario,categoriasTienda,uni){
    let objetoTemporal = new Producto(idB,idU, nombre,precio,inventario,categoriasTienda,uni);
    array.push(objetoTemporal);
}

//funcion que Mostrara nuestros productos en la pagina

function tiendaHTML(arrayProductos,elementoPadreHTLM,index){
    let divBSItem = document.createElement("div");
    divBSItem.classList.add("bestSeller--item")
    elementoPadreHTLM.prepend(divBSItem);
    
    divBSItem.innerHTML = 
    `<img src=${arrayProductos[index].imgURL} alt="">
    <p>${arrayProductos[index].name}</p>
    <p> $${arrayProductos[index].value}</p>
    <div>
        <p>Cantidad</p>
        <input type="text" class="BSinput" id=${arrayProductos[index].idUnit}>
    </div>
    <button class="BSbttn" id="${arrayProductos[index].idBtn}">Comprar</button>`;

}

//Funcion numeros aleatorios

function aleatorios(LengthArray){
    let numMax = LengthArray;
    let numAleatorio = Math.random();

    return Math.floor(numAleatorio*numMax);
}


// Se añaden los productos a vender en la pagina

    //Listado de Cafes.
let ListadoCafes = [];
insertarProducto(ListadoCafes,1,1,"Cafe Brasil Catuai",550,25,"Cafe");
insertarProducto(ListadoCafes,2,2,"Cafe Colombia Guanes",630,25,"Cafe");
insertarProducto(ListadoCafes,3,3,"Cafe Blend Brasil Colombia",450,25,"Cafe");
insertarProducto(ListadoCafes,4,4,"Cafe Brasil Bourbon",520, 25, "Cafe");
insertarProducto(ListadoCafes,5,5,"Cafe Guatemala",650,25,"Cafe");
insertarProducto(ListadoCafes,6,6,"Cafe Etiopia", 700,25,"Cafe");

    //lo almacenamos en el local storage

    if(!localStorage.hasOwnProperty("listadoCafes")){
        localStorage.setItem("listadoCafes", JSON.stringify(ListadoCafes));
    }
    
    //Listado de Capsulas
let ListadoCapsulas = [];
insertarProducto(ListadoCapsulas,7,7,"Capsulas de Cafe Brasil",600,25,"Capsulas");
insertarProducto(ListadoCapsulas,8,8,"Capsulas de Cafe Colombia",590,25,"Capsulas");
insertarProducto(ListadoCapsulas,9,9,"Capsulas de Cafe Oreiras ",620,25,"Capsulas");
insertarProducto(ListadoCapsulas,10,10,"Capsulas de Cafe Caffetino Dolce ",650,25,"Capsulas");
insertarProducto(ListadoCapsulas,11,11,"Capsulas de Cafe Caffetino Nespresso ",610,25,"Capsulas");

        //lo almacenamos en el local storage

        if(!localStorage.hasOwnProperty("listadoCapsulas")){
            localStorage.setItem("listadoCapsulas", JSON.stringify(ListadoCapsulas));
        }

// Array con el total de prodcutos
totalProductos = ListadoCafes.concat(ListadoCapsulas);

    //lo almacenamos en el local storage

    if(!localStorage.hasOwnProperty("TotalProductos")){
        localStorage.setItem("TotalProductos", JSON.stringify(totalProductos));
    }

//Generacion automatica y aleatoria de los productos mas vendidos


//Codigo para cambiar la cantidad de productos generados segun el tamaño de pantalla

var mediaqueryList = window.matchMedia("(max-width: 800px)");

let productosMostrados;

if(mediaqueryList.matches){
    productosMostrados = 2
}else{
    productosMostrados = 5
}

let indexUsados = new Set();

for(let i = 0; i <=productosMostrados;){
    let indexAleatorio = aleatorios(totalProductos.length);    

    if(!indexUsados.has(indexAleatorio)){
        tiendaHTML(totalProductos,elementoPadreBS,indexAleatorio);
        i++
    }

    indexUsados.add(indexAleatorio)
}

//-------------------------------------------------------------------------------------------------

//Traemos el parrafo donde se indica la cantidad de productros en el carrito

let CarritoHTML = document.getElementById("carrito");

// traemos los botones generados
let botonesBs = document.getElementsByClassName("BSbttn");

//Se añaden Eventos a todos los botones
for(boton of botonesBs){
    boton.addEventListener("click", añadirCarrito)
};

//Traemos los inputs de cantidad
let CantidadInput = document.getElementsByClassName("BSinput");
let cantidadArray = Array.from(CantidadInput);

//esta funcion recibe un producto y lo busca en un array de los inputs de cantidad hasta encontrar el correcto y de esta forma devuelve el valor

function encontrarCantidad(pdt,arrayUnidades){
    for(unidad of arrayUnidades){
        if(pdt.idUnit == unidad.id){
            let cantidad = Number(unidad.value);
            unidad.value = "";
            return cantidad
        }
    }
}


//Esta funcion busca un producto en el carrito para verificar si ya existe

function BuscarCarrito(arrayCarrito,producto){
    for(let unidad of arrayCarrito){
        if(unidad.idBtn == producto.idBtn) return unidad;

    }
}

//Esta funcion almacena un objeto de tipo producto en el carrito cuando se pulsa el boton correspondiente

if(localStorage.hasOwnProperty("carrito")){
    var carrito = JSON.parse(localStorage.getItem("carrito"));
    CarritoHTML.innerText = String(carrito.length);
}else{
    var carrito = [];
}


function añadirCarrito(){
    let idProducto = this.id;

    let producto = totalProductos.find(function(a){
        if(a.idBtn == idProducto){
            return a;
        }
    });

    
    let cantidad = encontrarCantidad(producto,cantidadArray);

    

    if(cantidad > 0 && cantidad <= producto.stock){

        if(BuscarCarrito(carrito,producto) ){
            console.log("ya existo");

            let productoSumarUnidades = BuscarCarrito(carrito,producto);
            productoSumarUnidades.units += cantidad;

            producto.stock -= cantidad;


        }else{
            console.log("no existo");
            producto.stock -= cantidad;
            insertarProducto(carrito,producto.idBtn,producto.idUnit,producto.name,producto.value,producto.stock,producto.category,cantidad);
        }


        
        CarritoHTML.innerText = String(carrito.length);
        if(localStorage.hasOwnProperty("carrito")){
            localStorage.removeItem("carrito");
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }else{
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
    contenidoModal.innerHTML = "";
    totalModal.classList.remove("mActive");
}

botonComprar.onclick = () => {

    if(carrito.length>0){
        contenidoModal.innerHTML = "";
        contenidoModal.innerHTML = `<p class="carritoVacio">Gracias por tu compra!</p>`
    }else{
        contenidoModal.innerHTML = "";
        contenidoModal.innerHTML = `<p class="carritoVacio">Aun no has agregado nada al carro de compra!</p>`
    }

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
            <img src="resources/imagenes/coffe_bag.webp" alt="">
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



