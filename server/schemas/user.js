const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Role {
    Patient
    Therapist
  }

  type User {
    id: ID!
    verified: Boolean
    name: String!
    email: String!
    password: String!
    role: Role!
    gender: Gender
    dateOfBirth: String!
    profileImage: String
    patient: Patient
    therapist: Therapist
  }

  type Patient {
    id: ID!
    name: String
    email: String!
    password: String!
    dateOfBirth: String
    address: Address
    phoneNumber: String
    profileImage: String
    emergencyContact: EmergencyContact
    medicalConditions: [String]
    medications: [Medication]
    appointments: [Appointment]
  }

  enum Gender {
    Male
    Female
    Other
  }
  type Address {
    street: String
    city: String
    state: String
    zip: String
  }
  type EmergencyContact {
    name: String
    phoneNumber: String
  }
  type Medication {
    name: String
    dosage: String
  }
  input AddressInput {
    street: String
    city: String
    state: String
    zip: String
  }

  input EmergencyContactInput {
    name: String
    phoneNumber: String
  }

  input MedicationInput {
    name: String!
    dosage: String!
  }

  type Therapist {
    id: ID!
    name: String
    email: String!
    password: String!
    license: String
    dateOfBirth: String
    profileImage: String
    specialties: [String!]
    description: String
    availability: String
    address: Address
    phoneNumber: String
    education: [String]
    experience: Int
    languages: [String]
    fees: Float
    ratings: [Float]
    reviews: [String]
    appointments: [Appointment]
  }

  type Appointment {
    id: ID!
    patient: Patient!
    therapist: Therapist!
    startTime: String!
    endTime: String!
    duration: Int!
    notes: String
    status: String
  }

  type Token {
    value: String!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
    dateOfBirth: String!
    gender: Gender!
    role: Role!
  }
  input UserUpdateInput {
    id: ID!
    name: String
    dateOfBirth: String
    password: String
    oldPassword: String
  }

  type AuthPayload {
    token: String
    user: User
  }
  input TherapistInput {
    id: ID!
    license: String
    specialties: [String]
    description: String
    availability: String
    address: AddressInput
    phoneNumber: String
    education: [String]
    experience: Int
    languages: [String]
    fees: Float
    ratings: [Float]
    reviews: [String]
  }
  input AdressInput {
    street: String
    city: String
    state: String
    zip: String
  }
  extend type Query {
    user(ID: ID!): User
    checkEmailExists(email: String!): Boolean!
    current(token: String!): User
  }
  extend type Mutation {
    register(userInput: UserInput, image: Upload): User
    login(email: String!, password: String!): AuthPayload!
    verifyEmail(id: ID, otp: String): String
    update(userInput: UserUpdateInput, image: Upload): User
    updateTherapist(therapistInput: TherapistInput): User
    resetPassword(email: String!): Boolean
    resetPasswordlink(
      userid: String!
      token: String!
      newpassword: String!
    ): Boolean
    resendMailVerification(id: ID): String
  }
`;
