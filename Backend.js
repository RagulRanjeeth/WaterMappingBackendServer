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

const SensorData = mongoose.model('sensordatawaterqualitymanagements', sensorDataSchema);

// Route to handle root endpoint
app.get('/', (req, res) => {
  res.send('Water mapping sensor data!');
});

// Route to handle incoming sensor data
axios.post('https://watermappingbackendserverwork.onrender.com/sensor', {
  userId: 1,
  title: "Fix my bugs",
  completed: false
})
.then((response) => console.log(response.data))
.then((error) => console.log(error));

// Create HTTP server
const PORT = 8080;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
