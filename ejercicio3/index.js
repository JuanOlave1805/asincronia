// Definición de una función para filtrar repositorios por nombre.
const filtrar = x => x.name === "ejercicios_js";

// Función autoejecutable asincrónica para obtener datos de usuarios y sus repositorios.
(async () => {

  // Leer archivo JSON que contiene datos de usuarios.
  let response = await fetch('user.json'); // Se espera a que la solicitud fetch obtenga el archivo JSON.
  let user = await response.json(); // Se espera a que se convierta la respuesta en JSON.

  // Filtrar usuarios que son aprendices.
  const aprendices = user.users.filter(user => user.aprendiz);

  // Iterar sobre cada aprendiz para obtener sus repositorios públicos de GitHub.
  aprendices.forEach(async element => {
    try {
      // Obtener repositorios públicos del usuario de GitHub.
      const response = await fetch(`https://api.github.com/users/${element.user}/repos`);
      
      // Si la solicitud es exitosa...
      if (response.ok) {
        // Convertir la respuesta en formato JSON.
        const userRepos = await response.json();
        
        // Mostrar el nombre del usuario y sus repositorios en una tabla.
        console.log(`Repositorios públicos de ${element.name}:`);
        console.table(userRepos.map(repo => ({ nombreRepositorio: repo.name, autor: element.name })));
      } else {
        // Mostrar un mensaje de error si la solicitud no es exitosa.
        console.error(`Error al obtener repositorios de ${element.user}. Estado de la solicitud: ${response.status}`);
      }
    } catch (error) {
      // Capturar y mostrar cualquier error ocurrido durante la solicitud.
      console.error(`Error al obtener repositorios de ${element.user}:`, error);
    }
  });

})(); // Fin de la función autoejecutable.


