const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://artemdb:metra2856030@data_base:5432/data_gav");//192.168.237.128:5432
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


/*app.get('/api', (req, res) => {
  res.send('Вроде работает');
  console.log('Вроде работает');
});

app.get('/api/mcu', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.any(`SELECT * FROM mcu`)
    .then( data => {
      res.send(data);
    })
    .catch(error => {
      res.send(error);
      console.log("ERROR:", error);
    });
});

app.get('/api/tables', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.any("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'")
    .then( data => {
        res.send(data.map(item => item.table_name));
    })
    .catch(error => {
        res.send(error);
        console.log("ERROR:", error);
    });
});

app.get('/api/columns', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.any(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${req.query.table}'`)
    .then( data => {
      res.send(data.map(item => item.column_name));
    })
    .catch(error => {
      res.send(error);
      console.log("ERROR:", error);
    });
});*/

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
      AND NOW() - interval '${req.body.lastHours +' hour'}' <= s1.date_time
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


  /*if (req.query.smcpcId) {
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
  }*/
});

/*app.get('/api/delete', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.none(`TRUNCATE sdata`)
    .then(
      () => res.json('Данные из таблицы smc_p_cross удалены'),
      (err) => res.json(err.message)
    );
});

app.get('/api/generate', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const currentDate = new Date();
  db.any('SELECT id FROM smc_p_cross').then(data => {
    const inserts = [];
    data.forEach(item => {
      for (let i = 0; i < 100000; i++) {
        inserts.push({
          sensor_value: getRandomValue(0, 100),
          date_time: randomDate(currentDate, new Date(currentDate - (24*60*60*1000) * 7)),
          smcpc_id: item.id
        })
      }
    });
    try {
      const query = pgp.helpers.insert(inserts, ['sensor_value', 'date_time', 'smcpc_id'], 'sdata');
      db.none(query).then(
        () => res.json('Данные успешно сгенерированны'),
        (err) => res.json(err.message)
      );
    } catch (err) {
      res.json(err.message);
    }
  });
});*/


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})