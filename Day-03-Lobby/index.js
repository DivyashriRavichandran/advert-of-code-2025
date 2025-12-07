import fs from "fs";

// Part 1: Calculate total output of battery banks with 2-digit joltages
const findTotalOutput = (banks) => {
  let totalOutput = 0;

  // Get each bank of batteries
  for (let bankIndex = 0; bankIndex < banks.length; bankIndex++) {
    const bank = banks[bankIndex];

    let maxJoltage = 0;

    // loop through each digit in the bank
    for (let i = 0; i < bank.length; i++) {
      const firstDigit = Number(bank[i]); // find the first digit

      // loop through the remaining digits to form two-digit joltages
      for (let j = i + 1; j < bank.length; j++) {
        const secondDigit = Number(bank[j]); // find the second digit
        const joltage = firstDigit * 10 + secondDigit;
        if (joltage > maxJoltage) {
          maxJoltage = joltage;
        }
      }
    }

    totalOutput += Number(maxJoltage);
  }

  return totalOutput;
};

// Part 2: Calculate total output of battery banks with 12-digit joltages
const findTotalOutputPart2 = (banks) => {
  let totalOutput = 0;

  // Get each bank of batteries
  for (let bankIndex = 0; bankIndex < banks.length; bankIndex++) {
    const bank = banks[bankIndex];
    const digits = bank.split("").map(Number); // Convert bank string to array of digits

    let toPick = 12; // we need to pick 12 digits
    let maxJoltage = [];
    let start = 0;

    // loop to pick the highest possible digit for each position
    while (toPick > 0) {
      const end = digits.length - toPick; // calculate the end index for the current pick

      // find the best digit in the current range
      let bestDigit = -1;
      let bestIndex = start;

      // loop through the range to find the maximum digit
      for (let i = start; i <= end; i++) {
        if (digits[i] > bestDigit) {
          bestDigit = digits[i];
          bestIndex = i;
        }
      }

      // add the best digit to the result and update the start index
      maxJoltage.push(bestDigit);
      start = bestIndex + 1;
      toPick--;
    }

    // convert the array of digits back to a number
    maxJoltage = maxJoltage.join("");
    totalOutput += Number(maxJoltage);
  }

  return totalOutput;
};

// Read input from file
const data = fs.readFileSync("input.txt", "utf-8");
const banks = data.split("\n");
console.log("Part 1: Total Output Joltage:", findTotalOutput(banks));
console.log("Part 2: New Total Output Joltage:", findTotalOutputPart2(banks));
