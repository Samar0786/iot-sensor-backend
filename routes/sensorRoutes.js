const express = require("express");
const Sensor = require("../models/Sensor");

const router = express.Router();

/**
 * POST /api/sensor/ingest
 * Ingest sensor data
 */

router.post("/ingest", async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    // Validation
    if (!deviceId || temperature === undefined) {
      return res.status(400).json({
        message: "deviceId and temperature are required"
      });
    }

    const sensorData = await Sensor.create({
      deviceId,
      temperature,
      timestamp
    });

    res.status(201).json(sensorData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/sensor/:deviceId/latest
 * Get latest sensor reading
 */
router.get("/:deviceId/latest", async (req, res) => {
  try {
    const data = await Sensor.findOne({
      deviceId: req.params.deviceId
    }).sort({ timestamp: -1 });

    if (!data) {
      return res.status(404).json({
        message: "No sensor data found"
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
