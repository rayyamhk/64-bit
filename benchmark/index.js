const Benchmark = require('benchmark');
const Base64 = require('../index');

const suite = new Benchmark.Suite;
const encoder = Base64.Encoder();
const decoder = Base64.Decoder();
decoder.from('abcdefghijklmnopqrstuvwxyz==');

suite
  .add('Encoder push 32 bits', () => {
    encoder.push(1234, 32);
    encoder.flush();
  })
  .add('Decoder pop 32 bits', () => {
    decoder.pop(32);
    decoder.offset(0);
  })
  .add('Encoder push 16 bits', () => {
    encoder.push(1234, 16);
    encoder.flush();
  })
  .add('Decoder pop 16 bits', () => {
    decoder.pop(16);
    decoder.offset(0);
  })
  .add('Encoder push 8 bits', () => {
    encoder.push(123, 8);
    encoder.flush();
  })
  .add('Decoder pop 8 bits', () => {
    decoder.pop(8);
    decoder.offset(0);
  })
  .add('Encoder push 1 bits', () => {
    encoder.push(1, 1);
    encoder.flush();
  })
  .add('Decoder pop 1 bits', () => {
    decoder.pop(1);
    decoder.offset(0);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ 'async': true });