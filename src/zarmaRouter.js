import express from 'express';
import * as boardService from './zarmaService.js';

const router = express.Router();

// Servir archivos estáticos desde la carpeta 'public' para que funcione el css
router.use(express.static('public'));



//render iniciales
router.get('/', (req, res) => {

    res.render('index', {
        posts: boardService.getPosts()
        
        
        
    });
});

router.get('/pagina-detalle', (req, res) => {

    res.render('pagina-detalle', {
        posts: boardService.getPosts()
        
    });
});

router.get('/add-elemento', (req, res) => {

    res.render('add-elemento', {
        posts: boardService.getPosts()
       

    });

});



//Get y post de la pagina de añadir elementos

router.get('/post/new', (req, res) => {

    res.render('add-elemento', { post: {} });
});

router.post('/add-elemento', (req, res, next) => {
    let { title, developer, description, date, contributor, url} = req.body;
    
    let newPost = boardService.addPost({ title, developer, description, date, contributor, url });
    res.redirect(`/post/${newPost.id}`);

});



router.post('/post/new', (req, res) => {
    let { title, developer, description, date, contributor, url } = req.body;
    let post = boardService.addPost({ title, developer, description, date, contributor, url });
    res.redirect(`/post/${post.id}`);

});



router.get('/post/:id', (req, res, next) => {  //en verdad, si no existe el post debe llamar a nustra funcion de errores y no enviarlo directamente

    let post = boardService.getPost(req.params.id); //la id se puede ver en el navegador
    if (!post) { //si no existe el post se muestra la pagina de error
        next(new Error('Post no encontrado')); // replace '/error' with your actual error page route
    } else {
        let subPosts = boardService.getSubPosts(req.params.id);
        res.render('pagina-detalle', { post, subPosts }); //carga la pagina detalle del post que recibe por parametro
    }
});

router.post('/post/:id/subpost', (req, res, next) => {
    
    let postId = req.params.id;
    let subPost = req.body;
    let addedSubPost = boardService.addSubPost(postId, subPost);
    if (addedSubPost) {
        
        res.redirect('/post/' + postId);
    } else {
        next(new Error('Post no encontrado'));
    }
});

router.get('/post/delete/:id', (req, res) => { //aun no implementado

    boardService.deletePost(req.params.id);

    res.redirect('/');

});


router.get('/post/edit/:id', (req, res, next) => {
    let post = boardService.getPost(req.params.id); //la id se puede ver en el navegador
    if (!post) { //si no existe el post se muestra la pagina de error
        next(new Error('Post no encontrado')); // replace '/error' with your actual error page route
    } else {
        res.render('add-elemento', { post: post});
        
    }
});


router.post('/post/edit/:id', (req, res) => {
    let { title, developer, description, date, contributor, url } = req.body;


    let post = boardService.updatePost(req.params.id, { title, developer, description, date, contributor, url });

    res.redirect(`/post/${post.id}`);

}
);
// router.get('/error-test', (req, res, next) => {
//     next(new Error('This is a test error'));
// });

router.use((req, res, next) => {
    let err = new Error('Página no encontrada');
    err.status = 404;
    next(err);
});

router.use((err, req, res, next) => {
    console.error(err.stack);  // Log the stack trace of the error
    res.status(err.status || 500).render('error', { title: 'Error', message: err.message });  // Respond with the error status and render an error page with the error message
});


export default router;



