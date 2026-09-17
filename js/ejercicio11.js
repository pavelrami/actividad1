function convertir () {
    var kilometros = document.getElementById("KKK").value;
    var resultado = document.getElementById("MMM");
    var millas = kilometros * 0.621371;
    resultado.value = millas.toFixed(3) + " millas";
    return false;
}