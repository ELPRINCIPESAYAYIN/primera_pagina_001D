// objeto.metodo(json)

$(document).ready(function() {

    // Agregar método de validación para RUT chileno
    $.validator.addMethod("rutChileno", function(value, element) {
      // Eliminar puntos y guión del RUT
      value = value.replace(/[.-]/g, "");
  
      // Validar que el RUT tenga 8 o 9 dígitos
      if (value.length < 8 || value.length > 9) {
        return false;
      }
  
      // Validar que el último dígito sea un número o una 'K'
      var validChars = "0123456789K";
      var lastChar = value.charAt(value.length - 1).toUpperCase();
      if (validChars.indexOf(lastChar) == -1) {
        return false;
      }
  
      // Calcular el dígito verificador
      var rut = parseInt(value.slice(0, -1), 10);
      var factor = 2;
      var sum = 0;
      var digit;
      while (rut > 0) {
        digit = rut % 10;
        sum += digit * factor;
        rut = Math.floor(rut / 10);
        factor = factor === 7 ? 2 : factor + 1;
      }
      var dv = 11 - (sum % 11);
      dv = dv === 11 ? "0" : dv === 10 ? "K" : dv.toString();
  
      // Validar que el dígito verificador sea correcto
      return dv === lastChar;
    }, "Por favor ingrese un RUT válido."); 

    $.validator.addMethod("emailCompleto", function(value, element) {

      // Expresión regular para validar correo electrónico
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
  
      // Validar correo electrónico con la expresión regular
      return regex.test(value);
  
    }, 'Ingrese un correo válido');

    $.validator.addMethod("requireGroup", function(value, element, options) {
      var groupName = options.groupName;
      return $("input[name='" + groupName + "']:checked").length > 0;
    }, "Por favor seleccione una opción.");
  

  $("#formulario_producto").validate({
    rules: {
      id:{
        required: true,
        minlength: 3
      },
      tipoUsuario:{
        requireGroup: { groupName: "tipoUsuario" }
      },
      apellido:{
        required: true,
      },
      rut:{
        required: true,
        rutChileno: true,
      },
      nombres:{
        required: true,
      },
      apellidos: {
        required: true,
        
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
});

