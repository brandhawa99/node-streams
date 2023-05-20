import * as fs from "node:fs/promises"

// write something to a file 1 million times 

// (async () => {
//   //open file 
//   console.time("writeMany")
//   const file = await fs.open('test.txt', "w");
//   const stream = file.createWriteStream();


//   for (let i = 0; i < 1_000_000; i++) {
//     const buff = Buffer.from(` ${i} `, "utf-8");
//     stream.write(buff);
//   }
//   file.close();
//   console.timeEnd("writeMany")
// })()

(async () => {
  // open file 
  const file = await fs.open("test.txt", "w");
  // create stream 
  const stream = file.createWriteStream();

  const NUM_OF_WRITES = 1000000000;
  let i = 0;

  const writeIt = () => {
    while (i < NUM_OF_WRITES) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      if (i === NUM_OF_WRITES - 1) {
        return stream.end(buff);
      }

      if (!stream.write(buff)) break;
      i++
    }
  }
  writeIt();
  stream.on("drain", () => {
    writeIt();
  })
  stream.on("close", () => {
    file.close();
  })

})()