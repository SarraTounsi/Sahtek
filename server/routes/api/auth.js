const UserModel = require('../../database/models/user.model');
const bcrypt = require('bcrypt');
const router =require('express').Router();
const jsonwebtoken = require('jsonwebtoken');
const {key, keyPub} = require('../../keys');

// router.post('/',async (req,res)=>{
//     const {email,password} = req.body;
//     try {
//         const user = await UserModel.findOne({email}).exec();
        
//         if(user){
//             if(bcrypt.compareSync(password,user.password)){
//                 const token = jsonwebtoken.sign({},key,{
//                     subject : user._id.toString(),
//                     expiresIn: 3600*24*30*6,
//                     algorithm:'RS256'
//                 });
//                 res.cookie('token',token,{httpOnly:true});
//                 res.json(user);
//             }else{
//         res.status(400).json('Mauvais email/password 1');

//             }
//         }else{
//         res.status(400).json('Mauvais email/password 2');

//         }
//     } catch (error) {
//         res.status(400).json('Mauvais email/password 3');
//     }
// })

// router.get('/current',async (req,res)=>{}
// );

// router.delete('/',(req,res)=>{
//     res.clearCookie('token');
//     res.end();
// })
module.exports = router;