// Your code here
const createEmployeeRecord = (employeeInfo) => {
    const [employeeFirstName, employeeFamilyName, employeeTitle, pay] = employeeInfo;

    const employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
        return employeeRecord;
}
//createEmployeeRecord(["moe", "sizlak", "barkeep", 2])


const createEmployeeRecords = (employeesArr) => {
   return employeesArr.map(record => createEmployeeRecord(record))
}
//createEmployeeRecords([ [], [] ])


const createTimeInEvent = function (employeeRecord, dateStamp) {
   const [date, hour] = dateStamp.split(" "); // [date, hour] = [YYYY-MM-DD, HHMM]

   const timeIn = { 
        type: "TimeIn",
        hour: parseInt(hour, 10), //need to convert time from string to integer        
        date: date
    }
    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord;
}
//createTimeInEvent(["moe", "sizlak", "barkeep", 2], "2014-02-28 1400")
//createTimeInEvent(employee record object, dateStamp string "YYYY-MM-DD HHMM")


const createTimeOutEvent = function (employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
 
    const timeOut = { 
         type: "TimeOut",
         hour: parseInt(hour, 10), //need to convert time from string to integer         
         date: date
     }
     employeeRecord.timeOutEvents.push(timeOut)
     return employeeRecord;
 }


const hoursWorkedOnDate = function (employeeRecord, targetDate) {
    const inEvent = employeeRecord.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = employeeRecord.timeOutEvents.find(outEvent => outEvent.date === targetDate)
     
        return (outEvent.hour - inEvent.hour)/100 //need to divide by 100 bc we need the hours and time is like 2400-1200
}


const wagesEarnedOnDate = function (employeeRecord, targetDate) {
    return hoursWorkedOnDate(employeeRecord, targetDate) * employeeRecord.payPerHour;
 }


const allWagesFor = function (employeeRecord) {
    const eligibleDates = employeeRecord.timeInEvents.map(function (e) {
    return e.date
        })

    const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)
      return payable;
}


const findEmployeeByFirstName = function (srcArray, firstName) {
    //loop thru srcArray, find each record that matches the first name
    return srcArray.find(oneRecord => oneRecord.firstName === firstName);
   }


const calculatePayroll = function (empRecordsArr) {
   return empRecordsArr.reduce(function (total, rec) {
       return total + allWagesFor(rec)
   }, 0)
}
