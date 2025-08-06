const express = require("express");
const app = express();
const db = require("./db/db")
db();
const cookieParser = require("cookie-parser")
const cors = require("cors");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
const corsOptions = {
    origin: "http//localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

// routes
app.get("/", (req, res) => {
    res.send("Hello !");
});

// App listen
const port = 8001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
