$(document).ready(function() {
  var totalCarrito = 0;
  var carrito = []; // Array para almacenar productos en el carrito

  $('#myCarousel').carousel();

  // Función para agregar productos al carrito
  $(".btn-agregar").on("click", function () {
    var nombre = $(this).data("nombre");
    var precio = $(this).data("precio");
    carrito.push({ nombre: nombre, precio: precio });
    actualizarCarrito();
  });

  // Función para quitar productos del carrito
  $(".btn-quitar").on("click", function () {
    var nombre = $(this).data("nombre");
    var precio = $(this).data("precio");
    carrito = carrito.filter(function (item) {
      return item.nombre !== nombre || item.precio !== precio;
    });
    actualizarCarrito();
  });
// Función para actualizar la visualización del carrito
function actualizarCarrito() {
  // Limpiamos el contenido actual del carrito
  $("#listaCarrito").empty();

  // Iteramos sobre los productos en el carrito y los mostramos
  carrito.forEach(function (producto) {
    $("#listaCarrito").append(
      "<li class='list-group-item'>" +
        producto.nombre +
        " - $" +
        producto.precio +
        "</li>"
    );
  });

  // Calculamos y mostramos el total del carrito
  totalCarrito = carrito.reduce(function (total, producto) {
    return total + producto.precio;
  }, 0);

  $("#totalCarrito").text("$" + totalCarrito);
}

// Llamamos a la función para inicializar el carrito
actualizarCarrito();
});