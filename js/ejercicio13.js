function verificarVoto() {
    var edad = parseInt(document.getElementById("edad").value);
    var resultado = document.getElementById("voto");

    if (edad >= 18) {
        resultado.value = "Puedes votar.";
    } else {
        resultado.value = "No puedes votar.";
    }

    return false;
}