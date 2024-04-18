const express= require('express')
const app = express()
const {postgraphile} = require('postgraphile')
//import pkg from 'postgraphile';
//const {postgraphile} = pkg;


app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://postgres:abcd@localhost/mydb",
    ["app","public"],
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    },
  ),
);

app.listen(process.env.PORT || 4000);
