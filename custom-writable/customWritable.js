const { Writeable } = require("node:stream/promises");
const fs = require("node:fs/promises")

class FileWriteStream extends Writeable {

  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }
  // runs when constructor is complete; 
  async _construct(callback) {
    try {
      const writeFile = await fs.open(this.fileName, "w")
      callback();
    } catch (error) {
      callback(error);
    }

  }
  _write(chunk, encoding, callback) {
    // do our write operation



    // when we're done, we should call the callback 
    callback();
  }

}

const stream = new FileWriteStream({ highWaterMark: 1800 })
stream.write(Buffer.from("Hello this is a string"))
stream.end(Buffer.from("Out last write."));