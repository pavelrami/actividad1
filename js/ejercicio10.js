function convertir() {
        var celsius = document.getElementById("CCC").value;
        var resultado = document.getElementById("FFF");

        var fahrenheit = (celsius * 9 / 5) + 32;
        resultado.value = fahrenheit + " °F";

        return false;
}