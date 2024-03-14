import express  from 'express' 
import  body_parser from 'body-parser'
<<<<<<< HEAD
import rutaUsuario from './src/routes/UsuariosRoutesdevkvd.js'
import rutaValidacion from './src/routes/autotenticaion.route.js'

=======
import rutaValidacion from './src/routes/autotenticaion.route.js'
import router from '../backends/src/routes/Finca.routes.js'
import rutaUsuario from './src/routes/routes.usuarios.js'
>>>>>>> 65c9722001aeb3d32b6068801593234d8b275612
const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))


servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.get('/document',(req,res)=>{
    res.render('document.ejs');
})

servidor.use(express.static('./public'));

servidor.use(rutaValidacion)
servidor.use(rutaUsuario)
servidor.use(router)


servidor.listen(3000, () =>{
    console.log("esta funcionando")
})