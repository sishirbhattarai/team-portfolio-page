// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee.js');

//Extending Employee properties name, id, email using extends
// Super will carry the Employee properties

class Engineer extends Employee {
    constructor(name, id, email, github) {
      super(name, id, email)

      this.github = github
      this.role = 'Engineer';
    }

    getGithub() {
        return this.github
    }

    getRole() {
        return this.role
    }

}


module.exports = Engineer;