const Employee = require("../models/employee");

const AppContext = ({ req }) => {
  const token = req.headers.authorization || '';
  
  let currentUser = null;
  if (token) {
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      currentUser = decoded; // Optionally fetch user data if needed
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  return {
    user: currentUser,
    Employee, // Ensure Employee model is included in context
  };
};

module.exports = AppContext;
