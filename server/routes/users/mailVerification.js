const verificationToken = require('../../database/models/verificationToken');
const { Patient, Therapist, User } = require('../../database/models/User');
const { ObjectId } = require('mongoose/lib/schema/index');
const bcrypt = require("bcrypt");

const mailVerification = {


    Mutation: {
        verifyToken: async (parent, args, context, info) => {
            const { userId } = args;
            const { token } = args.verificationTokenInput;
            const savedToken = await verificationToken.findOne({ userId });
            const user = await User.findById(userId);
            if (savedToken) {
                const result = await bcrypt.compareSync(token, savedToken.token);

                if (result) {
                    await verificationToken.findOneAndDelete({ userId })
                    await User.findByIdAndUpdate(userId, { verified: true });
                    console.log("your account is verified");
                    return "success"
                }else{
                    return "invalid code"
                }
            }
            if (!savedToken) {
                if (user) {
                    if (user.verified == false) {
                        return "expired"
                    }

                    if (user.verified == true) {
                        return "success"
                    }
                }
                if (!user) {
                    return "not found"
                }
            } 


        },



    }

}

module.exports = mailVerification;