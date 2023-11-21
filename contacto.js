function openWhatsAppWindow() {
  // Lógica para abrir la ventana de WhatsApp
  // Reemplaza '1234567890' con tu número de teléfono o enlace de WhatsApp
  window.open('https://wa.me/1234567890', '_blank');
}

// Evento de clic en el botón de WhatsApp
document.getElementById('whatsapp-button').addEventListener('click', function() {
  openWhatsAppWindow();
});