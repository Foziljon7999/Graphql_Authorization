const { WebSocketServer } = require("ws");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { useServer } = require("graphql-ws/lib/use/ws");
const schema = require("./schema");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { verify } = require("../utils/jwt");

const buildGraphqlServer = (httpServer) => {
  let wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  let serverCleanup = useServer({ schema }, wsServer);

  let server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const serverMiddleware = () =>
    expressMiddleware(server, {
      context: ({ req }) => {
        let token = req.headers.authorization || "";
        let user;
        try {
           user = verify(token);
        } catch (err) {
          user = null;
        }

        return { user };
      },
    });

  return { server, serverMiddleware };
};

module.exports = buildGraphqlServer;












