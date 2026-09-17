// CLOSURE: manejarTareas 
// La variable "tareas" queda "encerrada" dentro de este closure: nadie de fuera puede
// tocarla directamente, solo a través de los métodos que aquí mismo regresamos
// (agregar, eliminar, obtener).
const manejarTareas = (function () {

    // Al cargar la página, intentamos leer lo que ya había guardado en Local Storage.
    // localStorage.getItem() siempre regresa texto (o null si no existe nada esa clave),
    // por eso usamos JSON.parse() para convertir ese texto de vuelta a un array real.
    // Si no hay nada guardado todavía (null), empezamos con un array vacío.
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    // Función interna (privada): guarda el array actual de "tareas" en Local Storage.
    // JSON.stringify() hace lo contrario a JSON.parse(): convierte el array de JS a texto,
    function guardarEnStorage() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    // Agrega una tarea nueva al array y guarda el cambio
    function agregar(texto) {
        tareas.push({ texto: texto });
        guardarEnStorage();
    }

    // Elimina una tarea según su posición (índice) en el array
    function eliminar(indice) {
        tareas.splice(indice, 1); // quita 1 elemento a partir de esa posición
        guardarEnStorage();
    }

    // Regresa el array completo de tareas (para poder mostrarlas en pantalla)
    function obtener() {
        return tareas;
    }

    // Esto es lo único que "sale" del closure — el objeto con los 3 métodos.
    // La variable "tareas" de arriba nunca se expone directamente.
    return {
        agregar: agregar,
        eliminar: eliminar,
        obtener: obtener
    };

})();

//agregarTarea()Lee el texto del input, valida que no esté vacío, y usa el closure
//manejarTareas para guardar la nueva tarea. Luego vuelve a dibujar la lista.
function agregarTarea() {
    const input = document.getElementById("tarea");
    const texto = input.value.trim();

    if (texto === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Escribe una tarea antes de agregarla.'
        });
        return;
    }

    manejarTareas.agregar(texto);
    input.value = ""; // limpiamos el input para la siguiente tarea

    renderizarTareas();
}

//obtenerTareas()
//Función "puente" que expone las tareas guardadas, usando el closure por dentro.
function obtenerTareas() {
    return manejarTareas.obtener();
}

//eliminarTarea(indice)
//Muestra una confirmación con SweetAlert2 antes de borrar. Si el usuario confirma,
//usa el closure para eliminar esa tarea específica y vuelve a dibujar la lista.
function eliminarTarea(indice) {
    Swal.fire({
        title: '¿Eliminar esta tarea?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        // .isConfirmed es true solo si el usuario le dio clic al botón de confirmar
        if (resultado.isConfirmed) {
            manejarTareas.eliminar(indice);
            renderizarTareas();

            Swal.fire({
                icon: 'success',
                title: 'Tarea eliminada',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

//Dibuja la lista completa de tareas en el <ul>, generando un <li> por cada una,
// con su texto y un botón para eliminarla.
function renderizarTareas() {
    const lista = document.getElementById("listaTareas");
    lista.innerHTML = ""; // limpiamos lo que hubiera antes de volver a dibujar

    const tareas = obtenerTareas();

    tareas.forEach((tarea, indice) => {
        const li = document.createElement("li");

        // Usamos un template literal para armar el texto + el botón de eliminar en un solo li.
        // El índice se pasa directo a eliminarTarea(), para saber cuál tarea borrar.
        li.innerHTML = `
            ${tarea.texto}
            <button onclick="eliminarTarea(${indice})" style="width:auto; padding:4px 10px; margin:0; font-size:12px;">Eliminar</button>
        `;

        lista.appendChild(li);
    });
}

// Al cargar la página por primera vez, mostramos las tareas que ya estaban guardadas
renderizarTareas();