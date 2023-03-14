const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  name: { type: String },
  dateOfBirth: { type: Date },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  phoneNumber: { type: String },
  emergencyContact: {
    name: { type: String },
    dateOfBirth: { type: Date },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    phoneNumber: { type: String },
  },
  medicalConditions: [{ type: String }],
  medications: [{ name: { type: String }, dosage: { type: String } }],
});

const TherapistSchema = mongoose.Schema({
  name: { type: String },
  dateOfBirth: { type: Date },
  license: { type: String },
  specialty: { type: String },
  description: { type: String },
  availability: { type: String },
  education: [{ type: String }],
  specialties: [{ type: String }],
  experience: { type: String },
  languages: [{ type: String }],
  phoneNumber: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  fees: { type: Number },
  ratings: [{ type: Number }],
  reviews: [{ type: String }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  notes: { type: String },
  status: {
    type: String,
    enum: ["Scheduled", "Confirmed", "Cancelled", "Completed"],
    default: "Scheduled",
  },
});
const userSchema = new mongoose.Schema({
  verified: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Patient", "Therapist"],
  },
  profileImage: {
    type: String,
    required: false,
  },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  patient: { type: PatientSchema },
  therapist: { type: TherapistSchema },
});
const Patient = mongoose.model("Patient", PatientSchema);
const Therapist = mongoose.model("Therapist", TherapistSchema);
const Appointment = mongoose.model("Appointment", AppointmentSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Patient, Therapist, Appointment, User };
