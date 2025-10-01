// index.js

// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
}

// Add a TimeIn event
function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Add a TimeOut event
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

// Calculate total wages for an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(e => e.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}

// Calculate total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
