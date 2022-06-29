const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");

require("dotenv").config();
const { API_KEY, API_URL } = process.env;

const router = Router();

function filterArr(arr) {
  let result = [];
  arr.forEach((e) => e.forEach((e) => result.push(e)));
  return result;
}
function filterPlatforms(arr) {
  let result = [];
  let filtro = [];
  arr.forEach((e) =>
    e.forEach((e) => {
      if (!filtro.includes(e.platform.id)) {
        filtro.push(e.platform.id);
        result.push(e.platform);
      }
    })
  );
  return result;
}
function filterResponse(res) {
  return {
    name: res.name,
    description: res.description_raw,
    rating: res.rating,
    released: res.released,
    platforms: res.platforms.map((e) => e.platform.name),
    genres: res.genres.map((e) => e.name),
    background_image: res.background_image,
  };
}

function idGenerator() {
    var c = 0
    return function(name){
        c++
      return `${name}${c}`
    }
  }

let idfunc = idGenerator()

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  let games = await Promise.all([
    axios.get(`${API_URL}?key=${API_KEY}`),
    axios.get(`${API_URL}?key=${API_KEY}&page=2`),
    axios.get(`${API_URL}?key=${API_KEY}&page=3`),
    axios.get(`${API_URL}?key=${API_KEY}&page=4`),
    axios.get(`${API_URL}?key=${API_KEY}&page=5`),
  ])
    .then((r) => r.map((e) => e.data.results))
    .then((r) => filterArr(r)) // [ [], [] ]
    .catch(next);
  let bdGames = await Videogame.findAll({ include: [{ model: Genre }] })
  bdGames = bdGames.map(e => e.dataValues)
  if (name) {
    let found = [...games,...bdGames].filter((e) => {
      return e.name.toLowerCase().includes(name.toLowerCase());
    });
    if (found.length === 0) {
      let message = { msg: "No se encontro ningun juego :(" };
    }
    // (found);
    res.status(200).send(found);
  }
  res.status(200).send([...bdGames,...games]);
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
   (API_KEY);
  try {
    //   const gameDb = await Videogame.findOne(id, {
    //     include: Genre,
    //   });
    const gameDb = await Videogame.findOne({
      where: { id: id },
      include: Genre,
    });
    if (!gameDb) {
      axios
        .get(`${API_URL}/${id}?key=${API_KEY}`)
        .then((response) => {
          const resp = response.data;
          let game = filterResponse(resp);
          res.status(200).send(game);
        })
        .catch(next);
    } else {
      res.status(200).send(gameDb);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/get/platforms", async (req, res, next) => {
   
  try {
    Promise.all([
      axios.get(`${API_URL}?key=${API_KEY}`),
      axios.get(`${API_URL}?key=${API_KEY}&page=2`),
      axios.get(`${API_URL}?key=${API_KEY}&page=3`),
      axios.get(`${API_URL}?key=${API_KEY}&page=4`),
      axios.get(`${API_URL}?key=${API_KEY}&page=5`),
    ])
      .then((r) => r.map((e) => e.data.results))
      .then((r) => filterArr(r))
      .then((r) => r.map((e) => e.parent_platforms))
      .then((r) => filterPlatforms(r))
      .then((r) => res.status(201).send(r));
  } catch (error) {
    next(error);
  }
});

router.get("/get/onlyapi", async (req, res, next) => {
    try {
      Promise.all([
        axios.get(`${API_URL}?key=${API_KEY}`),
        axios.get(`${API_URL}?key=${API_KEY}&page=2`),
        axios.get(`${API_URL}?key=${API_KEY}&page=3`),
        axios.get(`${API_URL}?key=${API_KEY}&page=4`),
        axios.get(`${API_URL}?key=${API_KEY}&page=5`),
      ])
        .then((r) => r.map((e) => e.data.results))
        .then((r) => filterArr(r))
        .then((r) => res.status(201).send(r));
    } catch (error) {
      next(error);
    }
  });

  router.get("/get/created", async (req, res, next) => {
    try {
        let bdGames = await Videogame.findAll({ include: [{ model: Genre }] })
        bdGames = bdGames.map(e => e.dataValues)
        res.status(200).send(bdGames)
    } catch (error) {
      next(error);
    }
  });

router.post("/", async (req, res, next) => {
   
  const {
    name,
    description,
    released,
    rating,
    platforms,
    background_image,
    genres,
  } = req.body;
  try {
    
    let id = idfunc(name) 
     
    let newGame = await Videogame.create({
      id,
      name,
      description,
      released,
      rating,
      platforms,
    });
    genres.map(async (e) => {
      let gameGenre = await Genre.findByPk(e);
      newGame.addGenres(gameGenre);
    });

    res.status(201).send(`El juego "${name}" se creo con exito`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
