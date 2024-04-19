const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http'); // Import the 'http' module for creating the server

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB using promise-based syntax
mongoose.connect("mongodb+srv://ragulranjeeth2105116:Ragul655@watermappingcluster1.n9pozag.mongodb.net/SensorData?retryWrites=true&w=majority&appName=WaterMappingCluster1")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define schema and model for sensor data
const sensorDataSchema = new mongoose.Schema({
  values: {
    type: Number,
    required: true
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

// Route to handle root endpoint
app.get('/', (req, res) => {
  res.send('Water mapping sensor data!');
});

// Route to handle incoming sensor data
app.post('/sensor', async (req, res) => {
  try {
    // Assuming incoming sensor data is in the request body
    const { values } = req.body;

    // Create a new sensor data document
    const newSensorData = new SensorData({ values });
    // Save the new document to the database
    await newSensorData.save();

    res.status(201).json({ message: 'Sensor data received and stored successfully' });
  } catch (error) {
    console.error("Error storing sensor data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create HTTP server
const PORT = 8081;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
