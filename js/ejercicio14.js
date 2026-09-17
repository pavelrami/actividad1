function analizarCadena() {
    var cadena = document.getElementById("cadena").value;
    var numeros = cadena.split(",").map(Number);
    var max = Math.max(...numeros);
    var min = Math.min(...numeros);
    var prom = numeros.reduce((a, b) => a + b, 0) / numeros.length;

    document.getElementById("MAX").value = max;
    document.getElementById("MIN").value = min;
    document.getElementById("PROM").value = prom.toFixed(2);

    return false;
}