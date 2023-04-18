export const MonthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]

// {
//     "success": true,
//     "data": {
//         "message": "Request updated"
//     },
//     "code": 200
// }

export const requestStatus = (input) => {
    var statusVal = '';
    if (input == "ACCEPTED") {
      statusVal = "accepted";
    } else if (input == "CANCELLED") {
      statusVal = "canceled";
    } else if (input == "DECLINED") {
      statusVal = "declined";
    }
    return statusVal;
}