const Task = require('../models/task');

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name email');
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if user owns the task or is admin
    if (task.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching task'
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let filter = { user: req.user._id };
    
    // Admin can see all tasks
    if (req.user.role === 'admin' && req.query.all === 'true') {
      filter = {};
    }
    
    const tasks = await Task.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Task.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: {
        tasks,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTasks: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching tasks'
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id
    });
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error creating task'
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if user owns the task or is admin
    if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating task'
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if user owns the task or is admin
    if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting task'
    });
  }
};

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };