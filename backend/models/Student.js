const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add full name'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Please add roll number'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add phone number'],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Please select gender'],
      enum: ['Male', 'Female', 'Other'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please add date of birth'],
    },
    department: {
      type: String,
      required: [true, 'Please add department'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Please add academic year'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Please add address'],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, 'Please add parent name'],
      trim: true,
    },
    parentPhone: {
      type: String,
      required: [true, 'Please add parent phone number'],
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: '',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', studentSchema);
