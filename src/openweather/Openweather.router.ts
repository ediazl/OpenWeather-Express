import axios from "axios";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/clima", async (req: Request, res: Response) => {
  console.log(req.query);

  let { lat, lon } = req.query;
  console.log(lat, lon, process.env.API_KEY);
  try {
    let a = await axios.get(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
    );
    console.log(a.data);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
