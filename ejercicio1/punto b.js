
fetch('user.json')// Usamos una función promesa para leer el archivo JSON
  .then(response => {// Retornamos la promesa de parsear el JSON
    return response.json();
  })
  .then(user => { // Retornamos la promesa de consultar el perfil de Github
    return fetch(`https://api.github.com/users/${user.name}/repos`);
  })
  .then(respuestGithub => { // Retornamos la promesa de obtener los repositorios del perfil de Github
    return respuestGithub.json();
  })
  .then(usuariogithub => {
    usuariogithub.forEach(element => { // Filtramos los repositorios para encontrar el que tiene el nombre "ejercicios_js" mediante el forEach 
      if (element.name === "ejercicios_js") {  //Validamos que el repositorio sea ejercicios_js
        console.log(element); // Imprimimos por consola el repositorio encontrado
      }
    });
  })
  .catch(error => { // Manejamos errores en cualquier etapa de las promesas
    console.error('Error:', error);
  });