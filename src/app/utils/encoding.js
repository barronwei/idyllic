import { deflateSync, inflateSync } from "zlib"

function encode(s) {
  return deflateSync(Buffer.from(s))
}

function decode(s) {
  return inflateSync(Buffer.from(s)).toString()
}

export { encode, decode }
