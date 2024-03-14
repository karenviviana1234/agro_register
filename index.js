import express  from 'express' 
import  body_parser from 'body-parser'
import rutaValidacion from './src/routes/autotenticaion.route.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended: false}))


servidor.use(rutaValidacion)

servidor.listen(3000, () =>{
    console.log("esta funcionando")
})