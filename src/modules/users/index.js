const fs = require("fs");

let resolvers = require("./resolvers");
let typeDefs = fs.readFileSync(__dirname + "/typeDefs.gql", "utf-8");

module.exports = {
  resolvers,
  typeDefs,
};
