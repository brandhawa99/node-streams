const { Duplex } = require("node:stream");
const fs = require("node:fs");


class FileDuplexStream extends Duplex {
  constructor({ writableHighWaterMark, readableHighWaterMark, readFileName, writeFileName }) {
    super({ readableHighWaterMark, writableHighWaterMark })
    this.readFileName = readFileName;
    this.writeFileName = writeFileName;
    this.readFd = null;
    this.writeFd = null;
  }

}