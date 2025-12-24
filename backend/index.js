const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const expressAsyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const alumniRoute = require('./routes/alumniRoute');
const companyRoute = require('./routes/companyRoute');
const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoute')
// const { login, signup } = require('./controllers/userController');
// const { protect } = require("./middlewares/authMiddleware");

//why this
const chatSocket = require("./socket/chatSocket");

const app = express();
const server = http.createServer(app);
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
app.use('/chat', chatRoute);
app.use('/messages', messageRoute);
app.get('/api',(req,resp)=>{
    resp.send('kya ji api thik hai na');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/* ---------- Socket.IO ---------- */
const io = new Server(server, {
  serveClient: false,
  cors: {
      origin: "*",
    },
});
chatSocket(io); // attach all chat socket events

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  
  socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
});

/* ---------- Server ---------- */
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });