const {gql} = require('apollo-server-express');
module.exports = gql`
type Post {
    id: ID!
    description: String,
    time: String,
    like: User,    
    user: User
    commentsCount: Int!
    likesCount: Int!
    isLiked(  user: ID!): Boolean
    isPostedByCurrentuser(  user: ID!): Boolean
   
}

input PostInput {
        description: String
        user: ID
    }  

extend type Query {
    getPost(id: ID!): Post
    getAllPosts(  user: ID!): [Post]
    findPostByUser(id: ID!): [Post]
  
       
}

extend type Mutation {
    createPost(postInput: PostInput): Post
    updatePost(id: ID!, postInput: PostInput): Post
    deletePost(id: ID!): String
    LikePost(id: ID!, user:ID!): Post
    removeLikePost(id: ID!, user: ID!): Post
}    
`

       
