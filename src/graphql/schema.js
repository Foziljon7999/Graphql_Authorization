const { makeExecutableSchema } = require("@graphql-tools/schema");
const users = require("../modules/users");
const hobbies = require("../modules/hobbies")

const schema = makeExecutableSchema({
  typeDefs: [users.typeDefs, hobbies.typeDefs],
  resolvers: [users.resolvers, hobbies.resolvers],
});

module.exports = schema;
