async function obtenerDatosMoneda(moneda) {
    try {
        // Primero obtenemos el valor actual
        const urlActual = 'https://mindicador.cl/api';
        const responseActual = await fetch(urlActual);
        const dataActual = await responseActual.json();
        
        if (!dataActual[moneda]) {
            throw new Error(`Moneda ${moneda} no encontrada`);
        }

        const valorActual = dataActual[moneda].valor;
        console.log(`Valor actual del ${moneda}:`, valorActual);

        // Obtener datos históricos
        const urlHistorico = `https://mindicador.cl/api/${moneda}`;
        console.log('Obteniendo histórico desde:', urlHistorico);
        
        const responseHistorico = await fetch(urlHistorico);
        const dataHistorico = await responseHistorico.json();
        
        console.log('Datos históricos recibidos:', dataHistorico);

        if (dataHistorico.serie && dataHistorico.serie.length > 0) {
            // Tomar solo los últimos 10 días
            const ultimos10Dias = dataHistorico.serie.slice(0, 10);
            console.log('Datos para el gráfico:', ultimos10Dias);

            // Crear el gráfico
            crearGrafico(ultimos10Dias, moneda);
        }

        return valorActual;
    } catch (error) {
        console.error('Error en obtenerDatosMoneda:', error);
        throw error;
    }
}

function crearGrafico(datos, moneda) {
    try {
        // Asegurarnos de que el contenedor existe y está visible
        const chartContainer = document.getElementById('chartContainer');
        if (!chartContainer) {
            console.error('No se encontró el contenedor del gráfico');
            return;
        }
        chartContainer.style.display = 'block';

        // Obtener el canvas
        const canvas = document.getElementById('historicalChart');
        if (!canvas) {
            console.error('No se encontró el canvas');
            return;
        }

        // Preparar los datos
        const fechas = datos.map(dato => new Date(dato.fecha).toLocaleDateString('es-CL'));
        const valores = datos.map(dato => dato.valor);

        // Si existe un gráfico previo, destruirlo
        if (window.historicalChart && typeof window.historicalChart.destroy === 'function') {
            window.historicalChart.destroy();
        }

        // Crear el nuevo gráfico
        const ctx = canvas.getContext('2d');
        window.historicalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: fechas.reverse(),
                datasets: [{
                    label: `Valor histórico del ${moneda}`,
                    data: valores.reverse(),
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Historial últimos 10 días - ${moneda.toUpperCase()}`
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: value => `$${value.toLocaleString('es-CL')}`
                        }
                    }
                }
            }
        });

        console.log('Gráfico creado exitosamente');
    } catch (error) {
        console.error('Error al crear el gráfico:', error);
    }
} 