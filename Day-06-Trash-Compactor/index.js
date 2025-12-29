import fs from "fs";

// Part 1: Calculate grand total of results
const findGrandTotal = (numbers, operations) => {
  let grandTotal = 0;

  // Iterate over each column
  for (let col = 0; col < operations.length; col++) {
    let result = numbers[0][col]; // Start with the first row's number

    // Apply operations for each subsequent row
    for (let row = 1; row < numbers.length; row++) {
      const num = numbers[row][col]; // Current number
      const operation = operations[col]; // Current operation

      if (operation === "+") {
        result += num;
      } else if (operation === "*") {
        result *= num;
      }
    }
    grandTotal += result;
  }
  return grandTotal;
};

// Part 2: Calculate grand total of results with new rule
export const findGrandTotalPart2 = (operations, numbers) => {
  let grandTotal = 0;
  let currentNumbers = []; // numbers for current problem
  let currentReducer = null; // reducer function for current problem

  // iterate column-wise
  for (let col = 0; col <= numbers[0].length; col++) {
    let value = "";

    // build number from column
    for (let row = 0; row < numbers.length; row++) {
      const char = numbers[row][col];
      if (char && char !== " ") {
        value += char;
      }
    }

    value = value.trim();

    // determine reducer for current problem
    if (operations[col] === "+") {
      currentReducer = (arr) => arr.reduce((a, b) => a + b, 0);
    } else if (operations[col] === "*") {
      currentReducer = (arr) => arr.reduce((a, b) => a * b, 1);
    }

    if (value) {
      currentNumbers.push(Number(value)); // add number to current problem
    } else if (currentNumbers.length && currentReducer) {
      // apply reducer when column gap ends a problem
      grandTotal += currentReducer(currentNumbers);
      currentNumbers = [];
    }
  }

  return grandTotal;
};

// Read input from file
const data = fs.readFileSync("input.txt", "utf-8").trim();
const lines = data.split("\n"); // Split into lines

const numberLines = lines.slice(0, -1);
const operatorLine = lines.at(-1);

// Parse numbers and operations
const numbers = numberLines.map((line) =>
  line.trim().split(" ").filter(Boolean).map(Number)
);
const operations = operatorLine.trim().split(" ").filter(Boolean);

// Parse grid as strings and operations for Part 2
const operations2 = lines[lines.length - 1];
const numbers2 = lines.slice(0, -1);

console.log("Part 1: Grand Total:", findGrandTotal(numbers, operations));
console.log("Part 2: Grand Total:", findGrandTotalPart2(operations2, numbers2));
