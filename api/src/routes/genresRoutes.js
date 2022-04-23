const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;

const router = Router()

router.get("/", (req,res)=>{
     console.log("Hola")
})


module.exports = router