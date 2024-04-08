var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")
var { ruruHTML } = require("ruru/server")
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  





type Query{
	users: [User!]!
}

type Mutation {
  updateProfileBio(updateProfileBioInput: UpdateProfileBioInput): UpdateProfileBioResponse
}

input UpdateProfileBioInput {
  userID: ID!
  newProfileBio: String!
}
type UpdateProfileBioResponse {
  success: Boolean!
  message: String!
  user: User
}


mutation UpdateProfileBio($updateProfileBioInputVariable: UpdateProfileBioInput!) {
  updateProfileBio(updateProfileBioInput: $updateProfileBioInputVariable) {
    success
    message
    user{
      name
    }
  }
}


type User {
	id: ID!
	profile_pic: ...
	profile_wall: ...
	profile_Bio: String
	posts: [Post]
	experience: [Experience]
	bookmarks: [Bookmark]
}
query GetProfileBio{
	users{
		profile_Bio
	}
}
query GetProfilePic{
	users{
		profile_pic
	}
}


type Bookmark {
	id: ID!
	user: User!
	post: Post!
}

type Experience {
	user:User!
	experience: String!
}

type Post {
	id: ID!
	user: User!
	bookmark: Bookmark
	post_content: String!
	post_image: ...!
}
query GetBookmarkedPosts{}




`)
 
// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!"
  },
}
 
var app = express()
 
// Create and use the GraphQL handler.
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
 
// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")









