const express = require("express");
const app = express();
const db = require("./db/db")
db();
const cookieParser = require("cookie-parser")
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes")

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
const corsOptions = {
    origin: "http//localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

// Testing routes
app.get("/", (req, res) => {
    res.send("Hello !");
});

// api's

// users apis
// http://localhost:8001/api/user/register
// http://localhost:8001/api/user/login
// http://localhost:8001/api/user/profile/update
// http://localhost:8001/api/logout
app.use("/api/user", userRoutes);


// App listen
const port = 8001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
