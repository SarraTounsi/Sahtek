const postResolvers = require("./post/resolver");
const commentResolvers = require("./comment/resolver");
const consultationResolvers = require("./consultation/resolver");
const feedbackResolvers = require("./feedback/resolver");
const patientFileResolvers = require("./patientFile/resolver");
const userResolvers = require('./users/resolver');
const ProductResolvers = require("./shop/product/resolver");
const mailVerification= require("./users/mailVerification")
module.exports= [
    consultationResolvers,
    feedbackResolvers,
    patientFileResolvers,
    postResolvers,
    commentResolvers,
    userResolvers,
    ProductResolvers,
    mailVerification
]
