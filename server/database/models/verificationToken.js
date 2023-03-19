const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verificationToken = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
 		ref: "User",
		unique: true,
	},
	token: { 
        type: String,
         required: true 
        },
	createdAt: { 
        type: Date,        
        expires: 1 ,
		default: Date.now()},
});

module.exports = mongoose.model("token", verificationToken);