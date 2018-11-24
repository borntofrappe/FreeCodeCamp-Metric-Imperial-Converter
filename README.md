# FreeCodeCamp Metric Imperial Converter

> First project of five required to earn the **Information Security and Quality Assurance** certification @freeCodeCamp.

Link to the frontend project right [here](https://codepen.io/borntofrappe/full/BGxpmK).

<!-- Link to the working project right [here]() -->

## Preface

With this project I set out to complete the first project of five required for the **Information Security and Quality Assurance** certification. The project at hand: a metric to imperial converter, simply allowing to convert from one unit of measure to another.

Broadly speaking, I think I will develop a simpler version with HTML, CSS and JavaScript. This will allow me to also build a UI later used for the application @glitch.

That being said, it is arguably important to stress out the user stories the project is supposed to fulfill, before developing the front-end as well.

## User Stories

The project needs to fill the following requirements set up by freeCodeCamp.

- hide the MIME type from the response sent from the server;

- prevent cross-site scripting attacks;

- send a converted measure following a **GET** request in the `/api/convert` endpoint. The endpoint ought to accept a single parameter in `?input={input}` and should convert between metric and imperial and vice versa.

- an invalid unit of measurement ought to return a string depicting the `invalid unit`;

- an invalid number (such as `1/2`) should return `invalid number`;

- invalid number and unit should return `invalid number and unit`;

- it is possible to use fractions, decimal, and also no number. In this last instance the number is assumed to be `1`.

- the actual response should consist of a JSON object (better documented in the notes added below).

The **GET** request should function as follows:

| Input | Output      | Request                  |
| ----- | ----------- | ------------------------ |
| 4 gal | 3.79541 L   | `api/convert?input=4gal` |
| 1 lb  | 0.453592 kg | `api/convert?input=1lb`  |

Returning a JSON response as follows:

```json
{
  "initNum": 1,
  "initUnit": "gal",
  "returnNum": 3.78541,
  "returnUnit": "L",
  "string": "1 gallons converts to 3.78541 liters"
}
```

Detailing the measure and the unit, for the input and the return values, as well as a string depicting the conversion.

All in all, it doesn'tt seem too complicated a project.

- the first couple of user stories relate to the **Information Security** portion of the certification, and thusly I should be able to fulfill both using **Helmet.js**;

- the main feature of the application seems to require a simple route being set up with **Express**, handling the string parameter following the `input` field. I should return a JSON object dependant on this value.

What the application needs is then an actual conversion between metric and imperial unit of measures. I am sure **npm** has a package for this occurrence, but I'd like to research about the conversion and perhaps figure out a way to achieve the same result without additional node packages.

## Conversion

From imperial to metric, it is possible to describe a few unit of measures as follows:

### Length:

| Imperial | Metric      | 1 Imperial Is X Metric |
| -------- | ----------- | ---------------------- |
| inch     | millimeters | 25.4                   |
| foot     | meter       | 0.3048                 |
| yard     | meter       | 0.9144                 |

### Area:

| Imperial    | Metric             | 1 Imperial Is X Metric |
| ----------- | ------------------ | ---------------------- |
| square inch | square centimeters | 6.4516                 |
| square foot | square decimeters  | 9.29                   |
| square yard | square meters      | 0.8361                 |
| acre        | hectares           | 0.40469                |
| square mile | hectares           | 259                    |

### Volume:

| Imperial   | Metric            | 1 Imperial Is X Metric |
| ---------- | ----------------- | ---------------------- |
| cubic inch | cubic centimeters | 16.4                   |
| cubic foot | cubic meters      | 0.0283                 |
| cubic yard | cubic meters      | 0.765                  |

### Capacity:

| Imperial    | Metric      | 1 Imperial Is X Metric |
| ----------- | ----------- | ---------------------- |
| (US) oz     | milliliters | 29.57                  |
| (US) gill   | milliliters | 118.29                 |
| (US) pint   | milliliters | 473.18                 |
| (US) gallon | liters      | 3.785                  |
| (US) peck   | liters      | 8.810                  |
| (US) bushel | liters      | 35.239                 |

### Mass:

| Imperial      | Metric    | 1 Imperial Is X Metric |
| ------------- | --------- | ---------------------- |
| grain         | grams     | 0.065                  |
| dram          | grams     | 1.772                  |
| ounce         | grams     | 28.35                  |
| pound         | kilograms | 0.45359237             |
| stone         | kilograms | 6.35                   |
| quarter       | kilograms | 12.70                  |
| hundredweight | kilograms | 50.80                  |
| (long) ton    | tonnes    | 1.016                  |
| (short) ton   | tonnes    | 0.907                  |

## Update

Working on the front-end version of the application I opted for a smaller subset of unit of measures. The script functions as follows:

- detail the conversion in an array of objects. Each object detailing the unit and conversion measures:

  ```js
  const TUC = [
    {
      unit: ["inch", "mm"],
      conversion: [1, 25.4]
    },
    {
      unit: ["foot", "m"],
      conversion: [1, 0.3048]
    }
  ];
  ```

- retrieve the values from the input elements;

- based on these values, call a function to convert the measure.

The entire process is well-commented in the `script.js` file found in the **FrontEnd** folder. There's some ingenuity there.
