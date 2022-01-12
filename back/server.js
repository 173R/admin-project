const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://artemdb:metra2856030@data_base:5432/data_gav");//192.168.237.128//data_base
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/schema')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())

app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));


app.get('/api/data', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.query.smcpcId) {
    db.any(`
        SELECT * FROM ${req.query.table}
        WHERE smcpc_id = ${Number(req.query.smcpcId)}
        AND NOW() - interval '${req.query.lastHours +' hour'}' <= ${req.query.table}.date_time
        ORDER BY ${req.query.table}.date_time
    `)
      .then(
        data => res.send(data),
        err => {
          res.send(err);
          console.log("ERROR:", err);
        }
      )
  } else {
    db.any(`SELECT * FROM ${req.query.table} ORDER BY ${req.query.table}.date_time`)
      .then(
        data => res.send(data),
        err => {
          res.send(err);
          console.log("ERROR:", err);
        }
      )
  }
});

app.post('/api/data/sensors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body);
  if (req.body.id.length === 2 && req.body.lastHours) {
    db.any(`
      SELECT s1.id, s1.date_time, s1.sensor_value as value1, s2.sensor_value as value2
      FROM sdata s1
      INNER JOIN sdata s2 ON date_trunc('second', s1.date_time) = date_trunc('second', s2.date_time)
      WHERE s1.smcpc_id = ${req.body.id[0]} 
      AND s2.smcpc_id = ${req.body.id[1]}
      AND NOW() - interval '${req.body.lastHours +' hour'}' <= s1.date_time
      ORDER BY s1.date_time
    `).then(
      data => res.send(JSON.stringify(data)),
      err => {
        res.send(err);
        console.log("ERROR:", err);
      }
    )
  } else if (req.body.id.length === 3 && req.body.lastHours) {
    db.any(`
      SELECT s1.id, s1.date_time, s1.sensor_value as value1, s2.sensor_value as value2, s3.sensor_value as value3
      FROM sdata s1
      INNER JOIN sdata s2 ON date_trunc('second', s1.date_time) = date_trunc('second', s2.date_time)
      INNER JOIN sdata s3 ON date_trunc('second', s1.date_time) = date_trunc('second', s3.date_time)
      WHERE s1.smcpc_id = ${req.body.id[0]}
      AND s2.smcpc_id = ${req.body.id[1]} 
      AND s3.smcpc_id = ${req.body.id[2]}
      AND NOW() - interval '${req.body.lastHours +' hour'}' <= s1.date_time
      ORDER BY s1.date_time
    `).then(
      data => res.send(JSON.stringify(data)),
      err => {
        res.send(err);
        console.log("ERROR:", err);
      }
    )
  } else if (req.body.id.length === 4 && req.body.lastHours) {
    let test = new Date();
    db.any(`
      SELECT s1.id, s1.date_time, s1.sensor_value as value1, s2.sensor_value as value2, s3.sensor_value as value3, s4.sensor_value as value4
      FROM sdata s1
      INNER JOIN sdata s2 ON date_trunc('second', s1.date_time) = date_trunc('second', s2.date_time)
      INNER JOIN sdata s3 ON date_trunc('second', s1.date_time) = date_trunc('second', s3.date_time)
      INNER JOIN sdata s4 ON date_trunc('second', s1.date_time) = date_trunc('second', s4.date_time)
      WHERE s1.smcpc_id = ${req.body.id[0]}
      AND s2.smcpc_id = ${req.body.id[1]}
      AND s3.smcpc_id = ${req.body.id[2]}
      AND s4.smcpc_id = ${req.body.id[3]}
      AND ${test.toISOString()} - interval '${req.body.lastHours +' hour'}' <= s1.date_time
      ORDER BY s1.date_time
    `).then(
      data => res.send(JSON.stringify(data)),
      err => {
        res.send(err);
        console.log("ERROR:", err);
      }
    )
  } else {
    console.log("ERROR:", "Ошибка в теле запроса");
  }
});



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})