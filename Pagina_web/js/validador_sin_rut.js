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
    }, "Por favor ingrese sólo letras");

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
    // Mensajes de validadores
    messages: {
        inputEmail: {
            required: "El correo electrónico es un campo obligatorio",
            emailCompleto: "El correo electrónico no es válido"
        },
        inputPassword: {
            required: "La contraseña es un campo obligatorio."
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
    // Mensajes de validadores
    messages: {
        select_nombre: {
            required: "El nombre es un campo obligatorio",
        },
        select_categoria: {
            required: "La categoría es un campo obligatorio."
        },
        cantidad: {
            required: "La cantidad es un campo obligatorio",
            number: "La cantidad debe ser un número",
            min: "La cantidad debe ser al menos 1"
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
            max: 100,
        },
        descuentoOferta: {
            required: true,
            number: true,
            min: 0,
            max: 100,
        }
    },
    // Cambiar los mensajes de error
    messages: {
        nombre: {
            required: "El nombre es un campo obligatorio",
        },
        descripcion: {
            required: "La descripción es un campo obligatorio."
        },
        precio: {
            required: "El precio es un campo obligatorio",
            number: "El precio debe ser un número",
            min: "El precio no puede ser negativo"
        },
        descuentoSub: {
            required: "El descuento suscriptor es un campo obligatorio",
            number: "El campo debe ser un número",
            min: "El descuento no puede ser negativo",
            max: "El descuento no puede ser mayor a 100"
        },
        descuentoOferta: {
            required: "El descuento oferta es un campo obligatorio",
            number: "El campo debe ser un número",
            min: "El descuento no puede ser negativo",
            max: "El descuento no puede ser mayor a 100"
        },
        floatingSelect: {
            required: "La categoría es un campo obligatorio."
        }
    }
});

});

