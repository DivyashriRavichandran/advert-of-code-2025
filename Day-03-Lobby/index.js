import fs from "fs";

// Part 1: Calculate total output of battery banks
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

// Read input from file
const data = fs.readFileSync("input.txt", "utf-8");
const banks = data.split("\n");
console.log("Part 1: Total Output Joltage:", findTotalOutput(banks));
