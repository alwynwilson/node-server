require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router  = require('./router/router')
require('./db/connection')

const nodeServer = express()

nodeServer.use(cors())
nodeServer.use(express.json())
nodeServer.use(router)

const PORT = 3000 || process.env.PORT

nodeServer.listen(PORT,()=>{
    console.log(`Project fair server started at port :${PORT} `);
})

nodeServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style='color:red;'> Project Fair Server started, and waiting for client request..!!</h1>`)
})