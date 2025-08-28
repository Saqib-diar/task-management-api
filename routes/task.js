const express = require('express');
const router = express.Router();
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, admin } = require('../middleware/auth');

const { 
  validateTaskCreation, 
  validateTaskUpdate, 
  validateObjectId, 
  handleValidationErrors 
} = require('../middleware/validation');

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(validateTaskCreation, handleValidationErrors, createTask);

router.route('/:id')
  .all(validateObjectId, handleValidationErrors)
  .get(getTask)
  .put(validateTaskUpdate, handleValidationErrors, updateTask)
  .delete(deleteTask);

module.exports = router;