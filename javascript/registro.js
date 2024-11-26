document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const domicilio = document.getElementById('domicilio').value.trim();
    const password = document.getElementById('pwd').value.trim();
    if (nombre && correo && telefono && domicilio && password) {
        document.querySelector('.registro-container').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
    } else {
        alert('Por favor, completa todos los campos antes de continuar.');
    }
});