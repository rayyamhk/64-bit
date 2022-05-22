export declare const Decoder: () => {
  from: (base64: string) => void,
  pop: (k?: number) => number,
  offset: (k?: number) => void,
}

export declare const Encoder: () => {
  push: (binary: number, k?: number) => void,
  flush: () => string,
};
