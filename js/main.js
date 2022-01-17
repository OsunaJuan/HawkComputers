
class Producto{
    constructor(id,nombre,precio,inventario,categorias,unidades){
        this.id = id;
        this.name = nombre;
        this.value = precio;
        this.stock = inventario;
        this.category = categorias;
        this.units = unidades;
    }
}

//Esta funcion nos permite Añadir elementos a los arrays de productos

function insertarProducto(array,id,nombre,precio,inventario,categoriasTienda,uni){
    let objetoTemporal = new Producto(id,nombre,precio,inventario,categoriasTienda,uni);
    array.push(objetoTemporal);
}

//Funcion para enviar un producto al carrito

function pushToCart(cartArray, product, unidad){
    let newProduct;
    newProduct = insertarProducto(cartArray,product.id, product.name, product.value, product.stock,product.categorias, unidad);

    product.stock = product.stock - unidad;
    
}

//Funcion para mostrar los productos guardados en el carrito

function displayCarrito(array){
    let resultado = "Los productos que has seleccionado son:\n";
    let valorTotal = 0;
    let respuesta;

    if(array.length>0){
        for (let i = 0; i<= array.length-1;i++){
            resultado += i + 1 + ") " + array[i].name + " cantidad: " +  array[i].units + " Total: $" + array[i].value * array[i].units + "\n";
    
            valorTotal +=  array[i].value * array[i].units;
        }
    }

    respuesta = Number(prompt(resultado + "El valor total de los productos es: $" + valorTotal +"\n 1 para realizar la compra, 2 para volver al inicio"));

   if(respuesta == 1){
       alert("Gracias por la compra!");
       array.length = 0;
       resultado = "";
   }else{
       
   }
}

//Funcion para Mostrar el producto

function displayProduct(Producto){
    let unidades =Number(prompt("El producto Seleccionado es el siguente:\n"
    + "Nombre: " + Producto.name +"\n" 
    + "Valor: $" + Producto.value +"\n" 
    + "cuantas unidades quieres? (stock restante:" + Producto.stock + ")"));

    return unidades;
}

//Funcion para mostrar listado de productos

function displayTienda(array,carro) {
    let resultado ="";
    let respuesta;

    for(let i = 0; i<=array.length - 1; i++){
        resultado += i+1 + ") " + array[i].name + " $" + array[i].value + "\n";
    }
    respuesta = Number(prompt("Selecciona una opcion para añadir al carrito:\n " + resultado));
    if(respuesta <= array.length && respuesta > 0){

        let unidadesCarrito = displayProduct(array[respuesta-1]);


        if(unidadesCarrito <= array[respuesta-1].stock){

            pushToCart(carro,array[respuesta -1], unidadesCarrito); 

        }else{
            alert("Disculpa no tenemos suficientes unidades de ese producto")
        }

    }else{
        alert("Has introduccido una opcion incorrecta.")
    }

    
}

// Base de productos

let totalProductos = [];
let ListadoCafes= [];
let ListadoCapsulas = [];

//Array usado como carrito

var carrito = [];


// Se añaden los productos a vender en la pagina

    //Listado de Cafes.
insertarProducto(ListadoCafes,1,"Cafe Brasil Catuai",550,25,"Cafe");
insertarProducto(ListadoCafes,2,"Cafe Colombia Guanes",630,25,"Cafe");
insertarProducto(ListadoCafes,3,"Cafe Blend Brasil Colombia",450,25,"Cafe");
insertarProducto(ListadoCafes,4,"Cafe Brasil Bourbon",520, 25, "Cafe");
insertarProducto(ListadoCafes,5,"Cafe Guatemala",650,25,"Cafe");
insertarProducto(ListadoCafes,6,"Cafe Etiopia", 700,25,"Cafe");

    //Listado de Capsulas
insertarProducto(ListadoCapsulas,7,"Capsulas de Cafe de especialidad Brasil ",600,25,"Capsulas");
insertarProducto(ListadoCapsulas,8,"Capsulas de Cafe de especialidad Colombia ",590,25,"Capsulas");
insertarProducto(ListadoCapsulas,9,"Capsulas de Cafe de especialidad Oreiras ",620,25,"Capsulas");
insertarProducto(ListadoCapsulas,10,"Capsulas de Cafe Caffetino Dolce ",650,25,"Capsulas");
insertarProducto(ListadoCapsulas,11,"Capsulas de Cafe Caffetino Nespresso ",610,25,"Capsulas");

//Tienda de Cafes

var inicioTienda, categoriasTienda;
totalProductos = ListadoCafes.concat(ListadoCapsulas);

do{
    inicioTienda = Number(prompt("Hola, selecciona una opcion, o escribe 3 para salir\n" +
        "1) Ir a la tienda\n" + 
        "2) ir al carrito"));
    
    if(inicioTienda == 1){
        categoriasTienda = Number(prompt("Selecciona una opcion:\n"+
        "1) ver todos los productos\n"+
        "2) Para ver solo los cafes\n" + 
        "3) Para ver solo las capsulas de cafe\n" +
        "4) Para ver los productos de menor precio a mayor precio\n" + 
        "5) Para ver los productos de mayor a menor precio"));

        let compra;
    
        if(categoriasTienda == 1){
            displayTienda(totalProductos, carrito);

        }else if(categoriasTienda == 2){
            displayTienda(ListadoCafes, carrito);

        }else if(categoriasTienda == 3){
            displayTienda(ListadoCapsulas, carrito);
        }else if(categoriasTienda == 4){

            let leastToMost = totalProductos;
            leastToMost.sort(function(a,b){return a.value - b.value});
            displayTienda(leastToMost,carrito);
            
            
        }else if(categoriasTienda == 5){

            let mostToLeast = totalProductos;
            mostToLeast.sort(function(a,b){return b.value - a.value});
            displayTienda(mostToLeast,carrito);

        }else{
            alert("Has introduccido una opcion incorrecta!")
        }
    }else if(inicioTienda == 2){
        displayCarrito(carrito);
    }

}while(inicioTienda != "3")










