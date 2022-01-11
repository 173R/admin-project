const {randomDate, getRandomValue} = require("./server_lib");
const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://artemdb:metra2856030@localhost:5432/data_gav");

async function getMcu(id) {
  try {
    if (id) {
      return await db.any(`SELECT * FROM mcu WHERE id = ${id}`);
    } else {
      return await db.any(`SELECT * FROM mcu`);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}

async function getSensor(id) {
  try {
    if (id) {
      return await db.any(`SELECT * FROM sensor WHERE id = ${id}`);
    } else {
      return await db.any(`SELECT * FROM sensor`);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}

async function getPlace(id) {
  try {
    if(id) {
      return await db.any(`SELECT * FROM place WHERE id = ${id}`);
    } else {
      return await db.any(`SELECT * FROM place`);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}

async function getTableNames() {
  try {
    return await db
      .any("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'")
      .then(result => result.map(item => item.table_name));
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}

async function getTableColumns(name) {
  try {
    return await db
      .any(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${name}'`)
      .then(result => result.map(item => item.column_name));
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}
async function getSMCross(id) {
  try {
    if(id) {
      return await db.any(`SELECT * FROM s_m_cross WHERE id = ${id}`);
    } else {
      return await db.any(`SELECT * FROM s_m_cross`);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}

async function getSMCPCross(id) {
  try {
    if(id) {
      return await db.any(`SELECT * FROM smc_p_cross WHERE id = ${id}`);
    } else {
      return await db.any(`SELECT * FROM smc_p_cross`);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}


async function getSData(smcpcId) {
  try {
    if(smcpcId) {
      return await db.any(`SELECT * FROM sdata WHERE smcpc_id = ${smcpcId} ORDER BY sdata.date_time`);
    } else {
      return await db.any(`SELECT * FROM sdata ORDER BY sdata.date_time`);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}

async function getCustomSensor(mcuId) {
  try {
    const result = await db.any(`SELECT smc_p_cross.id, smc_p_cross.place_id as place, sensor.id as sensor,
                        smc_p_cross.is_enabled, smc_p_cross.time_start, smc_p_cross.time_stop
                        FROM mcu INNER JOIN s_m_cross ON mcu.id = s_m_cross.mcu_id 
                        INNER JOIN sensor ON sensor.id = s_m_cross.sensor_id
                        INNER JOIN smc_p_cross ON s_m_cross.id = smc_p_cross.smc_id
                        WHERE mcu.id = ${mcuId}
    `);
    await Promise.all(result.map(async item => [item.place] = await getPlace(item.place)));
    await Promise.all(result.map(async item => [item.sensor] = await getSensor(item.sensor)));
    await Promise.all(result.map(async item => [item['mcu']] = await getMcu(mcuId)));
    return result;
  } catch (err) {
    console.log("ERROR:", err);
    return [];
  }
}

//mutations

async function deleteData(table) {
  try {
    return await db.none(`TRUNCATE ${table}`).then(
      () => 'Успешно выполнено',
      (err) => `Ошибка ${err}`,
    );
  } catch (err) {
    console.log("ERROR:", err);
    return `Ошибка ${err}`;
  }
}


async function generateSData() {
  const currentDate = new Date();
  const inserts = [];
  await db.any('SELECT id FROM smc_p_cross').then(data => {
    data.forEach(item => {
      for (let i = 0; i < 100000; i++) {
        inserts.push({
          sensor_value: getRandomValue(0, 100),
          date_time: randomDate(currentDate, new Date(currentDate - (24 * 60 * 60 * 1000) * 90)),
          smcpc_id: item.id
        })
      }
    });
  });
  try {
    const query = pgp.helpers.insert(inserts, ['sensor_value', 'date_time', 'smcpc_id'], 'sdata');
    return await db.none(query).then(
      () => 'Данные успешно сгенерированны',
      (err) => `Ошибка ${err}`,
    );
  } catch (err) {
    console.log("ERROR:", err);
    return `Ошибка ${err}`;
  }
}

module.exports = {
  getMcu,
  getSensor,
  getPlace,
  getTableNames,
  getTableColumns,
  getSMCross,
  getSMCPCross,
  getSData,
  deleteData,
  generateSData,
  getCustomSensor
}
