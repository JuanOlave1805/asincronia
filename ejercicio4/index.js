async function leer() {  //Declaramos una funcion asincrona con el nombre leer
    try {//Metemos todo el codigo en un try catch por si llega a haber algun error en el try ejecutara directamente el catch
        const response = await fetch('user.json'); // Realizamos una solicitud para leer el archivo 'user.json'
        const data = await response.json(); // Parseamos la respuesta como JSON

        // Filtramos los usuarios cuyo atributo 'aprendiz' es true
        const aprendices = data.users.filter(user => user.aprendiz === true);

        // Array para almacenar los repositorios de todos los aprendices
        const repositorios = [];

        // Recorremos cada aprendiz
        for (const user of aprendices) {
            const userResponse = await fetch(`https://api.github.com/users/${user.name}/repos`);  //Con fetch y el await se deben cumplir dos promesas, la del fecht al dar ok a la lectura del link y la del await generando un ok de respuesta para seguir con la siguiente promesa o siguiente await
            const userRepos = await userResponse.json(); //Parseamos el resultado de la lectura del link con una promesa await, la cual debe retornar ok para seguir con la siguiente promesa

            // Filtramos los repositorios que tengan menos de 5 repositorios públicos y contengan la palabra 'JavaScript' en su nombre
            const filteredRepos = userRepos.filter(repo => repo.name.length > 5 && repo.name.toLowerCase().includes('javascript'));

            // Mostramos los repositorios públicos que cumplen con las condiciones
            console.log(`Repositorios públicos de ${user.name}:`);
            console.table(filteredRepos.map(repo => ({
                name: repo.name, // Nombre del repositorio
                description: repo.description, // Descripción del repositorio
                url: repo.html_url // URL del repositorio en GitHub 
            })));

            // Unimos los repositorios filtrados al array principal
            repositorios.push(...filteredRepos);
        }

        // Ordenamos los repositorios por nombre de repositorio de menor a mayor
        repositorios.sort((a, b) => a.name.localeCompare(b.name));  

        // Mostramos los repositorios filtrados por nombre de repositorio de menor a mayor en una tabla por consola
        console.log('Repositorios públicos con menos de 5 repositorios y que contienen la palabra "JavaScript" en su nombre:');
        console.table(repositorios.map(repo => ({
            name: repo.name, // Nombre del repositorio
            description: repo.description, // Descripción del repositorio
            url: repo.html_url // URL del repositorio en GitHub
        })));

    } catch (error) {
        // Capturamos cualquier error y lo mostramos en la consola
        console.error('Error al leer el archivo JSON o al obtener repositorios:', error);
    }
}

leer(); // Llamamos a la función para que se ejecute

