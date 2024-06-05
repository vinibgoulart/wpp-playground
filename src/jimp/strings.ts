import Jimp from 'jimp';

export const splitTextIntoLines = (
  text: string,
  font: Awaited<ReturnType<typeof Jimp.loadFont>>,
  imageWidth: number,
) => {
  const { lines, line } = text
    .split(' ')
    .reduce<{ lines: string[]; line: string }>(
      (acc, word) => {
        const testLine = acc.line + word + ' ';
        const testWidth = Jimp.measureText(font, testLine);

        if (testWidth < imageWidth) {
          return {
            ...acc,
            line: testLine,
          };
        }

        return {
          lines: [...acc.lines, acc.line],
          line: word + ' ',
        };
      },
      { lines: [], line: '' },
    );

  return [...lines, line];
};
