if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')

app.use(express.json()) //json raw
app.use(express.urlencoded({extended:true})) //body parser
app.use(router)

app.listen(port, () => {
    console.log(`listen on port ${port}`);
})
