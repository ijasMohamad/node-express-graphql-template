import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from 'graphql';
import camelCase from 'lodash/camelCase';
import pluralize from 'pluralize';
import { defaultListArgs, defaultArgs, resolver } from 'graphql-sequelize';
import { Aggregate } from '@gql/models/aggregate';
import { getNode } from '@gql/node';
import { getGqlModels } from '@server/utils/autogenHelper';
import { limitAndOffset } from './fields/limitAndOffset';

const { nodeField } = getNode();
const DB_TABLES = getGqlModels({ type: 'Queries', blacklist: ['aggregate'] });
export const addQueries = () => {
  const query = {
    aggregate: Aggregate
  };
  Object.keys(DB_TABLES).forEach(table => {
    query[camelCase(table)] = {
      ...DB_TABLES[table].query,
      resolve: resolver(DB_TABLES[table].model),
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        ...DB_TABLES[table].args,
        ...defaultArgs(DB_TABLES[table].model)
      }
    };
    query[pluralize(camelCase(table))] = {
      ...DB_TABLES[table].list,
      args: {
        ...DB_TABLES[table].list?.args,
        ...defaultListArgs(DB_TABLES[table].model),
        ...limitAndOffset
      }
    };
  });
  return query;
};
export const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  node: nodeField,
  fields: () => ({
    ...addQueries(),
    aggregate: Aggregate
  })
});
