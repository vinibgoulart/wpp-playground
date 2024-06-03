import { client } from "./client";

import qrcode from "qrcode-terminal";

export const onQrCode = () => {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
};
