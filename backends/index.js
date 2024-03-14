import express  from 'express' 
import  body_parser from 'body-parser'
import rutaValidacion from './src/routes/autotenticaion.route.js';
import { rutaDeActividad } from './src/routes/Actividad.route.js';
const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))


servidor.set('view engine', 'ejs');
servidor.set('views','./views');


servidor.get('/document',(req,res)=>{
    res.render('document_devdfg.ejs');
})

servidor.use(express.static('./public'));

servidor.use(rutaValidacion)
servidor.use(rutaDeActividad)



servidor.listen(3000, () =>{
    console.log("esta funcionando")
})