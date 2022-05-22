const { Decoder, Encoder } = require('./base64');

const decoder = Decoder();
const encoder = Encoder();
const iteration = 1000000;

let time = 0;
decoder.from('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
for (let i = 0; i < iteration; i++) {
  const t1 = performance.now();
  decoder.pop(32);
  time += performance.now() - t1;
  decoder.offset(0);
}
console.log(`pop 32 bits: ${(time*1000000/iteration).toFixed(2)}ns (${iteration} samples)`);

time = 0;
for (let i = 0; i < iteration; i++) {
  const t1 = performance.now();
  encoder.push(1234, 32);
  time += performance.now() - t1;
  encoder.flush();
}
console.log(`push 32 bits: ${(time*1000000/iteration).toFixed(2)}ns (${iteration} samples)`);
