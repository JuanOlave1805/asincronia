const filtrar = x => x.name === "ejercicios_js";  //Declaracion de filtrar el cual sera la variable que almacenara el nombre del repositorio que mas adelante buscaremos
// Se usa una funcion flecha la cual acepta un parametro el cual es (x), luego lo definiremos al momento de hacer el filtro. Luego se coloca (x.name) lo cual significa que se vuelve como un objeto y le asignamos "ejercicios_js" a la propiedad name del parametro (x)

(async () => { //Usamos una funcion asincrona (async await), la cual tambien es anonima. Por ello no tiene ni nombre, ni parametros el async await. Se coloca el async para indicar que es una funcion asincrona y automaticamente retorna una promesa la cual se resuelve con el await.

  // Leer archivo json
let response = await fetch('user.json'); //Declaramos una variable llamada reponse la cual se le asigna el await para que se cumpla la promesa que en este caso seria que mediante el fetch leyera el archivo y retornara true para ejecutar la siguiente promesa.
  let user = await response.json(); //Declaramos una variable llamada user la cual se le asigna el await para que se cumpla la promesa que en este caso seria extraer los datos almacenados en el archivo JSON que hemos leido anteriormente. Se le coloca el .json para indicar que es una funcion del fetch hecho anteriormente, (reponse es la variable donde hemos leido el archivo JSON). Si retorna true este await que es una promesa seguira con la siguiente promesa.

  // consultar usuario github
  let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`);  //Declaramos respuestGithub el cual le asignamos una promesa mediante el await. Esta promesa tendria como fin buscar directamente en la api de github mediante un link dentro de backflips para poder hacer interpoblacion buscar un perfil de github.
  //"${user.name}" esta parte del codigo toma de la variable "user" todas las claves de nombre "name" del json. Si la promesa await retorna true ejecuta la siguiente promesa
  let usuariogithub = await respuestGithub.json();  //Declaramos usuariogithub el cual le asignamos una promesa con el await. Esta promesa lo que hace es buscar todos los repositorios publicos encontrados en dicho perfil ya consultado en la promesa anterior. Se le coloca el .json para indicar que es una funcion del fetch hecho anteriormente. Si retorna true se terminaria el async await ya que todas las promesas fueron completadas. El resultado retornado en consola es todos repositorios publicos del usuario mediante un array
  // console.log(respuestGithub)
  // console.log(usuariogithub)
  usuariogithub.forEach(element => {   //Se usa el forEach para iterar sobre todos los repositorios, usando la funcion flecha toma un parametro el cual es usuariogithub.
  //El forEach funciona como un for solo que es para arreglos; es decir itera todos los datos almacenados en el array usuariogithub
    if (element.name === "ejercicios_js") {   //usando una condicion if buscamos que el repositorio con el nombre (ejercicios_js) con el igualacion estrictamente igual.
      //usuariogithub almacena todos los repositorios publicos
      console.log(element)  //Imprimimos por consola el valor del element el cual seria el repositorio con nombre ("ejercicios_js") junto con toda su informacion de repositorio
    }
  });

// let data = usuariogithub.filter(filtrar)  // usamos la funcion filtro declarada anteriormente y se realiza el filtro buscando el repositorio "ejercicios_js" y al encontrar el primer resultado termina de filtrar
// console.log(data)  // Imprime el resultado obtenido en el filtro anterior
// console.log(usuariogithub) 
})();  // Colocamos al final los parentesis para hacer que sea la funcion autoejecutable