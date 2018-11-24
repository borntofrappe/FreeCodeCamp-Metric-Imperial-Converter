/* detail two functions
- isValidMeasure(measure) to check if the input is a valid measure (an optional number followed by a string matching a valid unit of measure)
- convertMeasure(measure) to actually convert the measure
*/
module.exports = {
  isValidMeasure(measure) {
    // detail an array of valid units
    const units = ['inch', 'mm', 'foot', 'm', 'mi', 'km', 'oz', 'ml', 'gal', 'l', 'lbs', 'kg'];
    // check if the input includes a valid unit of measure at the very end of the string
    // consider two variables to check if the measure contains a valid unit and a variable for the unit itself
    let isValid = false;
    let unit;

    const number = /\d+(\.\d+)?/;
    const numberRegex = measure.match(number);
    const numberMeasure = numberRegex ? numberRegex[0] : '';

    // a unit is valid if the string portion matches one of the array items (and the length as well, otherwise m and mm would overlap)
    for (let i = 0; i < units.length; i += 1) {
      const { length: lengthUnit } = units[i];
      const lengthMeasure = measure.length - numberMeasure.length;

      const endingMeasure = measure.substr(-lengthUnit);

      if (lengthUnit === lengthMeasure && units[i] === endingMeasure) {
        isValid = true;
        unit = units[i];
      }
    }
    // return the created variables
    return {
      isValid,
      unit
    };
  },
  convertMeasure(measure, unit) {
    // describe the possible unit of measure in an array of objects
    const TUC = [
      {
        unit: ['inch', 'mm'],
        conversion: [1, 25.4]
      },
      {
        unit: ['foot', 'm'],
        conversion: [1, 0.3048]
      },
      {
        unit: ['mi', 'km'],
        conversion: [1, 1.60934]
      },
      {
        unit: ['oz', 'ml'],
        conversion: [1, 29.57]
      },
      {
        unit: ['gal', 'l'],
        conversion: [1, 3.785]
      },
      {
        unit: ['lbs', 'kg'],
        conversion: [1, 0.453592]
      }
    ];

    // detail the number in the input (if existing)
    const number = /\d+(\.\d+)?/;
    const numberRegex = measure.match(number);
    // if missing consider the number as 1
    const numberMeasure = numberRegex ? numberRegex[0] : 1;

    // find the object containing the unit of measure
    const objectTUC = TUC.find(table => table.unit.includes(unit));
    // destructure the values from each object item
    const [imperialUnit, metricUnit] = objectTUC.unit;
    const [imperial, metric] = objectTUC.conversion;

    // build variables sent in the response object
    let initNum;
    let initUnit;
    let returnNum;
    let returnUnit;

    // detail the values according to the unit and the input number
    if (unit === imperialUnit) {
      initNum = numberMeasure;
      initUnit = imperialUnit;
      returnNum = numberMeasure / imperial * metric;
      returnUnit = metricUnit;
    } else {
      initNum = numberMeasure;
      initUnit = metricUnit;
      returnNum = numberMeasure / metric * imperial;
      returnUnit = imperialUnit;
    }

    // return the object fitting the requirement of the application
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum}${initUnit} converts to ${returnNum}${returnUnit}`
    };
  }
};
