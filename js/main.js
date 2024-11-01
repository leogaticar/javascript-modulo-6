document.addEventListener('DOMContentLoaded', () => {
    const montoInput = document.getElementById('amount');
    const monedaSelect = document.getElementById('currency');
    const convertirBtn = document.getElementById('convert-btn');
    const resultadoSpan = document.getElementById('converted-amount');
    const errorDiv = document.getElementById('error-message');

    convertirBtn.addEventListener('click', async () => {
        try {
            // Ocultar mensaje de error previo
            errorDiv.style.display = 'none';
            
            const monto = montoInput.value;
            const monedaDestino = monedaSelect.value;

            if (!monto || isNaN(monto) || monto <= 0) {
                throw new Error('Por favor ingrese un monto válido');
            }

            const resultado = await convertirMoneda(monto, monedaDestino);
            resultadoSpan.textContent = resultado;
        } catch (error) {
            console.error('Error:', error);
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
            resultadoSpan.textContent = '0.00';
        }
    });
}); 