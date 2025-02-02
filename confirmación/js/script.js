// Lista de invitados con sus cupos asignados
const invitados = {
    "Makinson dos Santos": 1,
    "Sandra dos Santos Gómez": 2,
    "Jazmín Rivero": 3,
    "Carina Ramos": 4,
    "Loy Gomez": 1
};

// Función para buscar el invitado en index.html
function buscarInvitado(event) {
    event.preventDefault(); // Evitar recarga de página

    let nombre = document.getElementById("nombre").value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese su nombre.");
        return;
    }

    // Verificar si el nombre está en la lista de invitados
    if (invitados[nombre] !== undefined) {
        // Guardar el nombre y los cupos en localStorage
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("cupos", invitados[nombre]);

        // Redirigir a la página de confirmación
        window.location.href = "confirmacion.html";
    } else {
        alert("Nombre no encontrado en la lista de invitados.");
    }
}

// Función para cargar los datos en confirmacion.html
function cargarDatosConfirmacion() {
    let nombre = localStorage.getItem("nombre");
    let cupos = localStorage.getItem("cupos");

    if (nombre && cupos) {
        document.getElementById("nombreInvitado").textContent = nombre;
        document.getElementById("cupos").textContent = cupos;
    } else {
        alert("No se encontraron datos. Redirigiendo...");
        window.location.href = "index.html";
    }
}

// Función para guardar la confirmación de asistencia
function guardarConfirmacion(event) {
    event.preventDefault(); // Evitar recarga de página

    const asistencia = document.querySelector('input[name="asistencia"]:checked');
    const lugares = document.getElementById("lugaresConfirmados").value;

    if (!asistencia || !lugares) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const confirmacion = {
        nombre: localStorage.getItem("nombre"),
        asistencia: asistencia.value,
        lugaresConfirmados: lugares
    };

    // Guardar la confirmación en localStorage
    let confirmaciones = JSON.parse(localStorage.getItem("confirmaciones")) || [];
    confirmaciones.push(confirmacion);
    localStorage.setItem("confirmaciones", JSON.stringify(confirmaciones));

    // Guardar la respuesta de asistencia en localStorage para usarla en gracias.html
    localStorage.setItem("asistenciaConfirmada", confirmacion.asistencia);

    // Redirigir a la página de agradecimiento
    window.location.href = "gracias.html";
}

// Función para cargar el mensaje personalizado en gracias.html
function cargarMensajeGracias() {
    const asistencia = localStorage.getItem("asistenciaConfirmada");

    const mensajeGracias = document.getElementById("mensajeGracias");
    const detalleGracias = document.getElementById("detalleGracias");

    if (asistencia === "si") {
        mensajeGracias.textContent = "¡Gracias por confirmar tu asistencia!";
        detalleGracias.textContent = "¡Nos vemos en mis quince años!.";
    } else if (asistencia === "no") {
        mensajeGracias.textContent = "Lamentamos que no puedas asistir.";
        detalleGracias.textContent = "Espero verte en otra ocasión. ¡Gracias por avisarme!";
    } else {
        mensajeGracias.textContent = "¡Gracias por confirmar tu asistencia!";
        detalleGracias.textContent = "¡Nos vemos en mis quince años!.";
    }
}

// Función para cargar todas las confirmaciones en ver_confirmaciones.html
function cargarConfirmaciones() {
    let confirmaciones = JSON.parse(localStorage.getItem("confirmaciones")) || [];
    const tabla = document.getElementById("tablaConfirmaciones").getElementsByTagName('tbody')[0];

    confirmaciones.forEach(confirmacion => {
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = confirmacion.nombre;
        fila.insertCell(1).textContent = confirmacion.asistencia;
        fila.insertCell(2).textContent = confirmacion.lugaresConfirmados;
    });
}

// Asignar los eventos cuando la página cargue
window.onload = function() {
    if (window.location.pathname.includes("index.html")) {
        const botonContinuar = document.getElementById("continuarBtn");
        botonContinuar.addEventListener("click", buscarInvitado);
    } 

    if (window.location.pathname.includes("confirmacion.html")) {
        cargarDatosConfirmacion();
        const confirmarBtn = document.getElementById("confirmarBtn");
        confirmarBtn.addEventListener("click", guardarConfirmacion);
    }

    if (window.location.pathname.includes("gracias.html")) {
        cargarMensajeGracias();
    }

    if (window.location.pathname.includes("ver_confirmaciones.html")) {
        cargarConfirmaciones();
    }
};
