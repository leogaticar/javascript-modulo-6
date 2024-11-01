async function convertirMoneda(monto, monedaDestino) {
    try {
        if (!validarMonto(monto)) {
            throw new Error('Monto inválido');
        }

        const tasaCambio = await obtenerDatosMoneda(monedaDestino);
        console.log('Tasa de cambio obtenida:', tasaCambio);

        const resultado = parseFloat(monto) / tasaCambio;
        console.log('Resultado del cálculo:', resultado);

        return formatearResultado(resultado, monedaDestino);
    } catch (error) {
        console.error('Error en conversión:', error);
        throw error;
    }
}

const monedasInfo = {
    dolar: { 
        codigo: 'USD',
        simbolo: '$',
        codigoAPI: 'dolar'
    },
    euro: { 
        codigo: 'EUR',
        simbolo: '€',
        codigoAPI: 'euro'
    }
};

function formatearResultado(valor, moneda) {
    const monedaInfo = monedasInfo[moneda];
    return `${monedaInfo.simbolo}${valor.toFixed(2)}`;
}