// Script para manejar las preguntas frecuentes
$(document).ready(function () {

  // Ocultar todas las respuestas al principio
  $(".faq-answer").hide();

  // Manejar clics en preguntas
  $(".faq-question").click(function () {
    // Obtener el elemento hermano siguiente (respuesta)
    var answer = $(this).next(".faq-answer");

    // Alternar la visibilidad de la respuesta
    answer.slideToggle(200);

    // Cambiar el ícono de la pregunta
    $(this).toggleClass("active");
  });
});