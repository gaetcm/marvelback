require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// requête character
app.get("/characters", cors(), async (req, res) => {
  try {
    const { name = "", skip = "", limit = "" } = req.query;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// requête comics
app.get("/comics", cors(), async (req, res) => {
  try {
    const { title = "", skip = "", limit = "" } = req.query;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

// requête charactere id
app.get("/comics/:id", cors(), async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY}
    `
    );
    console.log("je suis dans la route : /comics/id ", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// requête charactere id
app.get("/characters/:id", cors(), async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.API_KEY}
    `
    );
    console.log("je suis dans la route : /character/id ", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started 😁");
});
