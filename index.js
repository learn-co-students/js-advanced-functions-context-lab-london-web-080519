/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function() {
	let eligibleDates = this.timeInEvents.map(function(e) {
		return e.date;
	});

	let payable = eligibleDates.reduce(
		function(memo, d) {
			return memo + wagesEarnedOnDate.call(this, d);
		}.bind(this),
		0,
	); // <== Hm, why did we need to add bind() there? We'll discuss soon!

	return payable;
};

function createEmployeeRecord(array) {
	return {
		firstName: array[0],
		familyName: array[1],
		title: array[2],
		payPerHour: array[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
}

function createEmployees(arrayOfArrays) {
	return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
	this.timeInEvents.push({
		type: "TimeIn",
		date: dateStamp.split(" ")[0],
		hour: parseInt(dateStamp.split(" ")[1]),
	});
	return this;
}

function createTimeOutEvent(dateStamp) {
	this.timeOutEvents.push({
		type: "TimeOut",
		date: dateStamp.split(" ")[0],
		hour: parseInt(dateStamp.split(" ")[1]),
	});
	return this;
}

function hoursWorkedOnDate(day) {
	return (
		(this.timeOutEvents.find(item => item.date == day).hour -
			this.timeInEvents.find(item => item.date == day).hour) /
		100
	);
}

function wagesEarnedOnDate(day) {
	return hoursWorkedOnDate.call(this, day) * this.payPerHour;
}

function allWagesFor() {
	return this.timeOutEvents.reduce((acc, curr) => {
		return acc + wagesEarnedOnDate.call(this, curr.date);
	}, 0);
}

function calculatePayroll(array) {
	return array.reduce((acc, curr) => {
		let bindedAllWagesFor = allWagesFor.bind(curr);
		return acc + bindedAllWagesFor();
	}, 0);
}

function createEmployeeRecords(array) {
	return array.map(item => createEmployeeRecord(item));
}

function findEmployeebyFirstName(array, name) {
	return array.find(element => element.firstName == name);
}
