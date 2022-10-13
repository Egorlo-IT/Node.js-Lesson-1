"use strict";

// Напишите программу для вывода в консоль простых чисел, чтобы они попадали в указанный
// диапазон включительно. При этом числа должны окрашиваться в цвета по принципу светофора:
// ● первое число выводится зелёным цветом;
// ● второе — жёлтым;
// ● третье — красным.
// Диапазон, куда попадут числа, указывается при запуске программы.
// 1. Если простых чисел в диапазоне нет, нужно, чтобы программа сообщила об этом в терминале
// красным цветом.
// 2. Если аргумент, переданный при запуске, не считается числом — сообщите об этом ошибкой и
// завершите программу

import pkgColors from "colors";
import pkgReadline from "readline";

const colors = pkgColors;
const readline = pkgReadline;
const rl = readline.createInterface(process.stdin, process.stdout);

let startValue, endValue;
let foundPrime = false;

const question = (mess) => {
  return new Promise((resolve, reject) => {
    rl.question(mess, (answer) => {
      if (Number.isInteger(Number(answer))) {
        resolve(Number(answer));
      } else {
        reject(colors.red("Error: The value must be of type Integer"));
      }
    });
  });
};

const checkPrime = (start, end) => {
  if (start < end) {
    let number = 0;
    if (start < 2) start = 2;
    nextPrime: for (let i = start; i <= end; i++) {
      for (let j = 2; j < i; j++) {
        if (i % j === 0) continue nextPrime;
      }

      number++;

      switch (number) {
        case 1:
          console.log(colors.green(i));
          break;
        case 2:
          console.log(colors.yellow(i));
          break;
        case 3:
          console.log(colors.red(i));
          break;
        default:
          console.log(colors.green(i));
          break;
      }
      if (number === 3) number = 0;

      foundPrime = true;
    }
  } else {
    console.log(
      colors.red("There are no prime numbers in the specified range")
    );
  }

  if (foundPrime === false)
    console.log(
      colors.red("There are no prime numbers in the specified range")
    );
};

const main = async () => {
  await question(
    "Enter the starting integer value for a range of numbers: "
  ).then(
    (result) => {
      startValue = result;
      console.log(
        `${colors.blue("Number range start value")} = ${colors.green(result)}`
      );
    },
    (error) => {
      console.log(error);
      process.exit(1);
    }
  );
  await question("Enter the final integer value for a range of numbers: ").then(
    (result) => {
      endValue = result;
      console.log(
        `${colors.blue("Number range end value")} = ${colors.green(result)}`
      );
    },
    (error) => {
      console.log(error);
      process.exit(1);
    }
  );

  checkPrime(startValue, endValue);

  rl.close();
};

main();
