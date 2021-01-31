const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

test("Can set a first name via constructor arguments", () => {
  const firstName = "Studs";
  const e = new Employee(firstName);
  expect(e.firstName).toBe(firstName);
});

test("Can set a last name via constructor arguments", () => {
  const lastName = "Barkel";
  const e = new Employee("Studs", lastName);
  expect(e.lastName).toBe(lastName);
});



test("Can set a role ID via constructor argument", () => {
  const testValue = 1;
  const e = new Employee("Studs", "Barkel", testValue);
  expect(e.roleId).toBe(testValue);
});

test("Can set a manager ID via constructor argument", () => {
  const testValue = 1;
  const e = new Employee("Studs", "Barkel", 1, testValue);
  expect(e.managerId).toBe(testValue);
});



