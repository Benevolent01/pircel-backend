require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get("/houses", async (req, res) => {
  try {
    const name = req.query.name;
    let resp = await axios.get("https://wizard-world-api.herokuapp.com/houses");
    let houses = resp.data;
    if (name) {
      houses = houses.data.filter((house) =>
        house.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    res.json(houses);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server listening now on port ${PORT}`));
