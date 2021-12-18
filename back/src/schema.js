const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList, GraphQLBoolean, GraphQLScalarType, GraphQLFloat,
} = require('graphql');

const {
  getMcu, getSensor, getPlace, getTableNames, getTableColumns, getSMCross, getSMCPCross, getSData, deleteData,
  generateSData, getCustomSensor
} = require('./resolvers')

const customSensorType = new GraphQLObjectType({
  name: 'CustomSensor',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt)},
    sensor: {type: sensorType},
    place: {type: placeType},
    mcu: {type: mcuType},
    is_enabled: {type: GraphQLBoolean},
    time_start: {type: DateTime},
    time_stop: {type: DateTime}
  })
});

const mcuType = new GraphQLObjectType({
  name: 'Mcu',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt)},
    name: { type: GraphQLString},
    mac: {type: GraphQLString},
    description: {type: GraphQLString}
  })
});

const sensorType = new GraphQLObjectType({
  name: 'Sensor',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt)},
    name: { type: GraphQLString},
    data_type: {type: GraphQLString},
    description: {type: GraphQLString}
  })
});


const placeType = new GraphQLObjectType({
  name: 'Place',
  fields: () => ({
    id: { type: GraphQLInt},
    name: { type: GraphQLString},
    description: {type: GraphQLString}
  })
});

const s_m_crossType = new GraphQLObjectType({
  name: 'SMCross',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt)},
    sensor_id: { type: GraphQLInt},
    mcu_id: {type: GraphQLInt}
  })
});

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toLocaleString();
  },
})

const smc_p_crossType = new GraphQLObjectType({
  name: 'SMCPCross',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt)},
    smc_id: { type: GraphQLInt},
    place_id: {type: GraphQLInt},
    is_enabled: {type: GraphQLBoolean},
    time_start: {type: DateTime},
    time_stop: {type: DateTime}
  })
});

const sData = new GraphQLObjectType({
  name: 'SData',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt)},
    smcpc_id: { type: GraphQLInt},
    sensor_value: { type: GraphQLFloat},
    date_time: {type: GraphQLString},
  })
})

const appQueryRootType = new GraphQLObjectType({
  name: 'query',
  fields: () => ({
    mcu: {
      args: {
        id: { type: GraphQLInt }
      },
      type: new GraphQLList(mcuType),
      resolve: (_, {id}) => getMcu(id),
    },
    sensor: {
      args: {
        id: { type: GraphQLInt },
      },
      type: new GraphQLList(sensorType),
      resolve: (_, {id}) => getSensor(id),
    },
    place: {
      args: {
        id: { type: GraphQLInt },
      },
      type: new GraphQLList(placeType),
      resolve: (_, {id}) => getPlace(id),
    },
    SMCross: {
      args: {
        id: { type: GraphQLInt },
      },
      type: new GraphQLList(s_m_crossType),
      resolve: (_, {id}) => getSMCross(id),
    },
    SMCPCross: {
      args: {
        id: { type: GraphQLInt },
      },
      type: new GraphQLList(smc_p_crossType),
      resolve: (_, {id}) => getSMCPCross(id),
    },
    sData: {
      args: {
        smcpcId: { type: GraphQLInt },
      },
      type: new GraphQLList(sData),
      resolve: (_, {smcpcId}) => getSData(smcpcId),
    },
    tableNames: {
      type: new GraphQLList(GraphQLString),
      resolve: () => getTableNames(),
    },
    tableColumns: {
      args: {
        name: {type: GraphQLString}
      },
      type: new GraphQLList(GraphQLString),
      resolve: (_, {name}) => getTableColumns(name),
    },
    customSensor: {
      args: {
        mcuId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      type: new GraphQLList(customSensorType),
      resolve: (_, {mcuId}) => getCustomSensor(mcuId),
    }
  })
});

const appMutationRootType = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    deleteData: {
      args: {
        table: { type: new GraphQLNonNull(GraphQLString) }
      },
      type: GraphQLString,
      resolve: (_, {table}) => deleteData(table),
    },
    generateSData: {
      type: GraphQLString,
      resolve: () => generateSData(),
    },
  })
})

const schema = new GraphQLSchema({
  query: appQueryRootType,
  mutation: appMutationRootType,
});


module.exports = schema;