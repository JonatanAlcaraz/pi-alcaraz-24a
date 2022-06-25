const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const { Genre } = require("../db");
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    axios
      .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((r) => r.data.results)
      .then((data) => {
        data.map(async (e) => {
           (e.name);
          return await Genre.findOrCreate({
            where: {id:e.id, name: e.name },
            defaults: { image_background: e.image_background },
          });
        });
      })
      .then(async (data) => {
        let genres = await Genre.findAll({
          attributes: ["id", "name", "image_background"],
        });
        let result = genres.map((e) => {
          return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            image_background: e.dataValues.image_background,
          };
        });
        
        res.status(201).send(result);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


