const firebaseConfig = {
  apiKey: "AIzaSyDzDkDovbEEDb2NlLx-VHySABSCeStxeus",
  authDomain: "app-crud-nube-89a17.firebaseapp.com",
  projectId: "app-crud-nube-89a17",
  storageBucket: "app-crud-nube-89a17.firebasestorage.app",
  messagingSenderId: "917823300201",
  appId: "1:917823300201:web:5a510486dc7ddf03ad78f8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// VARIABLE GLOBAL
let idSeleccionado = null;

// CREATE (Crear)
function crearUsuario() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  db.collection("usuarios").add({
    nombre: nombre,
    correo: correo
  }).then(() => {
    limpiar();
    leerUsuarios();
  });
}

// READ (Leer)
function leerUsuarios() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  db.collection("usuarios").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();

      lista.innerHTML += `
        <li>
          ${data.nombre} - ${data.correo}
          <button onclick="editarUsuario('${doc.id}', '${data.nombre}', '${data.correo}')">Editar</button>
          <button onclick="eliminarUsuario('${doc.id}')">Eliminar</button>
        </li>
      `;
    });
  });
}

// UPDATE (Actualizar)
function editarUsuario(id, nombre, correo) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("correo").value = correo;
  idSeleccionado = id;
}

function actualizarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  db.collection("usuarios").doc(idSeleccionado).update({
    nombre: nombre,
    correo: correo
  }).then(() => {
    limpiar();
    leerUsuarios();
  });
}

// DELETE (Eliminar)
function eliminarUsuario(id) {
  db.collection("usuarios").doc(id).delete().then(() => {
    leerUsuarios();
  });
}

// LIMPIAR FORMULARIO
function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  idSeleccionado = null;
}

// INICIALIZAR
leerUsuarios();
