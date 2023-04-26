import { advanceColor, advancedGradients, beginnerGradients, beginnersColor, intermediateGradients, intermediatesColor, professionalGradients, professionalsColor, white } from "./colors";
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
         {
           level: "Professional",
           proficiency: "PROFESSIONAL",
           img: require("../../images/professional_emoji.png"),
           colors: professionalGradients,
           isSelected: false,
         },
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
    case "BASIC":
      return 'Beginner';
    case "INTERMEDIATE":
      return 'Intermediate';
    case "ADVANCED":
      return 'Advanced';
    case "PROFESSIONAL":
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