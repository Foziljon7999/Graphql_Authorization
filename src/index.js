const http = require("http");
const express = require("express");
const buildGraphqlServer = require("./graphql");
const mongo = require("./config/mongo");

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

mongo()
  .then(() => console.log("Db  Connected"))
  .catch((err) => {
    console.log(err);
  });

const serverStart = async () => {
  const { server, serverMiddleware } = buildGraphqlServer(httpServer);
  await server.start();
  app.use(serverMiddleware());
};
serverStart();

httpServer.listen(9000, () => {
  console.log(9000);
});
