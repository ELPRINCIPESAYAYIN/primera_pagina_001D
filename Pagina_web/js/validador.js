// objeto.metodo(json)

$(document).ready(function() {

    // Agregar método de validación para RUT chileno
    $.validator.addMethod("rutChileno", function(value, element) {

      // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
      var rutPattern = /^\d{7,8}-[\dK]$/;
      if (!rutPattern.test(value)) {
          return false;
      }
  
      // Validar el dígito verificador
      var rutSinGuion = value.replace("-", "");
      var rut = rutSinGuion.slice(0, -1);
      var dv = rutSinGuion.slice(-1);
      var factor = 2;
      var sum = 0;
      for (var i = rut.length - 1; i >= 0; i--) {
          sum += parseInt(rut.charAt(i)) * factor;
          factor = factor === 7 ? 2 : factor + 1;
      }
      var dvCalculado = 11 - (sum % 11);
      dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();
  
      return dv === dvCalculado;
    }, "El RUT no es válido (escriba sin puntos y con guión)");

  // Agregar método de validación para correo
    $.validator.addMethod("emailCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

    }, 'El formato del correo no es válido');

    $.validator.addMethod("requireGroup", function(value, element, options) {
      var groupName = options.groupName;
      return $("input[name='" + groupName + "']:checked").length > 0;
    }, "Por favor seleccione una opción.");
  
    $.validator.addMethod("soloLetras", function(value, element) {
      return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
    }, "Por favor ingrese solo letras");

    $.validator.addMethod("soloNumeros", function(value, element) {
      return this.optional(element) || /^[0-9]+$/.test(value);
  }, "Por favor ingrese solo números");

  document.getElementById('rut').addEventListener('keyup', function(e) {
    e.target.value = e.target.value.toUpperCase();
  });
//falta  id solo numero, la k en mayusculas y ortografia.


  $("#formulario_usuario").validate({
    rules: {
      id:{
        required: true,
        soloNumeros: true,
        minlength: 3,
      },
      tipoUsuario:{
        requireGroup: { groupName: "tipoUsuario" }
      },
      rut:{
        required: true,
        rutChileno: true,
      },
      nombres:{
        required: true,
        soloLetras: true,
      },
      apellidos: {
        required: true,
        soloLetras: true,
        
      },
      email: {
        required: true,
        emailCompleto: true,
      },
      direccion:{
        required: true,
      },
      contraseña:{
        required: true,
      },

    }, // --> Fin de reglas
    messages: {
      id: {
        required: "El ID es un campo obligatorio",
        soloNumeros:"Solo se permite Numeros",       
        minlength: "Mínimo 3 caracteres", 
      },
      tipoUsuario: {
        requireGroup: "Por favor seleccione una opción."
      },
      rut:{
        required: "El RUT es un campo obligatorio",
        rutChileno: "El formato del rut no es válido"
      },
      nombres:{
        required: "El Nombres es un campo obligatorio",
      },
      apellidos: {
        required: "El Apellidos es un campo requerido",

      },
      email:{
        required: "La Email es un campo requerido",
      },
      direccion:{
        required: "La Direccion es una campo obligatorio",

      },
      contraseña: {
        required: "La Contraseña es un campo obligatorio",
      },
      
    },
    errorPlacement: function(error, element) {
      if (element.attr("name") == "tipoUsuario") {
          error.insertAfter("#tipoUsuarioError");
      }
      else if (element.attr("name") == "contraseña") {
          error.insertAfter("#contraseña_error");
        }  
      else {
          error.insertAfter(element);
      }
  },

  
  });


$("#registro").validate({
  rules: {
    rut: {
      required: true,
      rutChileno: true
    },
    nombre:{
      required: true,
      soloLetras: true,

    },
    apellido:{
      required: true,
      soloLetras: true,
    },
    correo:{
      required: true,
      emailCompleto: true,
    },
    direccion:{
      required: true,
    },
    password: {
      required: true,
      minlength: 5,
      maxlength: 15,
    },
    password2: {
      required: true,
      equalTo: "#password",
    },
  }, // --> Fin de reglas
  messages: {
    rut: {
      required: "El Rut es un campo obligatorio",
      rutChileno: "El formato del rut no es válido"
    },
    nombre:{
      required: "El Nombre es un campo obligatorio",
    },
    apellido:{
      required: "El Apellido es un campo obligatorio",
    },
    correo: {
      required: "El Email es un campo requerido",
      emailCompleto: "El email no cumple el formato de un correo",
    },
    direccion:{
      required: "La Direccion es un campo requerido",
    },
    password:{
      required: "La Contraseña es una campo obligatorio",
      minlength: "Mínimo 5 caracteres",
      maxlength: "Maximo 15 carecteres"
    },
    password2: {
      required: "Repita la Contraseña anterior",
      equalTo: "Debe ser igual al campo contraseña",
    },
  },
});



});

