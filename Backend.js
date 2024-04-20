const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http'); // Import the 'http' module for creating the server
const cors = require('cors');
const app = express();
const router = express.Router();

// Enable CORS for all origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Middleware for parsing JSON bodies
app.use(bodyParser.json());

//Frontend data passing
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST']
};

app.use(cors(corsOptions));







// First do the connection with manual data for monitoring and completely setup the backend with the fronte
//








// Connect to MongoDB using promise-based syntax
mongoose.connect("mongodb+srv://ragulranjeeth2105116:Ragul655@watermappingcluster1.n9pozag.mongodb.net/SensorData?retryWrites=true&w=majority&appName=WaterMappingCluster1")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define schema and model for sensor data
// const sensorDataSchema = new mongoose.Schema({
//   values: {
//     type: Number
//   }
// });

//  const SensorData = mongoose.model('sensordatawaterqualitymanagements', sensorDataSchema);

// Route to handle root endpoint
app.get('/', (req, res) => {
  res.send('You will be successful Ragul');
});

// Route to handle incoming sensor data (POST request)
router.post('/sensor', async (req, res) => {
  try {
    const { values } = req.body;
    
    // Create a new sensor data document
    const newData = new SensorData({ values });

    // Save the new document to the database
    await newData.save();
    await SensorData.collection('sensordatawaterqualitymanagements').insertOne(newData);
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
});

//Backend check
const data = "Ragul Shiva is successful";
app.get('/Home',(req,res)=>{
  res.send("Bakend Successfully connected to the fronten")
})

// Route to get sensor data (GET request)
app.post('/sensor', async(req, res) =>
 {
  SensorData.find((err, sensordatawaterqualitymanagements) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("Sensor data:", sensordatawaterqualitymanagements);
      res.status(201).json(sensordatawaterqualitymanagements);
     // console.log(sensor_readings ${JSON.stringify(sensorReadings)});
    
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





module.exports = router;
