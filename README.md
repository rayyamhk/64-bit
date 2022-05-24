# base64-bit

This library provides a base64 decoder and encoder for you to manipulate bits in **nanoseconds**.

## Features
- Decoder allows you to pop bits from the base64 string.
- Encoder allows you to push bits to form base64 string.
- Highly optimized, bits manipulation can be done in **nanoseconds**.
- No dependencies.
- TypeScript supported.
- Well-tested.
- Browser compatability: IE6+.

## Usage

### Node.js
```javascript
const Base64 = require('base64-bit');
```

### Browser
```javascript
<script src="https://cdn.jsdelivr.net/npm/base64-bit/dist/index.min.js"></script>
<script src="/path/to/node_modules/base64-bit/dist/index.min.js"></script>
```

## APIs

### Decoder
Decodes base64 encoded string to bit stream.

```javascript
const decoder = Base64.Decoder();

// 010101_000110_100001_100111_011100_110010_1110(00)
decoder.from('VGhncy4=');

// Extracts the first 8 bits (01010100)
decoder.pop(8); // 84

// Extracts the next 32 bits (01101000 01100111 01110011 00101110)
decoder.pop(32); // 1751610158

decoder.pop(1); // null as no more available bits.

// Resets the bit position and pops the next 6 bits (000110)
decoder.offset(6);
decoder.pop(6); // 6
```

#### decoder.from(base64)
Loads a base64 encoded string to the decoder, and replaces the existing one.

#### decoder.pop(k = 8)
Extracts the next k bits and converts it to decimal, k should be at most 32.

#### decoder.offset(k = 0)
Resets the bit position by skipping the first k bits.

### Encoder
Encodes bit stream to base64 format.

```javascript
const encoder = Base64.Encoder();

encoder.push(46, 8); // Appends 00101110.
encoder.push(46, 16); // Appends 00000000_00101110.
encoder.push(1, 3); // Appends 001.
encoder.push(0, 1); // Appends 0.
encoder.push(-1, 8); // Error thrown, only unsigned binary is allowed.
encoder.push(255, 4); // Error thrown, as 255 cannot be represented by 4 bits.

// Encodes the bit stream (001011_100000_000000_101110_0010) to base64 format,
const encoded = encoder.flush(); // LgAuI===
```

#### encoder.push(binary, k = 8)
Converts an integer to k-bit unsigned binary, and appends it to the end of the bit stream. k should be at most 32.

#### encoder.flush()
Encodes the bit stream to base64 format, and resets the encoder.

## Performance
```
npm run benchmark
```
| Operation  | Benchmark (ops/sec)  | Time (ns/ops)  |
| :------------: | ------------: | ------------: |
| Push 1 bit   | 105,069,508  | 9.52  |
| Pop 1 bit     | 62,699,807  | 15.95  |
| Push 8 bits  | 64,279,504  | 15.56  |
| Pop 8 bits   | 40,743,087  |  24.54 |
| Push 16 bits | 36,436,695  | 27.44  |
| Pop 16 bits  | 30,037,712 | 33.29  |
| Push 32 bits | 17,044,324 | 58.67  |
| Pop 32 bits  | 15,764,883 | 63.43  |

## Build
The following command creates a babel compiled file and a minified file in `./dist` directory.
```
npm run build
```

## Test
The following command runs all tests in `./tests` directory.
```
npm run test
```

## Release
### 1.1.0
Optimize the implementation to achieve around 2x performance improvement.