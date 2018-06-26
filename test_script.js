const pg = require("pg");
const settings = require("./settings"); // settings.json

// new? because?
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//client pool connection allow more than one connection happenning
// at the same time. pool query process up to 10 queries, instead of
// processing 1 at the time.

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].number); //output: 1
    client.end();
  });
});