const Benchmark = require('benchmark');
const Base64 = require('../index');

const suite = new Benchmark.Suite;
const encoder = Base64.Encoder();
const decoder = Base64.Decoder();

suite
  .add('Encoder push 32 bits', () => {
    encoder.push(1234, 32);
    encoder.flush();
  })
  .add('Decoder pop 32 bits', () => {
    decoder.pop(32);
    decoder.offset(0);
  }, {
    onStart: () => decoder.from('abcdefghijklmnopqrstuvwxyz=='),
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ 'async': true });