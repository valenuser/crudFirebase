const express =  require('express')

const app = express()

const morgan = require('morgan')
//middlewares

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set(morgan('dev'))


//routes

app.use('/',require('./routes/main'))


const port = process.env.PORT || 3000

app.listen(port,(req,res)=>{
    console.log(`SERVER RUNNING ON PORT ${port}`);
})