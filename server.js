const express = require("express");
const cors = require("cors"); // Import the Cross-origin resource sharing  middleware

/* Import Routers */
const mineRouter = require("./routes/mine");
const keyRouter = require("./routes/key");

const app = express();
const port = process.env.PORT || 9000; // Server PORT

/* Use the CORS, and Routers middleware */
app.use(cors());
app.use("/mine", mineRouter);
app.use("/key", keyRouter);

/* Start the HTTP server */
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send({
    description:
      "This is REST API Server used for birkagal.github.io/cryptolearn",
    github: "https://github.com/birkagal/cryptolearn-api",
    client_github: "https://github.com/birkagal/cryptolearn",
  });
});

module.exports = app;
