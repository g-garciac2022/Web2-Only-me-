const posts = new Map();
let nextPostId = 0;

let post0 = addPost({
    title: "Epic Fantasy",
    developer: "DragonForge",
    description: "Un RPG de acción en un mundo de fantasía épica lleno de monstruos, magia y misterios por descubrir.",
    date: "2022-08-15",
    url: "https://th.bing.com/th/id/OIG.wtzPJjM9UZe_Vn9LeKw5?pid=ImgGn&w=1024&h=1024&rs=1",
    contributor: true
});

let post1 = addPost({
    title: "Carabela",
    developer: "SPain SP",
    description: "Únete a una tripulación de piratas y navega los mares en busca de tesoros y batallas navales emocionantes.",
    date: "2017-06-22",
    url: "https://th.bing.com/th/id/OIG.GiHKNN6ttYl1U5FdO4fW?pid=ImgGn",
    contributor: false
});

let post2 = addPost({
    title: "Modern Affairs",
    developer: "Digitiki",
    description: "Un juego de supervivencia en un mundo postapocalíptico, donde debes construir refugios y enfrentar amenazas mutantes",
    date: "2020-11-10",
    url: "https://th.bing.com/th/id/OIG.xyr2VY0xby07VZnmGfbK?pid=ImgGn",
    contributor: true
});

let post3 = addPost({
    title: "DinoPark",
    developer: "Arabaka",
    description: "Gestiona tu propio parque de dinosaurios, cuida de estas criaturas prehistóricas y mantén a los visitantes a salvo.",
    date: "2015-04-07",
    url: "https://th.bing.com/th/id/OIG.NoYptUZPe_ks9U.UC_JD?pid=ImgGn",
    contributor: false
});

let post4 = addPost({
    title: "Fractal",
    developer: "Mekanica, Inc.",
    description: "Un juego de estrategia donde debes manipular dimensiones fractales para ganar batallas en un mundo surreal",
    date: "2021-09-18",
    url: "https://th.bing.com/th/id/OIG.5bV2qi1sz4cSf6kkCf6D?pid=ImgGn",
    contributor: false
});

let post5 = addPost({
    title: "Tales of a Monster Map Maker",
    developer: "DragonForge",
    description: "Forma parte de un equipo de cazadores... ¿Con un mapa en vez de arma? Explora un vasto mundo sobrenatural que debe ser documentado",
    date: "2016-02-05",
    url: "https://th.bing.com/th/id/OIG.JjunRKiVNhzkjzqapp.g?pid=ImgGn",
    contributor: true
});

let post6 = addPost({
    title: "Modern Farm Simulator III",
    developer: "Honest Work Games",
    description: "¡Construye y gestiona tu propia granja moderna! Cultiva, cría animales y expande tu imperio agrícola en este simulador extremadamente realista que no deja de lado la diversión.",
    date: "2019-07-12",
    url: "https://th.bing.com/th/id/OIG.txH64dPDzkWJqe4.lH0u?pid=ImgGn",
    contributor: true
});




addSubPost(post0.id,{ user: "AdventureSeeker89", review: " ¡Epic Fantasy realmente cumple con su nombre! La trama es cautivadora, llena de batallas épicas y aventuras mágicas. Los gráficos son impresionantes, y DragonForge hizo un excelente trabajo con el desarrollo de personajes. ¡No podía dejar de jugar!"});

addSubPost(post0.id,{ user: "VileExplorer22", review: " Epic Fantasy ha elevado el estándar de los juegos de rol. La narrativa es tan inmersiva que te sumerge por completo en un mundo de maravillas. Los gráficos detallados y la banda sonora épica crean una experiencia visual y auditiva impresionante. DragonForge ha logrado no solo contar una historia, sino permitir que los jugadores la vivan. ¡Una obra maestra que seguirá siendo recordada en los anales de los videojuegos!"});




addSubPost(post1.id,{ user: "PirateCaptain99", review: " ¡Carabela es una aventura de piratas fantástica! Las batallas navales son emocionantes, y SPain SP creó un mundo abierto detallado. La única mejora podría ser más misiones variadas, pero en general, es el sueño de cualquier pirata." });


addSubPost(post2.id,{ user: "ApocalypseSurvivor", review: " Modern Affairs ofrece una perspectiva única del género postapocalíptico. La atención al detalle de Digitiki es loable, y los elementos de supervivencia agregan profundidad. Ocasionalmente, los controles se sintieron un poco torpes, pero no obstaculizaron la experiencia general." });

addSubPost(post3.id,{ user: "DinoLover123", review: "¡DinoPark es el paraíso de los amantes de los dinosaurios! Arabaka creó un encantador juego de simulación con dinosaurios adorables. Gestionar el parque es desafiante y divertido. Mi única sugerencia sería agregar más especies de dinosaurios para mayor variedad." });


//Prueba a añadir o comentar todos para ver mas posts o el mensaje de que no hay posts

export function addPost(post) {
    let id = nextPostId++;
    post.id = id.toString();
    post.subPosts = new Map();
    post.nextSubPostId = 0; // Each post has its own nextSubPostId
    posts.set(post.id, post);
    return post;
}


export function addSubPost(postId, subPost) {
    let post = posts.get(postId);

    if (post) {
        if (!post.subPosts) {
            post.subPosts = new Map();
        }

        let id = post.nextSubPostId++;
        subPost.id = id.toString();
        subPost.user = '@' + subPost.user.replace(/\s/g, '').toLowerCase();
        post.subPosts.set(subPost.id, subPost);
        
        return subPost;
    } else {
        console.error(`Post con id ${postId} no encontrado.`);
        return null;
    }
}



export function deletePost(id){
    posts.delete(id);
}

export function getPosts(){
    return [...posts.values()];
}

export function getSubPosts(postId) {
    let post = posts.get(postId);
    if (post) {
        return post && post.subPosts ? [...post.subPosts.values()] : []; /* So, in simple terms, this line is saying: "If post and post.subPosts exist, return an array of the values in post.subPosts. Otherwise, return an empty array."*/
    } else {
        console.error(`Post con id ${postId}no encontrado.`);
        return null;
    }
}

export function getPost(id){
    return posts.get(id);
}


export function updatePost(id, updatedPost) {
   // console.log(`Updating post with id ${id}`);

    if (posts.has(id)) {
        const existingPost = posts.get(id);

        // Almacenamos subPosts existentes
        updatedPost.subPosts = existingPost.subPosts;

        // Update only the specified fields
        Object.assign(existingPost, updatedPost); //Object.assign() copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino. Devuelve el objeto destino.

        return existingPost;


        /* if (posts.has(id)) {: Comprueba si existe un post con el ID especificado en la colección de posts.

const existingPost = posts.get(id);: Si el post existe, lo recupera y lo almacena en la variable existingPost.

updatedPost.subPosts = existingPost.subPosts;: Toma los subPosts del existingPost y los asigna al updatedPost. Esto asegura que los subPosts existentes no se pierdan cuando se actualice el post.

Object.assign(existingPost, updatedPost);: Esto toma todas las propiedades enumerables del updatedPost y las copia al existingPost. Si una propiedad ya existe en existingPost, su valor se sobrescribe con el valor de updatedPost. Esto es lo que actualiza el post.

return existingPost;: Finalmente, devuelve el post actualizado.*/
    } else {
        console.error(`Post with id ${id} not found.`);
        return null;
    }
}