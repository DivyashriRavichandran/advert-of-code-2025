import fs from "fs";

// Part 1: Calculate fresh ingredients
const findFreshIngredients = (ranges, ids) => {
  let total = 0;

  // Check each ID against all ranges
  for (const id of ids) {
    let isFresh = false;
    // If the ID falls within any range, it's fresh
    for (const range of ranges) {
      if (id >= range.start && id <= range.end) {
        isFresh = true;
        break;
      }
    }
    // Count the number of ids that are fresh
    if (isFresh) {
      total += 1;
    }
  }

  return total;
};

// For part 2: Merge overlapping ranges first
const mergeRanges = (ranges) => {
  ranges.sort((a, b) => a.start - b.start); // Sort ranges by start value
  const merged = [];
  let current = ranges[0]; // Start with the first range

  for (let i = 1; i < ranges.length; i++) {
    const next = ranges[i]; // Next range
    // If ranges overlap or are contiguous, merge them
    if (next.start <= current.end + 1) {
      current.end = Math.max(current.end, next.end); // Extend the current range if overlapping
    } else {
      merged.push(current); // Add the current range to merged list
      current = next; // Move to the next range
    }
  }
  merged.push(current); // Add the last range
  return merged;
};

// Part 2: Find the total ingredient IDs that are considered fresh in the range
const findTotalFreshInRange = (ranges) => {
  const merged = mergeRanges(ranges); // new merged ranges
  let total = 0;

  // Sum up the lengths of the merged ranges
  for (const range of merged) {
    total += range.end - range.start + 1; // +1 to include both endpoints
  }
  return total;
};

// Read input from file
const data = fs.readFileSync("input.txt", "utf-8");
const [rangeBlock, idBlock] = data.split("\n\n"); // Split into ranges and IDs

// Parse ranges
const ranges = rangeBlock.split("\n").map((line) => {
  const [start, end] = line.split("-").map(Number);
  return { start, end };
});

const ids = idBlock.split("\n").map(Number);

console.log(
  "Part 1: Total fresh ingredients:",
  findFreshIngredients(ranges, ids)
);
console.log(
  "Part 2: Total fresh ingredients in range:",
  findTotalFreshInRange(ranges)
);
