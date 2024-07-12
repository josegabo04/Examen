const masitas =[
    {id: 1, nombre: "Brownie", precio: 3200,
        img: "brownie.jpeg"
    },
    {id: 2, nombre: "Pie de limón", precio: 8000,
        img: "imagenes/productos/pie-limon.jpeg"
    },
    {id: 3, nombre: "kuchen de nuez", precio: 8000,
        img: "productos/kuchennuez.jpeg"
    },
    {id: 4, nombre: "Tortilla de cebolla", precio: 2500,
        img: "imagenes/productos/tortillaCebolla.jpeg"
    },
    {id: 5, nombre: "Pan de molde integral", precio: 2500,
        img: 'productos/panintegral.jpeg'
    },
    {id: 6, nombre: "Pan de aceitunas", precio: 1400,
        img: 'panintegral.jpeg'
    }
]



function cargarProductos(productos) {
    var container = document.getElementById('tProductos'); // Obtener el contenedor donde se insertarán los elementos
    
    productos.forEach(producto => {
        var div = document.createElement('div');
        div.classList = "col-sm-12 col-md-6 col-lg-3 rounded tarjetaProducto";
        
        var nombreProducto = document.createElement('h2');
        var precioProducto = document.createElement('p');
        var imgProducto = document.createElement('img');
        var boton = document.createElement('button')

        nombreProducto.textContent = producto.nombre;
        precioProducto.textContent = "$"+producto.precio;
        imgProducto.src = producto.img;
        boton.textContent = "Agregar al carrito";
        boton.classList = "btn btn-success";

        div.appendChild(imgProducto);
        div.appendChild(nombreProducto);
        div.appendChild(precioProducto);
        div.appendChild(boton);

        container.appendChild(div);
        div.getElementsByTagName("button")[0].addEventListener("click", ()=>agregarAlCarrito(producto))
    });
}

cargarProductos(masitas);




