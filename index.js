import express  from 'express' 
import  body_parser from 'body-parser'
import rutaValidacion from './src/routes/autotenticaion.route.js'
import rutaProgramacion from './src/routes/programacionRoutesDevdjz.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))


servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.get('/document/programacionDocumentDevdjz', (req, res) => {
    res.render('programacionDocumentDevdjz.ejs');
});


servidor.use(express.static('./public'));

servidor.use(rutaValidacion)
servidor.use(rutaProgramacion)


servidor.listen(3000, () =>{
    console.log("esta funcionando")
})