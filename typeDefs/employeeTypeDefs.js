const { gql } = require('apollo-server-express');

const employeeTypeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    position: String
    department: String
  }

  type Token {
    token: String!
    employee: Employee!
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, email: String!, password: String!, position: String, department: String): Employee
    updateEmployee(id: ID!, name: String, email: String, position: String, department: String): Employee
    deleteEmployee(id: ID!): Employee
    login(email: String!, password: String!): Token  # Use Token type for login
  }
`;

module.exports = employeeTypeDefs;
