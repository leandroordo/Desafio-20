const arrUsuarios = [];

class UsuarioBasic {
  nombre;
  correo;
  contraseña;

  constructor(nombre, correo, contraseña) {
    this.nombre = nombre;
    this.correo = correo;
    this.contraseña = contraseña;
  }
}

class Usuario extends UsuarioBasic {
  id;

  constructor(id, nombre, correo, contraseña) {
    super(nombre, correo, contraseña);
    this.id = id;
  }
}

class Formulario extends UsuarioBasic {
  validarUsuario() {
    return typeof this.nombre === "string" && this.nombre.trim().length >= 3;
  }

  validarCorreo() {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.correo).toLowerCase());
  }

  validarContraseña() {
    if (typeof this.contraseña === "string" && this.contraseña.trim() !== "") {
      if (this.contraseña.length >= 8) {
        // Validar que la clave tenga al menos una letra mayúscula (de la A a la Z) y al menos un número
        if (/[A-Z]/.test(this.contraseña) && /\d/.test(this.contraseña)) {
          return true;
        }
      }
    }
    return false;
  }

  registrarUsuario() {
    if (
      !this.validarUsuario() ||
      !this.validarCorreo() ||
      !this.validarContraseña()
    ) {
      return false;
    }
    const id = arrUsuarios.length;
    const newUsuario = new Usuario(
      id,
      this.nombre,
      this.correo,
      this.contraseña
    );
    arrUsuarios.push(newUsuario);
    return true;
  }
}

class TablaUsuarios {
  render() {
    var htmlUsuarios = "";
    arrUsuarios.forEach((usuario) => {
      htmlUsuarios += `<tr>
        <th scope="row">${usuario.id}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
      </tr>`;
    });

    return htmlUsuarios;
  }
}

function addUser(nombre, email, password) {
  const newFormulario = new Formulario(nombre, email, password);
  return newFormulario.registrarUsuario();
}

function showUsers() {
  const newTabla = new TablaUsuarios();
  const tabla = document.getElementById("usersTable");
  tabla.innerHTML = newTabla.render();
}

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        if (form.checkValidity() === false) {
          form.reportValidity();
          return;
        }

        form.classList.add("was-validated");
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("correo").value.trim();
        const password = document.getElementById("contraseña").value.trim();

        if (addUser(nombre, email, password)) {
          showUsers();
        }

        //Cerrar el form
        var modalElement = document.getElementById("addUserModal");
        var modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        //form.reset();
        return false;
      },
      false
    );
  });

  var modalElement = document.getElementById("addUserModal");
  modalElement.addEventListener("hidden.bs.modal", () => {
    document.querySelectorAll(".needs-validation")[0].reset();
  });
})();
