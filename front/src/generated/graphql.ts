import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CustomSensor = {
  __typename?: 'CustomSensor';
  id: Scalars['Int'];
  is_enabled?: Maybe<Scalars['Boolean']>;
  mcu?: Maybe<Mcu>;
  place?: Maybe<Place>;
  sensor?: Maybe<Sensor>;
  time_start?: Maybe<Scalars['DateTime']>;
  time_stop?: Maybe<Scalars['DateTime']>;
};

export type Mcu = {
  __typename?: 'Mcu';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  mac?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Place = {
  __typename?: 'Place';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type SData = {
  __typename?: 'SData';
  date_time?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  sensor_value?: Maybe<Scalars['Float']>;
  smcpc_id?: Maybe<Scalars['Int']>;
};

export type SmcpCross = {
  __typename?: 'SMCPCross';
  id: Scalars['Int'];
  is_enabled?: Maybe<Scalars['Boolean']>;
  place_id?: Maybe<Scalars['Int']>;
  smc_id?: Maybe<Scalars['Int']>;
  time_start?: Maybe<Scalars['DateTime']>;
  time_stop?: Maybe<Scalars['DateTime']>;
};

export type SmCross = {
  __typename?: 'SMCross';
  id: Scalars['Int'];
  mcu_id?: Maybe<Scalars['Int']>;
  sensor_id?: Maybe<Scalars['Int']>;
};

export type Sensor = {
  __typename?: 'Sensor';
  data_type?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'mutation';
  deleteData?: Maybe<Scalars['String']>;
  generateSData?: Maybe<Scalars['String']>;
};


export type MutationDeleteDataArgs = {
  table: Scalars['String'];
};

export type Query = {
  __typename?: 'query';
  SMCPCross?: Maybe<Array<Maybe<SmcpCross>>>;
  SMCross?: Maybe<Array<Maybe<SmCross>>>;
  customSensor?: Maybe<Array<Maybe<CustomSensor>>>;
  mcu?: Maybe<Array<Maybe<Mcu>>>;
  place?: Maybe<Array<Maybe<Place>>>;
  sData?: Maybe<Array<Maybe<SData>>>;
  sensor?: Maybe<Array<Maybe<Sensor>>>;
  tableColumns?: Maybe<Array<Maybe<Scalars['String']>>>;
  tableNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QuerySmcpCrossArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySmCrossArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryCustomSensorArgs = {
  mcuId: Scalars['Int'];
};


export type QueryMcuArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryPlaceArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySDataArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySensorArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryTableColumnsArgs = {
  name?: InputMaybe<Scalars['String']>;
};

export type TableNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type TableNamesQuery = { __typename?: 'query', tableNames?: Array<string | null | undefined> | null | undefined };

export type SmcpCrossQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type SmcpCrossQuery = { __typename?: 'query', SMCPCross?: Array<{ __typename?: 'SMCPCross', id: number, smc_id?: number | null | undefined, place_id?: number | null | undefined, is_enabled?: boolean | null | undefined, time_start?: any | null | undefined, time_stop?: any | null | undefined } | null | undefined> | null | undefined };

export type SmCrossQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type SmCrossQuery = { __typename?: 'query', SMCross?: Array<{ __typename?: 'SMCross', id: number, sensor_id?: number | null | undefined, mcu_id?: number | null | undefined } | null | undefined> | null | undefined };

export type CustomSensorQueryVariables = Exact<{
  mcuId: Scalars['Int'];
}>;


export type CustomSensorQuery = { __typename?: 'query', customSensor?: Array<{ __typename?: 'CustomSensor', id: number, sensor?: { __typename?: 'Sensor', id: number, name?: string | null | undefined } | null | undefined, place?: { __typename?: 'Place', id?: number | null | undefined, name?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type McuQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type McuQuery = { __typename?: 'query', mcu?: Array<{ __typename?: 'Mcu', id: number, name?: string | null | undefined, mac?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined };

export type DeleteDataMutationVariables = Exact<{
  table: Scalars['String'];
}>;


export type DeleteDataMutation = { __typename?: 'mutation', deleteData?: string | null | undefined };

export type GenerateSDataMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateSDataMutation = { __typename?: 'mutation', generateSData?: string | null | undefined };

export type PlaceQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type PlaceQuery = { __typename?: 'query', place?: Array<{ __typename?: 'Place', id?: number | null | undefined, name?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined };

export type SDataQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type SDataQuery = { __typename?: 'query', sData?: Array<{ __typename?: 'SData', id: number, smcpc_id?: number | null | undefined, sensor_value?: number | null | undefined, date_time?: string | null | undefined } | null | undefined> | null | undefined };

export type SensorQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type SensorQuery = { __typename?: 'query', sensor?: Array<{ __typename?: 'Sensor', id: number, name?: string | null | undefined, data_type?: string | null | undefined, description?: string | null | undefined } | null | undefined> | null | undefined };

export type TableColumnsQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type TableColumnsQuery = { __typename?: 'query', tableColumns?: Array<string | null | undefined> | null | undefined };

export const TableNamesDocument = gql`
    query tableNames {
  tableNames
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TableNamesGQL extends Apollo.Query<TableNamesQuery, TableNamesQueryVariables> {
    document = TableNamesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SmcpCrossDocument = gql`
    query SMCPCross($id: Int) {
  SMCPCross(id: $id) {
    id
    smc_id
    place_id
    is_enabled
    time_start
    time_stop
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SmcpCrossGQL extends Apollo.Query<SmcpCrossQuery, SmcpCrossQueryVariables> {
    document = SmcpCrossDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SmCrossDocument = gql`
    query SMCross($id: Int) {
  SMCross(id: $id) {
    id
    sensor_id
    mcu_id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SmCrossGQL extends Apollo.Query<SmCrossQuery, SmCrossQueryVariables> {
    document = SmCrossDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CustomSensorDocument = gql`
    query customSensor($mcuId: Int!) {
  customSensor(mcuId: $mcuId) {
    id
    sensor {
      id
      name
    }
    place {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomSensorGQL extends Apollo.Query<CustomSensorQuery, CustomSensorQueryVariables> {
    document = CustomSensorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const McuDocument = gql`
    query mcu($id: Int) {
  mcu(id: $id) {
    id
    name
    mac
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class McuGQL extends Apollo.Query<McuQuery, McuQueryVariables> {
    document = McuDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteDataDocument = gql`
    mutation deleteData($table: String!) {
  deleteData(table: $table)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDataGQL extends Apollo.Mutation<DeleteDataMutation, DeleteDataMutationVariables> {
    document = DeleteDataDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GenerateSDataDocument = gql`
    mutation generateSData {
  generateSData
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GenerateSDataGQL extends Apollo.Mutation<GenerateSDataMutation, GenerateSDataMutationVariables> {
    document = GenerateSDataDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PlaceDocument = gql`
    query place($id: Int) {
  place(id: $id) {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PlaceGQL extends Apollo.Query<PlaceQuery, PlaceQueryVariables> {
    document = PlaceDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SDataDocument = gql`
    query sData($id: Int) {
  sData(id: $id) {
    id
    smcpc_id
    sensor_value
    date_time
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SDataGQL extends Apollo.Query<SDataQuery, SDataQueryVariables> {
    document = SDataDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SensorDocument = gql`
    query sensor($id: Int) {
  sensor(id: $id) {
    id
    name
    data_type
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SensorGQL extends Apollo.Query<SensorQuery, SensorQueryVariables> {
    document = SensorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TableColumnsDocument = gql`
    query tableColumns($name: String) {
  tableColumns(name: $name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TableColumnsGQL extends Apollo.Query<TableColumnsQuery, TableColumnsQueryVariables> {
    document = TableColumnsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }