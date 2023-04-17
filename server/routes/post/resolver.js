const Post = require("../../database/models/Post");
const Community = require("../../database/models/Community");
const { User } = require("../../database/models/User");
const { MongoClient, ObjectId } = require('mongodb');

const resolvers = {
  Query: {
    async getPost(_, { id }) {
      return await Post.findById(id);
    },

    async getAllPosts() {
      return await Post.find().sort({ $natural: -1 })
    },
    async findPostByUser(_, { id }) {
      return await Post.find({ user: id });
    },


    async community(_, { id }) {
      return await Community.findById(id);
  },

  async getAllCommunities() {
      return await Community.find().sort({ $natural: -1 })
  },

     



  },

  Mutation: {
    async createPost(_, { postInput: { description, user, title, community } }) {
      const createdPost = new Post({
        description: description,
        user: user,
        time: new Date().toDateString(),
        like: [],
        likesCount: 0,
        commentsCount: 0,
        title:title, 
        community: community,
      });
      const res = await createdPost.save();

      return res;
    },

    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Post deleted";
    },

    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { description } = args.postInput;
      const post = await Post.findByIdAndUpdate(
        id,
        { description },
        { new: true }
      );
      return post;
    },

    LikePost: async (parent, args, context, info) => {
      const { id } = args;
      const { user } = args;
      const post = await Post.findById(id);
      if (post) {
        const u = await post.like.includes(user)
        if (!u) {
          const likes = post.like || [];
          const num = likes.length;

          return await Post.findByIdAndUpdate(id, { $push: { like: user }, likesCount: num + 1 }, { new: true })

        }
      }
      if (!post) {
        throw new Error("post not found");

      }
    },


    removeLikePost: async (parent, args, context, info) => {
      const { id } = args;
      const { user } = args;
      const post = await Post.findById(id);
      if (post) {
        const u = await post.like.includes(user)
        if (u) {
          const likes = post.like || [];
          const num = likes.length;

          return await Post.findByIdAndUpdate(id, { $pull: { like: user }, likesCount: num - 1 }, { new: true })

        }
      }
      if (!post) {
        throw new Error("post not found");

      }

    },













    
    async createCommunity(_, { name, description }) {
      const createdCommunity = new Community({
          name: name,
          description: description,
          createdAt: new Date().toDateString(),
          members: [],


      });
      const res = await createdCommunity.save();

      return res;
  },

  deleteCommunity: async (parent, args, context, info) => {
      const { id } = args;
      await Community.findByIdAndDelete(id)
          return "Community deleted";
  },

  updateCommunity: async (parent, args, context, info) => {
      const { id } = args;
      const { description } = args
      
      const community = await Community.findByIdAndUpdate(
          id,
          { description },
          { new: true }
      );
      return community;
  },

  joinCommunity: async (parent, args, context, info) => {
      const { id } = args;
      const { userId } = args;
      const community = await Community.findById(id);
      if (community) {
          if (!community.members.includes(userId)) {
              community.members.push(userId);
              return await community.save();

          } else
              throw new Error('You are already a member of this community');

      }
      if (!community) {
          throw new Error("Community not found");

      }
  },












  },
  Post: {

    user: async (parent, args) => {
      return await User.findById(parent.user);
    },

    isLiked: async (post, { user }) => {
     
      // Check if the current user's ID is in the list of users who have liked the post
      return await post.like.includes(user);
      
    },
    
    isPostedByCurrentuser: async (post, { user }) => {

      return post.user.toString() === user;

       
      
    },



  },
};

module.exports = resolvers;
