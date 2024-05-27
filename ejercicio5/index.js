// Se crea un objeto proxy para validar y transformar los nombres de usuario
const proxy = {
    validateUsername: (username) => {
      // función que valida si el username solo contiene letras mayúsculas
      return /^[A-Z]+$/.test(username);
    },
  
    // Se define el método set del Proxy para validar y transformar los nombres
    set: function(target, property, value) {
      if (property === 'name') {
        // Si la propiedad a modificar es 'name'
        if (/^[A-Z]+$/.test(value)) {
          // Se verifica si el nuevo valor es solo letras mayúsculas
          target[property] = value.toUpperCase(); // Si es así, se transforma a mayúsculas y se asigna al target
        } else {
          throw new Error('Solo se permiten letras mayúsculas.'); // Si no, se lanza un error
        }
      } else {
        target[property] = value; // Si no es 'name', se asigna el valor sin transformaciones
      }
      return true; // Se retorna true para indicar que la operación fue exitosa
    }
  };
  
  // Se realiza una solicitud fetch al archivo 'user.json' y se convierte la respuesta a formato JSON
  fetch('user.json')
    .then(response => response.json())
    .then(data => {
      // Se crea un proxy para el array de usuarios
      const usuariosProxy = new Proxy(data.users, proxy);
  
      // Se filtran los usuarios con la propiedad 'aprendiz' en true
      const aprendices = usuariosProxy.filter(user => user.aprendiz);
  
      // Se itera sobre los usuarios filtrados
      aprendices.forEach(user => {
        // Se verifican ciertas condiciones para modificar los nombres de usuario
        if (user.name.split(' ').length > 2) {
          if (user.user.includes('ADSO')) {
            user.name = user.name.toUpperCase();
          }
        }
      });
  
      // Se resuelve la promesa con los usuarios modificados
      return aprendices;
    })
    .then(resultado => {
      // Se muestra el resultado en la consola en forma de tabla
      console.log(resultado);
    })
    .catch(error => console.error('Error:', error));