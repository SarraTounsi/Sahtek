const {gql} = require('apollo-server-express');

module.exports = gql`
type Comment {
    description: String
    time: String
    post: Post

     
}

input CommentInput {
    description: String
}  
extend type Query {
    getComment(ID: ID!): Comment
    getAllComments: [Comment]
       
}
extend type Mutation {
    createComment(CommentInput: CommentInput, post: ID): Comment
    updateComment(id: ID!, CommentInput: CommentInput): Comment
    deleteComment(id: ID!): String
}    
`

       
