const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();
const {
    API_KEY
} = process.env;

const router = Router()

router.get("/", (req,res)=>{
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    .then(r => console.log(r))
})


module.exports = router