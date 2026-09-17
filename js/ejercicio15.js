let estudiantes = [];

function analizarEstudiante() {
    const nombre = document.getElementById("nombre").value;
    const calificacion = parseFloat(document.getElementById("calificacion").value);
    estudiantes.push({nombre: nombre, calificacion: calificacion});

    mostrarLista();
    document.getElementById("nombre").value = "";
    document.getElementById("calificacion").value = "";

    estudiantes.forEach(estudiante => {
        console .log(estudiante.nombre + ": " + estudiante.calificacion);
    });
    return false;
    }

    function calcularCalif(){
        if (estudiantes.length === 0) return false;

    let promedio = estudiantes.reduce((total, estudiante) => total + estudiante.calificacion, 0) / estudiantes.length;
    let calificacionMayor = Math.max(...estudiantes.map(estudiante => estudiante.calificacion));
    let calificacionMenor = Math.min(...estudiantes.map(estudiante => estudiante.calificacion));

    document.getElementById("PROM").value = promedio.toFixed(2);
    document.getElementById("MAX").value = calificacionMayor;
    document.getElementById("MIN").value = calificacionMenor;

    return false;
    }

    function mostrarLista() {
    const lista = document.getElementById("listaEstudiantes");
    lista.innerHTML = "";

    estudiantes.forEach(estudiante => {
        const li = document.createElement("li");
        li.textContent = estudiante.nombre + ": " + estudiante.calificacion;
        lista.appendChild(li);
    });
}

function limpiarTodo() {
    estudiantes = [];

    document.getElementById("nombre").value = "";
    document.getElementById("calificacion").value = "";
    document.getElementById("MAX").value = "";
    document.getElementById("MIN").value = "";
    document.getElementById("PROM").value = "";

    document.getElementById("listaEstudiantes").innerHTML = "";
}