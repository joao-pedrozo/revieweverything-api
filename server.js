const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');
const initDB = require('./database');


const app = new Koa();

app.listen(9000);

app.on('error', (err) => {
    console.log(err)
});

app.use(mount('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  })));

initDB();