function convertir() {
    var pesos = document.getElementById("MXN").value;
    var resultado = document.getElementById("USD");
    var dolares = pesos * 0.055;
    resultado.value = dolares.toFixed(2);
    return false;
}