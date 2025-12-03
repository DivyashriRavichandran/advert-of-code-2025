import fs from "fs";

// Part 1: Count how many times the dial lands on 0
export function partOneCountZeroes(rotations) {
  let dialPosition = 50;
  let count = 0; // password

  // rotations is an array of strings like ["L10", "R20", ...]
  for (const rotation of rotations) {
    const direction = rotation[0]; // 'L' or 'R' the first character
    const amount = parseInt(rotation.slice(1), 10); // the rest is the number

    if (direction === "L") {
      dialPosition = (dialPosition + amount) % 100;
    } else if (direction === "R") {
      dialPosition = (dialPosition - amount + 100) % 100;
    }

    if (dialPosition === 0) {
      count++;
    }
  }

  return count;
}

// Part 2: Count all times the dial passes through 0
export function partTwoCountAllZeroes(rotations) {
  let dialPosition = 50;
  let count = 0;

  for (const rotation of rotations) {
    const direction = rotation[0]; // 'L' or 'R' the first character
    const amount = parseInt(rotation.slice(1), 10); // the rest is the number of steps
    let stepMod = amount % 100;

    // Add zero hits for every full 100-step rotation
    count += (amount / 100) | 0;

    // left rotation
    if (direction === "L") {
      stepMod = -stepMod; // left is negative
      const nextPosition = dialPosition + stepMod;

      // check if we passed through zero
      if (nextPosition < 0 && nextPosition + 100 !== 0 && dialPosition !== 0) {
        count++;
      }
    }

    // right rotation
    else if (direction === "R") {
      const nextPosition = dialPosition + stepMod; // right is positive

      // check if we passed through zero
      if (nextPosition > 99 && nextPosition - 100 !== 0 && dialPosition !== 0) {
        count++;
      }
    }

    if (dialPosition === 0) {
      count++;
    }

    // update dial position
    dialPosition = (dialPosition + stepMod + 100) % 100;
  }

  return count;
}

// Read input from file and execute the function
const data = fs.readFileSync("input.txt", "utf-8");
const inputRotations = data.trim().split("\n"); // Split by new lines

// Output results
console.log("Part 1 Password:", partOneCountZeroes(inputRotations));
console.log("Part 2 Password:", partTwoCountAllZeroes(inputRotations));
