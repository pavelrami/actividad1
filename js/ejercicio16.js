const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => b !== 0 ? a / b : 'Error: División por cero';//Cuida la división entre 0

function calcularOperacion(operacion) {
    const valor1 = document.getElementById("numero1").value;
    const valor2 = document.getElementById("numero2").value;

    // parseFloat convierte el texto a número; si el texto no es un número válido, regresa NaN
    const numero1 = parseFloat(valor1);
    const numero2 = parseFloat(valor2);

    // isNaN() revisa si el valor es "Not a Number" (no es un número válido)
    if (isNaN(numero1) || isNaN(numero2)) {
        Swal.fire({
            icon: 'error',
            title: 'Datos inválidos',
            text: 'Por favor ingresa dos números válidos en ambos campos.'
        });
        return; // detenemos la función aquí, no seguimos calculando nada
    }

    let resultado;

    if (operacion === "suma") {
        resultado = sumar(numero1, numero2);
    } else if (operacion === "resta") {
        resultado = restar(numero1, numero2);
    } else if (operacion === "multiplicacion") {
        resultado = multiplicar(numero1, numero2);
    } else if (operacion === "division") {
        resultado = dividir(numero1, numero2);

        // Si dividir() regresó el mensaje de error (división entre cero), mostramos la alerta
        if (resultado === 'Error: División por cero') {
            Swal.fire({
                icon: 'error',
                title: 'División por cero',
                text: 'No se puede dividir un número entre cero.'
            });
            return;
        }
    }

    // Mostramos el resultado en el input de solo lectura
    document.getElementById("resultado").value = resultado;
}