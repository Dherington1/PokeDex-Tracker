const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/UserRoutes');
const pokedexRoutes = require('./routes/PokedexRoutes')

const uri = "mongodb+srv://User-db:Samison12@cluster0.qtthm.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const app = express();
dotenv.config({ path: '.env' });
const cookieParser = require('cookie-parser');

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World from overview /'));

// routes.
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pokedex', pokedexRoutes);



async function connectToMongo() {
    try {
        await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB using Mongoose!");

        app.listen(PORT, () => {
            console.log(`Pokedex app listening at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('DB connection failed:', err.message);
    }
}

connectToMongo().catch(console.dir);
