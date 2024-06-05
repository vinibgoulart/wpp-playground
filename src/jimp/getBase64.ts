import Jimp from 'jimp';

export const getBase64 = async (
  mimeType: string,
  image: Jimp,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    image.getBase64(mimeType, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.replace(`data:${mimeType};base64,`, '').trim());
    });
  });
};
