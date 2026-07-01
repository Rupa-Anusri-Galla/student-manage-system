const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentStats,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/stats', protect, getStudentStats);

router
  .route('/')
  .get(protect, getStudents)
  .post(protect, upload.single('profilePhoto'), createStudent);

router
  .route('/:id')
  .get(protect, getStudentById)
  .put(protect, upload.single('profilePhoto'), updateStudent)
  .delete(protect, deleteStudent);

module.exports = router;
