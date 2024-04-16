const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
  //timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensordataWaterqualitymanagement', sensorDataSchema);


//SensorData.insertMany([sensorDataSchema1])
app.get('/sensor', (req, res) => {
  res.send('Welcome ');
});

// Endpoint to handle incoming sensor data
app.post('/sensor_data', (req, res) => {
  const sensorData = req.body;
  res.send('Received sensor data:', sensorData);

  // Save the sensor data to MongoDB
  const newData = new SensorData({ value: sensorData.value });
  newData.save()
    .then(() => {
      console.log('Sensor data saved to MongoDB');
      res.status(201).send('Sensor data saved successfully');
    })
    .catch((err) => {
      console.error('Error saving sensor data to MongoDB:', err);
      res.status(500).send('Internal server error');
    });
});

// Server starting
const PORT = 8080;
app.listen(PORT, () => {



  console.log(`Server is running on port ${PORT}`);
});


// const express = require("express");
// const app = express(); // Create an instance of Express

// const PORT = 8080;

// app.get('/sensor', (req, res) => {
//   res.status(200).send({
//     sensor: "water"
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
