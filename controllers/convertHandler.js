function ConvertHandler() {
  let regSplit = /[a-z]+|[^a-z]+/gi
  let regDig = /\d/

  this.getNum = function(input) {

    let result = input.match(regSplit)[0];
    //if no numeric is provided the initNum=1
    if (!regDig.test(result)){
        return Number(1);
    }
    // if there is a fraction
    if(result.includes('/')){
      let nums = result.split('/')
      // if more than 2 is invalid fraction
      if(nums.length > 2){
        //return undefined;
        return "invalid number";
      }
      //return the calculate fraction
      return Number(parseFloat(nums[0]/nums[1]).toFixed(5))
    }

    // if the number is invalid
    if(isNaN(result)){
      //return undefined;
      return "invalid number"
    }
    // return int or decimal number
    return result;
  };

  this.getUnit = function(input) {
    let result
    // if there is no digit, the first array is "unit"
    if (!regDig.test(input)){
      result = input.match(regSplit)[0].toLowerCase();
    } else{
      result = input.match(regSplit)[1].toLowerCase();
    }

    let units = ['gal','l','km','mi','kg','lbs'];

    // Check validity of the unit
    if (!units.includes(result)){
      return "invalid unit";
    }
    // liter must return in uppercase
    if(result == 'l'){
      result = 'L'
    }

    console.log("getUnit", result)
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    
    switch(result){
      case "km":
        return "mi";
      case "gal":
        return "L"
      case "lbs":
        return "kg"
      case "mi":
        return "km"
      case "l":
        return "gal"
      case "kg":
        return "lbs"
      default:
        return "invalid unit";
    }

  };

  this.spellOutUnit = function(unit) {
    let result = unit.toLowerCase();
    switch(result){
      case "km":
        return "kilometers";
      case "gal":
        return "gallons"
      case "lbs":
        return "pounds"
      case "mi":
        return "miles"
      case "l":
        return "liters"
      case "kg":
        return "kilograms"
      default:
        return undefined;
    }

  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    let unit = initUnit.toLowerCase()
    switch(unit){
      case "km":
        result =  initNum/miToKm;
        break;
      case "gal":
        result = initNum*galToL;
        break;
      case "lbs":
        result = initNum*lbsToKg;
        break;
      case "mi":
        result = initNum*miToKm;
        break;
      case "l":
        result = initNum/galToL;
        break;
      case "kg":
        result = initNum/lbsToKg;
        break;
      default:
        result = undefined;
    }

    console.log("convert", result)
    return Number(parseFloat(result).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
