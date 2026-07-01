const Student = require('../models/Student');
const fs = require('fs');
const path = require('path');

// Helper to delete photo from storage
const deletePhoto = (photoPath) => {
  if (photoPath) {
    // Normalise slash directions to join correctly
    const relativePath = photoPath.startsWith('/') ? photoPath.slice(1) : photoPath;
    const fullPath = path.join(__dirname, '..', relativePath);
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error('Failed to delete photo at:', fullPath, err.message);
      }
    }
  }
};

// @desc    Create a new student record
// @route   POST /api/students
// @access  Private
const createStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body };
    studentData.createdBy = req.user._id;

    if (req.file) {
      studentData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    // Check if roll number already exists
    const exists = await Student.findOne({ rollNumber: studentData.rollNumber });
    if (exists) {
      if (req.file) {
        deletePhoto(`/uploads/${req.file.filename}`);
      }
      res.status(400);
      throw new Error('Roll Number already exists');
    }

    // Check if email already exists
    const emailExists = await Student.findOne({ email: studentData.email });
    if (emailExists) {
      if (req.file) {
        deletePhoto(`/uploads/${req.file.filename}`);
      }
      res.status(400);
      throw new Error('Email address already registered for another student');
    }

    const student = await Student.create(studentData);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (req.file) {
      deletePhoto(`/uploads/${req.file.filename}`);
    }
    next(error);
  }
};

// @desc    Get all students (with search, filtering, sorting, pagination)
// @route   GET /api/students
// @access  Private
const getStudents = async (req, res, next) => {
  try {
    const { search, gender, department, year, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search query
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Select filters
    if (gender && gender !== 'All') {
      query.gender = gender;
    }
    if (department && department !== 'All') {
      query.department = department;
    }
    if (year && year !== 'All') {
      query.year = year;
    }

    // Sort options
    let sortQuery = { createdAt: -1 };
    if (sort) {
      const [field, order] = sort.split(':');
      sortQuery[field] = order === 'asc' ? 1 : -1;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: students.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student details
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student details
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    const updateData = { ...req.body };

    if (req.file) {
      if (student.profilePhoto) {
        deletePhoto(student.profilePhoto);
      }
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    // Unique rollNumber check
    if (updateData.rollNumber && updateData.rollNumber !== student.rollNumber) {
      const exists = await Student.findOne({ rollNumber: updateData.rollNumber });
      if (exists) {
        if (req.file) {
          deletePhoto(`/uploads/${req.file.filename}`);
        }
        res.status(400);
        throw new Error('Roll Number already exists');
      }
    }

    // Unique email check
    if (updateData.email && updateData.email !== student.email) {
      const exists = await Student.findOne({ email: updateData.email });
      if (exists) {
        if (req.file) {
          deletePhoto(`/uploads/${req.file.filename}`);
        }
        res.status(400);
        throw new Error('Email address already registered for another student');
      }
    }

    student = await Student.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: student });
  } catch (error) {
    if (req.file) {
      deletePhoto(`/uploads/${req.file.filename}`);
    }
    next(error);
  }
};

// @desc    Delete a student record
// @route   DELETE /api/students/:id
// @access  Private
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    if (student.profilePhoto) {
      deletePhoto(student.profilePhoto);
    }

    await student.deleteOne();

    res.json({ success: true, message: 'Student removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard metrics & aggregated stats
// @route   GET /api/students/stats
// @access  Private
const getStudentStats = async (req, res, next) => {
  try {
    const totalStudents = await Student.countDocuments();
    const maleStudents = await Student.countDocuments({ gender: 'Male' });
    const femaleStudents = await Student.countDocuments({ gender: 'Female' });
    
    // Aggregation/Distinct for unique departments
    const departmentsData = await Student.distinct('department');
    const departmentsCount = departmentsData.length;

    // Get recently added students (limit 5)
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalStudents,
        maleStudents,
        femaleStudents,
        departmentsCount,
        departments: departmentsData,
        recentStudents,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats,
};
