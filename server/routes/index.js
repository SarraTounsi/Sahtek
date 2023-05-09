const postResolvers = require("./post/resolver");
const commentResolvers = require("./comment/resolver");
const consultationResolvers = require("./consultation/resolver");
const feedbackResolvers = require("./feedback/resolver");
const patientFileResolvers = require("./patientFile/resolver");
const userResolvers = require("./users/resolver");
const ProductResolvers = require("./shop/product/resolver");
const mailVerification = require("./users/mailVerification");
const ratingResolvers = require("./rating/resolver");
const communityResolvers = require("./community/resolver");
const chatbotResolver = require("./chatbot/resolver");
const searchResolvers=require("./shop/cart/search")

module.exports = [
  consultationResolvers,
  feedbackResolvers,
  patientFileResolvers,
  postResolvers,
  commentResolvers,
  userResolvers,
  ProductResolvers,
  mailVerification,
  ratingResolvers,
  chatbotResolver,
  communityResolvers,
  searchResolvers
];
