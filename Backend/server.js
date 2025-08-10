const express = require("express");
const app = express();
const db = require("./db/db");
db();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const companyRoutes = require("./Routes/companyRoutes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Testing route
app.get("/", (req, res) => {
    res.send("Hello !");
});

// User APIs
app.use("/api/user", userRoutes);

// Company APIs
app.use("/api/company", companyRoutes);

// App listen
const port = 8001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
