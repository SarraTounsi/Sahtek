const {Patient,Therapist} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {key} = require('../../keys');

const resolvers = {

    // Query: {
    //     getPatientFiles:async ()=>{
    //         return await PatientFile.find();
    //     },
    //     getPatientFile:async(_, args)=>{
    //         return await PatientFile.findById(args.id);
    //     }
    // },

    Mutation:{
        registerPatient: async (parent, args) => {
            const password = await bcrypt.hash(args.patientInput.password, 10);
            const patient = new Patient({...args.patientInput,password});
            return await patient.save();
          },
          registerTherapist: async (parent, args) => {
            const password = await bcrypt.hash(args.therapistInput.password, 10);
            const therapist = new Therapist({ ...args.therapistInput, password });
            return await therapist.save();
          },
          async login(parent,{email,password,userType}){
            console.log(email,password,userType);
            let userLogged = null;
            if(userType == 'Patient'){
                userLogged  = await Patient.findOne({email})
            }else if(userType == 'Therapist'){
                userLogged = await Therapist.findOne({email});
            }

            if(!userLogged){
                throw new Error('Invalid email or password');
            }
            const matchPassword = bcrypt.compare(password,userLogged.password);
            if(!matchPassword){}

                const token = jwt.sign(
                    {user_id:userLogged._id},
                    key,{
                        expiresIn: 3600*24*30*6,
                        algorithm:'RS256'
                    }
                );
                return {
                    value:token
                }
            },
            sendForgotPasswordEmail: async (
                _,
                { email },
                { redis }
              ) => {
                const user = await User.findOne({ where: { email } });
                if (!user) {
                  return [
                    {
                      path: "email",
                      message: userNotFoundError
                    }
                  ];
                }
          
                return true;
              },
              forgotPasswordChange: async (
                _,
                { newPassword, key },
                { redis }
              ) => {
                const redisKey = `${forgotPasswordPrefix}${key}`;
          
                const userId = await redis.get(redisKey);
                if (!userId) {
                  return [
                    {
                      path: "key",
                      message: expiredKeyError
                    }
                  ];
                }
          
                try {
                  await schema.validate({ newPassword }, { abortEarly: false });
                } catch (err) {
                  return formatYupError(err);
                }
          
                const hashedPassword = await bcrypt.hash(newPassword, 10);
          
                const updatePromise = User.update(
                  { id: userId },
                  {
                    forgotPasswordLocked: false,
                    password: hashedPassword
                  }
                );
          
                const deleteKeyPromise = redis.del(redisKey);
          
                await Promise.all([updatePromise, deleteKeyPromise]);
          
                return null;
              }
      
    },
    Query:{
        // patient: (_,{ID})=> Patient.findById(ID),
        // therapist: (_,{ID})=> Therapist.findById(ID)
    }
}

module.exports = resolvers;
   