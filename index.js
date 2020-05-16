/* Your Code Here */

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

function createEmployeeRecord(employeeArray) {
    let newEmployee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

function createEmployeeRecords(employeesArray) {
    let newEmployeeArray = employeesArray.map(employee => createEmployeeRecord(employee))
    return newEmployeeArray
}

function createTimeInEvent(dateStamp) {
    let dateStampFormatting = dateStamp.split(" ")
    let newTimeIn = {
        type: "TimeIn",
        hour: parseInt(dateStampFormatting[1],10),
        date: dateStampFormatting[0]
    }

    this.timeInEvents.push(newTimeIn)
    return this
}

function createTimeOutEvent(dateStamp) {
    let dateStampFormatting = dateStamp.split(" ")
    let newTimeOut = {
        type: "TimeOut",
        hour: parseInt(dateStampFormatting[1],10),
        date: dateStampFormatting[0]
    }

    this.timeOutEvents.push(newTimeOut)
    return this  
}

function hoursWorkedOnDate(date) {
    let timeInObj = this.timeInEvents.find(a => a.date === date)
    let timeOutObj = this.timeOutEvents.find(a => a.date === date)

    return (timeOutObj.hour - timeInObj.hour) /100
}

function wagesEarnedOnDate(date) {
    let dateWage = hoursWorkedOnDate.call(this ,date) * this.payPerHour
    return dateWage
}

function calculatePayroll(employeesArray) {
    let allEmployeesWages = employeesArray.map(a => allWagesFor.call(a))
    let grandTotal = allEmployeesWages.reduce((a, b) => a + b)
    return grandTotal
}

function findEmployeebyFirstName(employeesArray, firstName) {
    return employeesArray.find(a => a.firstName === firstName)
}