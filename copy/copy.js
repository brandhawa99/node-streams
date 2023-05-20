
const fs = require("node:fs/promises");
const { pipeline } = require("node:stream/promises");

// (async () => {
//   console.time("copy")
//   const desFile = await fs.open("text-copy.txt", "w");
//   const result = await fs.readFile("test.txt");


//   await desFile.write(result);
//   console.timeEnd("copy")
// })();


(async () => {
  console.time("copy")
  const desFile = await fs.open("text-copy.txt", "w");
  const srcFile = await fs.open("test.txt", "r");
  try {
    //  
    await pipeline(
      srcFile.createReadStream(),
      desFile.createWriteStream(),
    )
  } catch (error) {
    console.log(error);
  } finally {

  }
})();



//Duplex stream that you can read from and write from 

// Transform can read and write but also transforms the data