const express = require('express')

const router = express.Router()

const { app } = require('../firebase.js')

const { query, getDocs, getFirestore, collection, addDoc } = require('firebase/firestore')

const db = getFirestore(app)

router.get('/',async (req,res)=>{


    const tableFirebase = collection(db,"usuarios")

    const response = await getDocs(query(tableFirebase)) 


    if(!response.empty){
        const data = []

        response.forEach(el =>{
            data.push(el.data())
        })
        res.status(200).send(data)
    }else{
        res.status(200).send("No hay datos")
    }
})

router.use((req,res,next)=>{
    const keys = Object.keys(req.body)
    
    if(keys.filter(el=> el != "nombre" && el != "descripcion").length != 0){
        res.status(404).send('Los datos enviados no son correctos.')
    }else if(req.body.nombre == undefined ||req.body.nombre == "" || req.body.descripcion == undefined || req.body.descripcion == ""){
        res.status(404).send('Los datos enviados no son correctos.')
    }else{
        next()
    }
})

router.post('/',async (req,res)=>{

    try{
        const { nombre, descripcion } = req.body

        const tabla =  collection(db,'usuarios')
    
        await addDoc(tabla,{
            nombre:nombre,
            descripcion: descripcion
        })
    
        res.status(200).send('Datos enviados.')

    }catch(e){

        res.status(404).send('Problema al enviar los datos.')

    }

})






module.exports = router