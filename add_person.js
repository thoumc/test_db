const pg = require("pg");
const settings = require("./settings");
var args = process.argv.slice(2);

var knex = require('knex')({
  client: 'pg',
  connection : {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
}
});





knex.insert({first_name: args[0], last_name: args[1], birthdate: args[2]})
.into('famous_people')
.asCallback(function(err, rows){
  if(err)return console.error(err);
  console.log('Inserted');
  return knex.destroy();
});


knex.select('*').from('famous_people')
.asCallback(function(err, rows){
  if(err)return console.error(err);
  console.log(rows);
});




















