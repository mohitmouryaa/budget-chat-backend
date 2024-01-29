// IMPORTS
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })

// SERVER CONSTANTS
const app = express()

// MIDDLEWARES

app.use(
    cors({
        origin: "*",
    }),
)

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(express.json({ limit: "10kb" }))

// ROUTES IMPORTS
const userRouter = require("./routes/user.route")

// ROUTES
app.use("/api/v1/users", userRouter)

app.get("/", (req, res) => {
    res.send("HELLO")
})

// SERVER
app.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT} port...`)
})
