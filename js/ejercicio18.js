// Referencias a los elementos del DOM que vamos a usar
const input = document.getElementById('nuevoElemento');
const botonAgregar = document.getElementById('agregarBtn');
const lista = document.getElementById('lista');
const errorMsg = document.getElementById('errorMsg');

function agregarElemento() {
    const texto = input.value.trim(); // valor del input sin espacios extra

    // Si está vacío, mostrar error y detener la función
    if (texto === '') {
        input.classList.add('is-invalid');
        errorMsg.style.display = 'block';
        return;
    }

    // Si hay texto, quitar cualquier error mostrado antes
    input.classList.remove('is-invalid');
    errorMsg.style.display = 'none';

    // Crear el <li> que contendrá el elemento de la lista
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Texto del elemento
    const span = document.createElement('span');
    span.textContent = texto;

    // Botón para eliminar este elemento
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'btn btn-danger btn-sm';
    botonEliminar.addEventListener('click', function () {
        li.remove(); // se elimina solo a sí mismo del DOM
    });

    // Armar el li y agregarlo a la lista
    li.appendChild(span);
    li.appendChild(botonEliminar);
    lista.appendChild(li);

    // Limpiar el input y devolverle el foco
    input.value = '';
    input.focus();
}

// Agregar al hacer clic en el botón
botonAgregar.addEventListener('click', agregarElemento);

// Agregar también al presionar Enter
input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') agregarElemento();
});