let listadoCapsulas = JSON.parse(localStorage.getItem("listadoCapsulas"));
let listadoCafes = JSON.parse(localStorage.getItem("listadoCafes"));
let totalProductos = JSON.parse(localStorage.getItem("TotalProductos"));
let carrito = JSON.parse(localStorage.getItem("carrito"));

console.log(totalProductos)


class Producto{
    constructor(idbtn,idunit,nombre,precio,inventario,categorias,unidades){
        this.idBtn = idbtn;
        this.idUnit = "0" + idunit
        this.name = nombre;
        this.value = precio;
        this.stock = inventario;
        this.category = categorias;
        this.units = unidades;
        this.imgURL = "/Proyecto_final/resources/imagenes/coffe_bag.webp";
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



//Generacion de productos de Tienda.html

let elementoPadreTienda = document.getElementsByClassName("mainTienda--Grid")[0];


for(let i = 0; i < totalProductos.length;i++){   

    tiendaHTML(totalProductos,elementoPadreTienda,i);

}