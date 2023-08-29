import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: {
    type: 'string',
    required: true,
  },
  fname: {
    type: 'string',
    required: true
  },
  lname: {
    type: 'string',
    required: true
  },
  dob: {
    type: 'string',
    required: true
  },
  batch: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true
  },
  mentorId: {
    type: 'string',
    required: false
  },
  previousMentorIDs: {
    type: [String],
    required: false
  },
});

const mentorSchema = new mongoose.Schema({
  id: {
    type: 'string',
    required: true,
  },
  fname: {
    type: 'string',
    required: true
  },
  lname: {
    type: 'string',
    required: true
  },
  dob: {
    type: 'string',
    required: true
  },
  batch: {
    type: [String],
    required: true
  },
  email: {
    type: 'string',
    required: true
  },
  studentIDs: {
    type: [String],
    required: false
  },
});



const student = mongoose.model('student', studentSchema);
const mentor = mongoose.model('mentor', mentorSchema);
export {
  student,mentor
}

