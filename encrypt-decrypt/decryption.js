// encryption/decryption => crypto module
//hashing-salting => crypto
//compression => zlib; 
// decoding/encoding => buffer text-encoding not in node

// Implementing a transform stream 

const { Transform } = require("node:stream");
const fs = require("node:fs/promises");

class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 0) {
        chunk[i] -= 1;
      }
    }
    this.push(chunk);
    callback(null, chunk);
  }
}


(async () => {
  const readFileHandle = await fs.open("write.txt", "r");
  const writeFileHandle = await fs.open("decrypt.txt", "w");

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const decrypt = new Decrypt();
  readStream.pipe(decrypt).pipe(writeStream)

})();


