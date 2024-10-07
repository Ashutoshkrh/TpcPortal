const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const alumniRoute = require('./routes/alumniRoute');
const companyRoute = require('./routes/companyRoute');
// const { login, signup } = require('./controllers/userController');
// const { protect } = require("./middlewares/authMiddleware");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const MONGO_URI = process.env.MONGO_URI;

// const cors = require('cors');
// app.use(
//     cors({
//         origin: "*",
//         credentials: true,
//     })
// );

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
connectDb();

app.get('/', (req, res) => {
    res.json({ name: 'Api is running' });
});

app.use('/user', userRoute);
app.use('/alumni', alumniRoute);
app.use('/company', companyRoute);

app.get('/api',(req,resp)=>{
    resp.send('kya ji api thik hai na');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});