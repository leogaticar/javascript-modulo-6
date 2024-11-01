function validarMonto(monto) {
    const numero = parseFloat(monto);
    return !isNaN(numero) && numero > 0;
}

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';

    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
} 