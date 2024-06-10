const bold = (str: TemplateStringsArray, ...values: any[]) =>
  `*${String.raw({ raw: str }, ...values)}*`;

const b = bold;

const italic = (str: TemplateStringsArray, ...values: any[]) =>
  `_${String.raw({ raw: str }, ...values)}_`;

const i = italic;

const code = (str: TemplateStringsArray, ...values: any[]) =>
  `\`${String.raw({ raw: str }, ...values)}\``;

const codeBlock = (str: TemplateStringsArray, ...values: any[]) =>
  '```' + String.raw({ raw: str }, ...values) + '```';

export { bold, b, italic, i, code, codeBlock };
