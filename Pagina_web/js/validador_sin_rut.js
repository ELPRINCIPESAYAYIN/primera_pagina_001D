// objeto.metodo(json)

$(document).ready(function() {
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

//falta  id solo numero, la k en mayusculas y ortografia.

  $("#formulario_ingresar").validate({
  rules: {
    inputEmail: {
          required: true,
          emailCompleto: true,
      },
      inputPassword: {
          required: true,
      },
  },
  //mensajes de validadores
  messages: {

    inputEmail: {
        required: "El Correo Electronico es un campo obligatorio",
        emailCompleto: "El Correo Electronico no es valido"
      },
      inputPassword: {
        required: "La Contraseña  es un campo obligatorio."
      },

  }
  });

  $("#bodega_formulario").validate({
    rules: {
        select_nombre: {
            required: true,
        },
        select_categoria: {
            required: true,
        },
        cantidad: {
            required: true,
            number: true,
            min: 1,
        }
    },
    //mensajes de validadores
    messages: {
        select_nombre: {
            required: "El Nombre es un campo obligatorio",
        },
        select_categoria: {
            required: "La Categoria es un campo obligatorio."
        },
        cantidad: {
            required: "La Cantidad es un campo obligatorio",
        },



    }
});

$("#formulario_producto").validate({
  rules: {
      floatingSelect: {
          required: true,
      },
      nombre: {
          required: true,
      },
      descripcion: {
          required: true,
      },
      precio: {
          required: true,
          number: true,
          min: 0,
      },
      descuentoSub: {
          required: true,
          number: true,
          min: 0,
          max:100,
      },
      descuentoOferta: {
          required: true,
          number: true,
          min: 0,
          max:100,
      }
  },
  //cambiar los mensajes de error
  messages: {
      nombre: {
          required: "El Nombre es un campo obligatorio",
      },
      descripcion: {
          required: "La Descripcion es un campo obligatorio."
      },
      precio: {
          required: "El Precio es un campo obligatorio",
      },
      descuentoSub: {
          required: "El Descuento Subcriptor es un campo requerido",
          number: "El cambo debe ser un numero"
      },
      descuentoOferta: {
          required: "El Descuento Oferta es un campo obligatorio",
      },
      floatingSelect: {
          required:"La Categoria es un campo obligatorio."
      }
  }
});

});

