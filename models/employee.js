const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  position: { type: String },
  department: { type: String },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
