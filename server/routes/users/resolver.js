const {Patient,Therapist} = require('../../database/models/User');
const {ApolloError} = require('apollo-server-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {key,keyPub} = require('../../keys');
const { setCookie } = require('./cookies');
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
            const password = await bcrypt.hash(args.password, 10);
            const patient = new Patient({...args,password});
            return await patient.save();
          },
          registerTherapist: async (parent, args) => {
            const password = await bcrypt.hash(args.therapistInput.password, 10);
            const therapist = new Therapist({ ...args.therapistInput, password });
            return await therapist.save();
          },
          async login(parent,{email,password,userType},{res}){
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
           
            if(userLogged && bcrypt.compareSync(password,userLogged.password)){
                const token = jwt.sign(
                    {},
                    key,{
                        subject:userLogged._id.toString(),
                        algorithm:'RS256',
                        expiresIn:60*60*60*30 *6
                    }
                    );
                    res.cookie('token',token,{httpOnly:true});
           return  "success"
                }
            return "failed";
              

              
            }

           
      
    },
    Query: {   
        async patient(_, {ID}) {
                return await Patient.findById(ID);
        },
        async therapist(_,{ID}){
            return await Therapist.findById(ID);
            
        },
        async getCurrectUser(_,{},{req}){
            const token = req.cookies.token;
    if(token){
        try {
            const decodedToken = jwt.verify(token,keyPub,{algorithms:['RS256']});
            if(decodedToken){
                const user = await Patient.findById(decodedToken.sub).select('-password -__v').exec();
                console.log(user);
                if(user){
                   return user
                }else{
                   return null;
                }
            }else{
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    } else{
        
        return null;
    }
        }
      
      
    },
}

module.exports = resolvers;
   