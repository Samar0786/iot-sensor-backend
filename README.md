# IoT Sensor Backend (Node.js)
## Objective
Build a Node.js backend service that ingests IoT sensor temperature readings, stores them in MongoDB, and exposes APIs to retrieve the latest reading for a device.  
The system also supports real-time ingestion via MQTT.
---
## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- MQTT (test.mosquitto.org)
---
## Project Structure
iot-sensor-backend/
│
├── backend.js
├── mqtt.js
├── package.json
├── .env
├── .gitignore
│
├── config/
│   └── db.js
│
├── models/
│   └── Sensor.js
│
├── routes/
│   └── sensorRoutes.js
│
└── README.md
---
## Setup Instructions
### 1. Clone the repository
git clone https://github.com/Samar0786/iot-sensor-backend.git
cd iot-sensor-backend
### 2. Install dependencies
npm install
### 3. Create `.env` file
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/iot
### 4. Run the server
npm run dev
Server runs at:
http://localhost:5000
## API Endpoints
### POST /api/sensor/ingest
{
  "deviceId": "sensor123",
  "temperature": 25.5
}
201 Created
Timestamp is auto-generated if not provided
201 Created
Timestamp is auto-generated if not provided
curl http://localhost:5000/api/sensor/sensor123/latest
## Database
- MongoDB Atlas (M0 Free Tier)
- Data stored using Mongoose schema
- Indexed on deviceId and sorted by timestamp to fetch latest reading efficiently
## MQTT Bonus (Real-time Ingestion)
Broker: test.mosquitto.org
iot/sensor/<deviceId>/temperature
{
  "temperature": 31.2
}
GET /api/sensor/<deviceId>/latest
## Notes
- .env and node_modules are excluded using .gitignore
- APIs tested using Postman
- MQTT tested using MQTT Explorer
