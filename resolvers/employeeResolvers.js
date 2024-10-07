const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const employeeResolvers = {
  Mutation: {
    async addEmployee(_, { name, email, password, position, department }, { Employee }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newEmployee = new Employee({
        name,
        email,
        password: hashedPassword,
        position,
        department,
      });

      return await newEmployee.save();
    },
    
    async login(_, { email, password }, { Employee }) {
      if (!Employee) {
        throw new Error('Employee model not available');
      }

      // Find the employee by email
      const employee = await Employee.findOne({ email });
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Check if the password is valid
      const validPassword = await bcrypt.compare(password, employee.password);
      console.log("Password comparison result:", validPassword); // Log the result of the comparison

      if (!validPassword) {
        throw new Error('Invalid password');
      }

      // Generate a JWT token
      const token = jwt.sign({ id: employee._id, email: employee.email }, process.env.JWT_SECRET || 'your_secret_key', {
        expiresIn: '1h',
      });

      // Return the employee data and the generated token
      return {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        token,
      };
    },
  },
};

module.exports = employeeResolvers;
