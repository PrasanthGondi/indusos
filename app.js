const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
//const cors = require("cors");
//const bodyParser = require("body-parser");
const app = express();
const dbpath = path.join(__dirname, "app.db");
app.use(express.json());
//app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(process.env.PORT || 3005, () => {
      console.log("Server running at http://localhost:3005/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.post("/post", async (request, response) => {
  console.log(request.body);
  const { inputValue } = request.body;
  const query1 = `INSERT INTO emojiTable(value) values ('${inputValue}')`;
  const dbQuery1 = await db.run(query1);
  response.send(dbQuery1);
});

app.get("/list", async (request, response) => {
  const query2 = `SELECT value FROM emojiTable`;
  const dbquery2 = await db.all(query2);
  response.send(dbquery2);
  console.log(dbquery2);
});

app.delete("/", async (request, response) => {
  const query1 = "DELETE FROM emojiTable";
  const dbQuery1 = await db.run(query1);
});

module.exports = app;
