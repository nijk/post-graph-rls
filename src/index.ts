import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient, type Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `
  type Item {
    id: ID!
    name: String
    flavour: String
  }

  input ItemsFilter {
    id: ID
    name: String
    flavour: String
  }

  type Query {
    items(where: ItemsFilter, take: Int): [Item]
    item(id: String!): Item
  }
`;

type ItemsFilter = {
  ids: string[];
  name: string;
  flavour: string;
}

const resolvers = {
  Query: {
    items: async (_parent, args: Prisma.itemsFindManyArgs) => {
      const { where, take = 100, cursor} = args;

      try {
        return await prisma.items.findMany({ take, cursor, where });
      } catch (error) {
        console.error(error);

        return [];
      }
    },
  item: async (_parent, { id }) => await prisma.items.findFirst({ where: { id } }),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
