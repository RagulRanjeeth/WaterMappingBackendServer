const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http'); // Import the 'http' module for creating the server

const app = express();
const router = express.Router();

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
    type: Number
  }
});

const SensorData = mongoose.model('sensordatawaterqualitymanagements', sensorDataSchema);

// Route to handle root endpoint
app.get('/', (req, res) => {
  res.send('You will be successful Ragul Shiva');
});

// Route to handle incoming sensor data (POST request)
app.post('/sensor', async (req, res) => {
  try {
    const { values } = req.body;

    // Create a new sensor data document
    const newData = new SensorData({ values });

    // Save the new document to the database
    await newData.save();

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get sensor data (GET request)
router.get('/sensor', (req, res) => {
  SensorData.find((err, sensordatawaterqualitymanagements) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("Sensor data:", sensordatawaterqualitymanagements);
      res.json(sensordatawaterqualitymanagements);
    }
  });
});

// Mount the router on /api path
app.use('/sensor', router);

// Create HTTP server
const PORT = 8081;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
