/* Your Code Here */
let createEmployeeRecord = function(employeeDetails) {
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployees = function(employeesDetails) {
    return employeesDetails.map(createEmployeeRecord)
}


let createTimeInEvent = function(dateTime) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTime.split(' ')[1]),
        date: dateTime.split(' ')[0]
    })
    return this
}

let createTimeOutEvent = function(dateTime) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime.split(' ')[1]),
        date: dateTime.split(' ')[0]
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(e => e.date === date).hour
    let timeOut = this.timeOutEvents.find(e => e.date === date).hour
    return (timeOut - timeIn)/100
}

let wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeebyFirstName = function(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName)
}

let calculatePayroll = function(employees) {
    return employees.reduce((total, emp) => total + allWagesFor.call(emp), 0)
}

let createEmployeeRecords = function(employeesDetails) {
    return employeesDetails.map(createEmployeeRecord)
}