fetch('user.json') // Usamos una función promesa para leer el archivo JSON
  .then(response => { // Retornamos la promesa de parsear el JSON
    // Cuando la solicitud se completa, el primer 'then' recibe la respuesta y devuelve una promesa para parsear la respuesta como JSON
    return response.json();
  })
  // Cuando el JSON es parseado con éxito, el siguiente 'then' recibe el objeto 'user'
  // Realiza una nueva solicitud para obtener los repositorios del usuario de GitHub utilizando el nombre del usuario del objeto 'user'
  .then(user => { // Retornamos la promesa de consultar el perfil de Github concatenándola con una nueva promesa llamada user
    return fetch(`https://api.github.com/users/${user.name}/repos`); // Retornamos una función promesa que se cumple si se cumple, y se avanza a la siguiente promesa 'then'
  })
  // Cuando la solicitud a la API de GitHub se completa, el siguiente 'then' recibe la respuesta y devuelve una promesa para parsearla como JSON
  .then(respuestGithub => { // Retornamos la promesa de obtener los repositorios del perfil de Github
    return respuestGithub.json();
  })
  // Cuando los datos de los repositorios son parseados con éxito, el siguiente 'then' recibe el arreglo de repositorios 'usuariogithub'
  .then(usuariogithub => {
    // Itera sobre cada repositorio en el arreglo
    usuariogithub.forEach(element => { // Filtramos los repositorios para encontrar el que tiene el nombre "ejercicios_js" mediante el forEach
      if (element.name === "ejercicios_js") { // Validamos que el repositorio sea ejercicios_js
        console.log(element); // Imprimimos por consola el repositorio encontrado
      }
    });
  })
  .catch(error => { // Manejamos errores en cualquier etapa de las promesas
    console.error('Error:', error); // Imprime el error en la consola
  });