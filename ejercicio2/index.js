function leer() {  //Declaramos la funcion leer
  fetch('user.json')  //Declaramos una variable llamada reponse la cual se le asigna el await para que se cumpla la promesa que en este caso seria que mediante el fetch leyera el archivo y retornara true para ejecutar la siguiente promesa.
    .then((response) => {  //Usamos una funcion flecha dentro de una concadenacion de promesas la cual para que se cumpla la promesa que en este caso seria extraer los datos almacenados en el archivo JSON que hemos leido anteriormente. Se le coloca el .json para indicar que es una funcion del fetch hecho anteriormente, (reponse es la variable donde hemos leido el archivo JSON). Si retorna true este await que es una promesa seguira con la siguiente promesa.
      return response.json();
    })
    .then((datos) => {  //Usando la concadenacion de las promesas usamos nuevamente funcion flecha y se ejecuta un console.table
      console.table(datos.users.filter(user => user.aprendiz === true).map(user => ({
        name: user.name,
        avatar: user.avatar
      })));  //Se usa un console.table donde se realiza un filtro el cual consultara el parametro de aprendiz, si es true imprimira el nombre y el avatar del usuario.
    })
    .catch((error) => {  //Usamos un catch para mostrar si ahí algun error en las promesas
      console.error('Error al leer el archivo JSON:', error); //Imprimira el mensaje y el error.
    });
}

leer(); // Llamamos la funcion para que pueda ejecutarse automaticamente
