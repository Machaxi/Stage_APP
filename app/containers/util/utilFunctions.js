import { acceptedRequestTxtColor, advanceColor, advancedGradients, beginnerGradients, beginnersColor, declinedRequestTxtColor, intermediateGradients, intermediatesColor, pendingRequestBg, pendingRequestTxtColor, professionalGradients, professionalsColor, requestAcceptedBg, requestDeclinedBg, white } from "./colors";
export const GOOGLE_MAPS_APIKEY = "AIzaSyAdy0zh69w3bYrzIMxuISgN_5V-PWA17RI";

export const proficiencyStaticData = [
         {
           level: "Beginner",
           proficiency: "BASIC",
           img: require("../../images/beginner_emoji.png"),
           colors: beginnerGradients,
           isSelected: false,
         },
         {
           level: "Intermediate",
           proficiency: "INTERMEDIATE",
           img: require("../../images/intermediate_emoji.png"),
           colors: intermediateGradients,
           isSelected: false,
         },
         {
           level: "Advanced",
           proficiency: "ADVANCED",
           img: require("../../images/advance_emoji.png"),
           colors: advancedGradients,
           isSelected: false,
         },
        //  {
        //    level: "Professional",
        //    proficiency: "PROFESSIONAL",
        //    img: require("../../images/professional_emoji.png"),
        //    colors: professionalGradients,
        //    isSelected: false,
        //  },
       ];
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

export const getNumericProficiency = (input) => {
  switch (input) {
    case "BASIC":
      return 1;
    case "INTERMEDIATE":
      return 2;
    case "ADVANCED":
      return 3;
    case "PROFESSIONAL":
      return 4;
    default:
      return null;
  }
}

export const getNumericMonth = (input) => {
  switch (input) {
    case "January":
      return 1;
    case "February":
      return 2;
    case "March":
      return 3;
    case "April":
      return 4;
    case "May":
      return 5;
    case "June":
      return 6;
    case "July":
      return 7;
    case "August":
      return 8;
    case "September":
      return 9;
    case "October":
      return 10;
    case "November":
      return 11;
    case "December":
      return 12;
    default:
      return 1;
  }
}

export const requestStatus = (input) => {
    var statusVal = '';
    if (input == "ACCEPTED") {
      statusVal = "accepted";
    } else if (input == "CANCELLED") {
      statusVal = "canceled";
    } else if (input == "DECLINED") {
      statusVal = "declined";
    } else if (input == "PENDING") {
      statusVal = "pending";
    }
    return statusVal;
}

export const requestStatusName = (input) => {
    var statusVal = '';
    if (input == "ACCEPTED") {
      statusVal = "Request Accepted";
    } else if (input == "CANCELLED") {
      statusVal = "Request Canceled";
    } else if (input == "DECLINED") {
      statusVal = "Request Declined";
    } else if (input == "PENDING") {
      statusVal = "Request Pending";
    }
    return statusVal;
}

export const getProficiencyColor = (proficiency) => {
  switch (proficiency) {
    case "BASIC":
      return beginnersColor;
    case "INTERMEDIATE":
      return intermediatesColor;
    case "ADVANCED":
      return advanceColor;
    case "PROFESSIONAL":
      return professionalsColor;
    default: 
      return beginnersColor;
  }
     
}

export const getProficiencyEmoji = (proficiency) => {
  switch (proficiency) {
    case "BASIC":
      return require("../../images/beginner_emoji.png");
    case "INTERMEDIATE":
      return require("../../images/intermediate_emoji.png");
    case "ADVANCED":
      return require("../../images/advance_emoji.png");
    case "PROFESSIONAL":
      return require("../../images/professional_emoji.png");
    default: 
      return require("../../images/beginner_emoji.png");
  }
     
}


export const getProficiencyName = (proficiency) => {
  switch (proficiency) {
    case "basic":
      return 'Beginner';
    case "intermediate":
      return 'Intermediate';
    case "advanced":
      return 'Advanced';
    case "professional":
      return 'Professional';
    default: 
      return '';
  }
     
}

export const getProficiencyGradients = (proficiency) => {
  switch (proficiency) {
    case "BASIC":
      return beginnerGradients;
    case "INTERMEDIATE":
      return intermediateGradients;
    case "ADVANCED":
      return advancedGradients;
    case "PROFESSIONAL":
      return professionalGradients;
    default: 
      // return white;
      return ["#ffffff11", "#ffffff03"];
  }
     
}


export const requestStatusBg = (status) => {
  switch (status) {
    case "ACCEPTED":
      return requestAcceptedBg;
    case "PENDING":
      return pendingRequestBg;
    case "DECLINED":
      return requestDeclinedBg;
    case "CANCELLED":
      return requestDeclinedBg;
    default: 
      // return white;
      return pendingRequestBg;
  }
     
}


export const requestStatusTxtColor = (status) => {
  switch (status) {
    case "ACCEPTED":
      return acceptedRequestTxtColor;
    case "PENDING":
      return pendingRequestTxtColor;
    case "DECLINED":
      return declinedRequestTxtColor;
    case "CANCELLED":
      return declinedRequestTxtColor;
    default: 
      // return white;
      return pendingRequestTxtColor;
  }
     
}