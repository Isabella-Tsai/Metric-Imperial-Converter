'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
      .get(function(req, res){
        let input = req.query.input;
        //console.log(input)
        let initNum = convertHandler.getNum(input);
        console.log("api initNum", initNum)
        let initUnit = convertHandler.getUnit(input);
        console.log("api initUnit", initUnit)
        let returnNum = convertHandler.convert(initNum, initUnit);
        let returnUnit = convertHandler.getReturnUnit(initUnit);
        let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)


        if(initNum=="invalid number" && initUnit=="invalid unit"){
          res.send("invalid number and unit")
        } else if(initNum=="invalid number"){
          res.send("invalid number")
        } else if(initUnit=="invalid unit"){
          res.send("invalid unit")
        }

        res.json({initNum, initUnit, returnNum, returnUnit, string: toString});

      })

};
