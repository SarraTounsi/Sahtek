import gql from "graphql-tag";


export const REGISTER_MUTATION = gql`
mutation Register($userInput: UserInput) {
  register(userInput: $userInput) {
    email
    password
    role
    patient {
      name
    }
    
  }
}
`;
export const VERIFY_TOKEN_MUTATION = gql`
mutation VerifyToken($verificationTokenInput: VerificationTokenInput, $userId: ID) {
  verifyToken(verificationTokenInput: $verificationTokenInput, userId: $userId)
}
`;

export  const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
      email
      role
      patient{
      name
      }
      therapist{
      name
      }
    }
    token
  }
  }
`;

// const API_USERS = '/api/users';

// export async function createUser(newUser){
//   const response = await fetch(API_USERS,{
//     method:'POST',
//     headers:{
//       'Content-Type':'application/json'
//     },
//     body:JSON.stringify(newUser)
//   });
//   const body = await response.json();
//   if(response.ok){
//     return  body;
//   }else{
//     if(body){
//       throw body;
//     }else{
//       throw new Error('Error api createUser');
//     }
//   }

// }


