var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(/* GraphQL */`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)
 
// The root provides a resolver function for each API endpoint
var root = {
  rollDice({ numDice, numSides }) {
    var output = []
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)))
    }
    return output
  },
}
 
var app = express()
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)
// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000)
console.log("Running a GraphQL API server at localhost:4000/graphql")
