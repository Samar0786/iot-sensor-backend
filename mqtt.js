const mqtt = require("mqtt");
const Sensor = require("./models/Sensor");

// Connect to public MQTT broker
const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  console.log("MQTT connected to test.mosquitto.org");

  // Subscribe to all device temperature topics
  client.subscribe("iot/sensor/+/temperature", (err) => {
    if (err) {
      console.error("MQTT subscription error:", err.message);
    } else {
      console.log("Subscribed to iot/sensor/+/temperature");
    }
  });
});

client.on("message", async (topic, message) => {
  try {
    /*
      Topic format:
      iot/sensor/<deviceId>/temperature
    */
    const parts = topic.split("/");
    const deviceId = parts[2];

    const payload = JSON.parse(message.toString());
    const { temperature, timestamp } = payload;

    if (!deviceId || temperature === undefined) return;

    await Sensor.create({
      deviceId,
      temperature,
      timestamp
    });

    console.log(`MQTT data saved for ${deviceId}:`, temperature);
  } catch (error) {
    console.error("MQTT message handling error:", error.message);
  }
});
