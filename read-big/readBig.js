const fs = require("node:fs/promises");

(async () => {
  // open file to read from and write to 
  const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  // create read and write streams
  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = '';

  streamRead.on("data", (chunk) => {
    let numbersArr = chunk.toString("utf-8").split("  ");

    if (Number(numbersArr[0]) !== Number(numbersArr[1]) - 1) {
      numbersArr[0] = split.trim() + numbersArr[0].trim();
    }
    if (Number(numbersArr[numbersArr.length - 2]) + 1 !== Number(numbersArr[numbersArr.length - 1])) {
      split = numbersArr.pop();
    }
    numbersArr.forEach((num) => {
      let n = Number(num);
      if (n % 2 === 0) {
        if (!streamWrite.write(" " + n + "  ")) {
          streamRead.pause();
        }
      }
    })
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  })
})()