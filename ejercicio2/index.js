// Definimos una función llamada 'filtro' que toma un objeto 'x' y retorna true si 'x.aprendiz' es verdadero.
const filtro = x => x.aprendiz;

// Inicia una solicitud HTTP GET para obtener el archivo 'user.json'.
fetch('user.json')
  .then((response) => {
    // Cuando la solicitud se completa, convierte la respuesta en un objeto JSON.
    return response.json();
  })
  .then((datos) => {
    // Filtra los usuarios obtenidos del archivo JSON, dejando solo aquellos que son aprendices.
    let aprendices = datos.users.filter(filtro);
    
    // Crea un array de promesas, donde cada promesa obtiene datos adicionales del usuario desde la API de GitHub.
    let promesas = aprendices.map((aprendiz) => {
      return fetch(`https://api.github.com/users/${aprendiz.user}`)
        .then((respuestaGit) => respuestaGit.json())  // Convierte la respuesta de GitHub en un objeto JSON.
        .then((usuarioGit) => ({
          // Retorna un objeto con el nombre del aprendiz y la URL de su avatar de GitHub.
          name: aprendiz.name,  // Aquí usamos el nombre del aprendiz del archivo original 'user.json'.
          avatar: usuarioGit.avatar_url  // URL del avatar obtenida desde la respuesta de GitHub.
        }));
    });
    
    // Retorna una promesa que se resuelve cuando todas las promesas en el array 'promesas' se hayan resuelto.
    return Promise.all(promesas);
  })
  .then((aprendicesCompletos) => {
    // Cuando todas las promesas se hayan resuelto, muestra los datos completos en la consola en forma de tabla.
    console.table(aprendicesCompletos);
  })
  .catch((error) => {
    // Si ocurre algún error en cualquier parte de la cadena de promesas, se captura aquí y se muestra en la consola.
    console.error('Error:', error);
  }); 