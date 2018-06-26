const pg = require("pg");
const settings = require("./settings");
var args = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err, result) => {

  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(`SELECT * FROM famous_people
    WHERE first_name = $1
    OR last_name = $1`, args, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    function logResult(array ){
      for (var i = 0; i < array.length; i++){
        console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${result.rows[i].birthdate.toISOString().slice(0, 10)}`)
      }
    }

    console.log("Searching...")
    console.log(`Found ${result.rows.length} person(s) by the name ${args}:`);
    logResult(result.rows);


    client.end();
  });
});


