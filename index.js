const fetch = require('node-fetch');




fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => clean(json))
.then(data => console.log(JSON.stringify(data)));



function clean(jsonData) {
    return jsonData.ListaEESSPrecio.map(generatePoint);
}


function generatePoint(data) {
    return {
        name: data['Rótulo'],
        lat: valueOrNull(data.Latitud),
        lon: valueOrNull(data['Longitud (WGS84)']),
        gasoA: valueOrNull(data['Precio Gasoleo A']),
        gasoB: valueOrNull(data['Precio Gasoleo B']),
        gas95: valueOrNull(data['Precio Gasolina 95 Protección']),
        gas98: valueOrNull(data['Precio Gasolina  98']),
        id: valueOrNull(data['IDEESS']),
    };
}


function valueOrNull(data) {
    if (!data) {
        return null;
    }
    return parseFloat(data.replace(',', '.'))
}
