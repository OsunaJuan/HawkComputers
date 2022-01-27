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
        this.imgURL = "/resources/media/coffe_bag.webp";
    }
}

//Esta funcion nos permite Añadir elementos a los arrays de productos

function insertarProducto(array,idB,idU,nombre,precio,inventario,categoriasTienda,uni){
    let objetoTemporal = new Producto(idB,idU, nombre,precio,inventario,categoriasTienda,uni);
    array.push(objetoTemporal);
}

//funcion que Mostrara nuestros productos en la pagina

function bestSellerHTML(arrayProductos,elementoPadreHTLM,index){
    let divBSItem = document.createElement("div");
    divBSItem.classList.add("bestSeller--item")
    elementoPadreHTLM.appendChild(divBSItem);
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
    
    //Listado de Capsulas
let ListadoCapsulas = [];
insertarProducto(ListadoCapsulas,7,7,"Capsulas de Cafe Brasil",600,25,"Capsulas");
insertarProducto(ListadoCapsulas,8,8,"Capsulas de Cafe Colombia",590,25,"Capsulas");
insertarProducto(ListadoCapsulas,9,9,"Capsulas de Cafe Oreiras ",620,25,"Capsulas");
insertarProducto(ListadoCapsulas,10,10,"Capsulas de Cafe Caffetino Dolce ",650,25,"Capsulas");
insertarProducto(ListadoCapsulas,11,11,"Capsulas de Cafe Caffetino Nespresso ",610,25,"Capsulas");

// Array con el total de prodcutos
totalProductos = ListadoCafes.concat(ListadoCapsulas);

//Generacion automatica y aleatoria de los productos mas vendidos

let indexUsados = new Set();

for(let i = 0; i <=5;){
    let indexAleatorio = aleatorios(totalProductos.length);    

    if(!indexUsados.has(indexAleatorio)){
        bestSellerHTML(totalProductos,elementoPadreBS,indexAleatorio);
        i++
    }

    indexUsados.add(indexAleatorio)
}

//-------------------------------------------------------------------------------------------------

//Traemos el parrafo donde se indica la cantidad de productros en el carrito

let CarritoHTML = document.getElementById("carrito");

console.dir(CarritoHTML);

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
            return Number(unidad.value);
        }
    }
}

let carrito = [];

//Esta funcion almacena un objeto de tipo producto en el carrito cuando se pulsa el boton correspondiente

function añadirCarrito(){
    let idProducto = this.id;

    let producto = totalProductos.find(function(a){
        if(a.idBtn == idProducto){
            return a;
        }
    });

    
    let cantidad = encontrarCantidad(producto,cantidadArray);

    

    if(cantidad > 0 && cantidad<producto.stock){

        //TODO : VERIFICADOR DE QUE EL PRODUCTO YA ESTE EN CARRITO Y ACTUALIZADOR DE CANTIDAD

        producto.stock -= cantidad;

        insertarProducto(carrito,producto.idBtn,producto.idUnit,producto.name,producto.value,producto.stock,producto.category,cantidad);
        
        CarritoHTML.innerText = String(carrito.length);

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    
    
}


