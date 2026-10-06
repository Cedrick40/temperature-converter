# Temperature Converter

A live temperature converter between Celsius, Fahrenheit, and Kelvin. Built for Task 5 (Temperature Converter) of my Web Development internship.

**Live page:** YOUR_GITHUB_PAGES_LINK_HERE

## About the project

The page has three input boxes: Celsius, Fahrenheit, and Kelvin. When you type a value in any one of them, the other two update instantly as you type. Invalid input is caught and explained, so it never breaks the page.

## Objective

To practice form inputs, JavaScript calculations, functions, and DOM updates.

## Tools used

- HTML5
- CSS3
- JavaScript
- VS Code
- Git and GitHub (free)

## Features

- Inputs for Celsius, Fahrenheit, and Kelvin
- Live conversion using the `input` event, with no button needed
- Results rounded to 2 decimal places, with extra zeros removed (for example `32`, not `32.00`)
- Validation for invalid input:
  - Letters and symbols show "Please enter a valid number" and the other boxes are cleared
  - Values below absolute zero (-273.15 °C, -459.67 °F, 0 K) show a clear message
  - Empty input, or a lone `-` or `.` while the user is still typing, clears the other boxes without an error
- Invalid boxes get a red border, and the page layout stays stable
- Responsive layout that works on desktop and mobile

## How it works

1. `document.getElementById` selects the three inputs, the form, and the message paragraph (DOM selection).
2. Each conversion has its own function: `celsiusToFahrenheit`, `celsiusToKelvin`, `fahrenheitToCelsius`, `fahrenheitToKelvin`, `kelvinToCelsius`, and `kelvinToFahrenheit`.
3. Each input has an `input` event listener that calls `convert()` every time the text changes.
4. `convert()` trims the text, checks for empty input, turns the text into a number with `Number()`, and rejects it if `isFinite()` is false.
5. It then converts the value to Celsius and compares it with absolute zero, using a tiny margin to avoid rounding errors.
6. If the value is valid, it fills in the other two boxes with the correct conversion functions (DOM update). If not, `showError()` adds a red border and a message.

### Formulas used

| Conversion | Formula |
| --- | --- |
| Celsius to Fahrenheit | F = C × 9/5 + 32 |
| Celsius to Kelvin | K = C + 273.15 |
| Fahrenheit to Celsius | C = (F − 32) × 5/9 |
| Kelvin to Celsius | C = K − 273.15 |

Fahrenheit to Kelvin and Kelvin to Fahrenheit combine these formulas.

## Styling

A soft blue-white page with a white card and a blue top edge, large readable inputs, the unit (°C, °F, K) shown inside each box, a blue focus outline, and a red border for invalid input. A media query for small screens reduces the padding and the heading size.

## Project structure

```
temperature-converter/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Outcome

A clean, working converter that updates live, validates input, and works on desktop and mobile. This task taught me how to organize code into small functions, react to the `input` event, validate numbers, and update the page from JavaScript.

## Author

Cedrick Niyibikora