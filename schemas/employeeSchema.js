const { gql } = require('apollo-server-express');

const employeeSchema = gql`
  type Employee {
    id: ID!
    name: String!
    email: String!
    position: String
    department: String
    password: String!  # Add the password field here
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
    addEmployee(name: String!, email: String!, password: String!, position: String, department: String,token: String): Employee
    updateEmployee(id: ID!, name: String, email: String, position: String, department: String): Employee
    deleteEmployee(id: ID!): Employee
    loginEmployee(email: String!, password: String!): Token  # Add loginEmployee mutation
  }
`;

module.exports = employeeSchema;
