const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
    actualizarCarrito()
  }
})
botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})

stockProductos.forEach((producto) => {
  const div = document.createElement('div')
  div.classList.add('producto')
  div.innerHTML = `
    <img src = "${producto.img}" class = "card-img-tom imagenproductos">    
    <h2 class="fs-3"> ${producto.nombre} ${producto.color} </h2>
    <h3 class= " fs-1"> $${producto.precio} <del class= "opacity">$${producto.precioAnterior}</del> </h3>
    <p class=" fs-5 texto-productos"><b class="p-1">3</b>cuotas sin interés de<b class="p-1">$${producto.cuota}</b></p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
  contenedorProductos.appendChild(div)

  const boton = document.getElementById(`agregar${producto.id}`)
  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id)
  })
})

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)

  const indice = carrito.indexOf(item)

  carrito.splice(indice, 1)
  actualizarCarrito()
  console.log(carrito)
}

const agregarAlCarrito = (prodId) => {

  const existe = carrito.some(prod => prod.id === prodId)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === prodId) {
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === prodId)
    carrito.push(item)
  }

  actualizarCarrito()
}

const actualizarCarrito = () => {

  contenedorCarrito.innerHTML = ""

  carrito.forEach((prod) => {
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
        <p>${prod.nombre} ${prod.color}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

    contenedorCarrito.appendChild(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))

  })

  contadorCarrito.innerText = carrito.length

  console.log(carrito)
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0).toFixed(3)
}

//MODAL
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const seguirComprando = document.getElementById('seguirComprando')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', () => {
  contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () => {
  contenedorModal.classList.toggle('modal-active')
})
seguirComprando.addEventListener('click', () => {
  contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) => {
  contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
  event.stopPropagation()
})


//FORMULARIO
const btn = document.getElementById('button');
const telefonoEmpresa = (document.querySelector("#telefono").textContent =
  "+54 011-23875205")
const emailEmpresa = (document.querySelector("#emailE").textContent =
  "TecnologiaVR@outlook.com")
const direccion = (document.querySelector("#direccion").textContent =
  "Buenos Aires, Argentina.")

document.getElementById('form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'service_x9pgrhb';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'ENVIAR MENSAJE';
        alert('Mensaje enviado correctamente!');
      }, (err) => {
        btn.value = 'ENVIAR MENSAJE';
        alert(JSON.stringify(err));
      });
  });

//LIBRERIA
Swal.fire({
  title: 'Bienvenidos a Model Import!',
  html: '<b class"Alert"> Esperamos que te guste nuestra pagina web, en la parte inferior tendras un apartado de contacto por cualquier duda o sugerencia :)</b>',
  icon: 'info',
  background: '#fff',
  timer: 10000,
  timerProgressBar: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  confirmButtonColor: '#0d2033',
  showCloseButton: true,
  closeButtonAriaLabel: 'Cerrar Alerta'
});

function finalizar() {
  Swal.fire({
    title: 'Venta realizada',
    html: `<h1></h1><p>Venta guardada con el ID <strong>123465</strong></p><br><a href="https://i.ibb.co/Lx44DDd/73c6192e141680c958dff8b9872ce800.jpg javascript:window.print()" target="_blank">Imprimir ticket</a>`,
    icon: 'success',
    confirmButtonColor: '#0d2033',
  });
}

function vaciar() {
  Swal.fire({
    title: "Venta #123465",
    text: "¿Eliminar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    confirmButtonColor: '#0d2033',

    cancelButtonColor: "red"
  })
    .then(resultado => {
      if (resultado.value) {
        // Hicieron click en "Sí"
        console.log("*se elimina la venta*");
      } else {
        // Dijeron que no
        console.log("*NO se elimina la venta*");
      }
    })
}
