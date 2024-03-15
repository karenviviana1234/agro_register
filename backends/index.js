import express  from 'express' 
import  body_parser from 'body-parser'
import rutaValidacion from './src/routes/autotenticaion.route.js'
import inversiones from './src/routes/InversionesroutesdevJrl.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))


servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.get('/document',(req,res)=>{
    res.render('documentdevjrl.ejs');
})

servidor.use(express.static('./public'));

servidor.use(rutaValidacion)
servidor.use(inversiones)


servidor.listen(3000, () =>{
    console.log("esta funcionando")
})