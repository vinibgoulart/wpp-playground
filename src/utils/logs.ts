type Chunk = Uint8Array | string;
type ErrorCallback = (err?: Error) => void;

let logs: Array<{ kind: string; chunk: Chunk }> = [];

export const pop = () => {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(
      '!logs command is only available at production environment',
    );
  }

  const clonedLogs = [...logs];
  logs = [];
  return clonedLogs;
};

const redact = (msg: Chunk) => {
  if (typeof msg === 'string') {
    // Redact URLs with .net (MongoDB atlas)
    return msg.replace(/[^\s]*\.net[^\s]*/g, '[REDACTED]');
  }
  return msg;
};

const subscribeToLogs = () => {
  const createWriteStream = (kind: 'stdout' | 'stderr') => {
    const originalWrite =
      kind === 'stdout' ? process.stdout.write : process.stderr.write;

    return (
      chunk: Chunk,
      cbOrEncoding?: BufferEncoding | ErrorCallback,
      cb?: ErrorCallback,
    ) => {
      logs.push({ kind, chunk: redact(chunk) });
      // @ts-expect-error
      originalWrite.apply(process[kind], [chunk, cbOrEncoding, cb]);
      return true;
    };
  };

  process.stdout.write = createWriteStream('stdout');
  process.stderr.write = createWriteStream('stderr');
};

export default subscribeToLogs;
