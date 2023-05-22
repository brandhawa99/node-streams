const { Readable } = require("node:stream");
const fs = require("node:fs");


class FileReadStream extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark })
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();

    })
  }
  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err)
      // null is to indicate the end of the stream
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);

    })

  }
  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      })
    } else {
      callback(error);
    }
  }

}

console.time("read");
const stream = new FileReadStream({ highWaterMark: 1800, fileName: "./test.txt" });

stream.on("data", (chunk) => {
  console.log(chunk.toString("utf-16le"));
})

stream.on("end", () => {
  console.log("stream is done reading");
  console.timeEnd("read")
})