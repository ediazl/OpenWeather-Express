import axios from "axios";
import express, { Request, Response } from "express";
import { getDb } from "../DB/config";
import { HOURS_THRESHOLD } from "./constants";
const router = express.Router();
const config = require("../DB/config");

router.get("/clima", async (req: Request, res: Response) => {
  console.log(req.query);
  console.log(config.getName());

  let { lat, lon } = req.query;
  if (!lat || !lon) {
    // res.statusMessage = "Check that is supplied lat and lon";
    // res.status(400).end();
    res.status(400).send({ error: "Check that is supplied lat and lon" });
  } else {
    console.log(lat, lon, process.env.API_KEY);

    let clima = await getDb()
      .collection("AirZone")
      .findOne({ lat: lat, lon: lon });
    console.log(clima);

    try {
      let a = await axios.get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
      );
      console.log(a.data);
      res.status(200).send({ data: a.data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  }
});

router.get("/clima/hour", async (req: Request, res: Response) => {
  console.log(req.query);

  let { lat, lon } = req.query;
  let hour = +req.query.hour;

  if (!lat || !lon || !hour) {
    res.status(400).send({ error: "Check that is supplied lat, lon and hour" });
  } else {
    if (hour < 0 || hour > 23) {
      res.status(400).send({ error: "Check hour values" });
    } else {
      console.log(lat, lon, process.env.API_KEY);
      try {
        let a = await axios.get(
          `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
        );
        console.log(a.data);
        res.status(200).send({ data: a.data });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
      }
    }
  }
});

/**
 * Returns true if date is outdated. +3 hours
 * @param clima
 */
function isOutdated(clima) {
  let diff = (new Date().getTime() - clima.updatedAt.getTime()) / 3600000; // to hours
  return diff > HOURS_THRESHOLD;
}

module.exports = router;
