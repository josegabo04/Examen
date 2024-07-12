/*let cart =[]*/

function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("masitas"))
    console.log(memoria);
    if (!memoria) {
        const nuevoProducto = generaProducto(producto);
        localStorage.setItem("masitas", JSON.stringify([nuevoProducto]))
    } else {
        const indiceProducto = memoria.findIndex(masita => masita.id === producto.id)
        console.log(indiceProducto)
        const cart = memoria;
        if (indiceProducto === -1) {
            cart.push(generaProducto(producto))
        } else {
            cart[indiceProducto].cantidad++;
        }
        localStorage.setItem("masitas", JSON.stringify(cart))
    }
    actNumCart();
    cargarCarrito();
    actualizaTotal();
}

function generaProducto(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const container = document.getElementById('modalCarrito');
function cargarCarrito() {
    container.innerHTML = "";
    const carro = JSON.parse(localStorage.getItem("masitas"))
    console.log(carro);

    if (carro && carro.length > 0) {
        actualizaTotal();
        /*
        var divTotal = document.createElement('div');
        var total = document.createElement('span');
        let aux = actualizaTotal();
        total.textContent = "Total a Pagar: $"+ aux;
        divTotal.appendChild(total);
        */
        carro.forEach((producto) => {
            var div = document.createElement('div');
            div.classList = "row";
            var divProd = document.createElement('div');
            divProd.classList = "mcart col-7 ps-2 pe-2 pt-2 pb-2";
            var imgProducto = document.createElement('img');
            var nombreProducto = document.createElement('h5');

            var divPrecio = document.createElement('div');
            divPrecio.classList = "col-2 ps-2 pe-2 pt-2 pb-2";
            var precioProducto = document.createElement('p');

            var divCan = document.createElement('div');
            divCan.classList = "canCar col-3 ps-2 pe-2 pt-2 pb-2";
            var botonmas = document.createElement('button');
            botonmas.classList = "btn btn-success";
            var cantidadProducto = document.createElement('span');
            cantidadProducto.classList = "cantidadProd";
            var botonmenos = document.createElement('button');
            botonmenos.classList = "btn btn-success";

            imgProducto.src = producto.img;
            nombreProducto.textContent = producto.nombre;
            precioProducto.textContent = "$" + producto.precio;
            botonmas.textContent = "+";
            botonmas.addEventListener("click", () => agregarAlCarrito(producto))
            cantidadProducto.textContent = producto.cantidad;
            botonmenos.textContent = "-";
            botonmenos.addEventListener("click", () => restaCantidad(producto))
            //total.textContent = "Total a pagar: $";

            divProd.appendChild(imgProducto);
            divProd.appendChild(nombreProducto);
            divPrecio.appendChild(precioProducto);
            divCan.appendChild(botonmenos);
            divCan.appendChild(cantidadProducto);
            divCan.appendChild(botonmas);
            div.appendChild(divProd);
            div.appendChild(divPrecio);
            div.appendChild(divCan);

            container.appendChild(div);
            //container.appendChild(divTotal);
        });
    } else {
        var div = document.createElement('div');
        var mensajeVacio = document.createElement('h2');
        mensajeVacio.textContent = "El carrito está vacio";
        div.appendChild(mensajeVacio);
        container.appendChild(div);
    }

}
cargarCarrito()


const spanContador = document.getElementById("contador");
function actNumCart() {
    const carro = JSON.parse(localStorage.getItem("masitas"))
    if (carro && carro.length > 0) {
        const memoria = JSON.parse(localStorage.getItem("masitas"));
        const contador = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        spanContador.innerText = contador;
    }else{
        spanContador.innerText = 0;
    }
}
actNumCart();


function restaCantidad(producto) {
    const memoria = JSON.parse(localStorage.getItem("masitas"));
    const indiceProducto = memoria.findIndex(masita => masita.id === producto.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("masitas", JSON.stringify(memoria));

    cargarCarrito();
    actualizaTotal();
    actNumCart();
}


function actualizaTotal() {
    const spanTotal = document.getElementById("sTotal");
    const carro = JSON.parse(localStorage.getItem("masitas"));
    let total = 0;
    if (carro && carro.length > 0) {
        carro.forEach((producto) => {
            let totalprod = producto.precio * producto.cantidad;
            total = total + totalprod;
        });
        console.log(total)
        spanTotal.innerText = "Total a pagar: $" + total;
    }else{
        spanTotal.innerText = "";
    }

}


const btnVaciar = document.getElementById("btnVaciar")
btnVaciar.addEventListener("click", vaciarCarrito());
function vaciarCarrito() {
    localStorage.removeItem("masitas");
    actNumCart();
    cargarCarrito();
    actualizaTotal();
}