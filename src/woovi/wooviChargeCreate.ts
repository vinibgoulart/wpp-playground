import { wooviApi } from './wooviApi';

type IWooviChargeCreateArgs = {
  payload: {
    correlationID: string;
    value: number;
  };
  groupId: string;
};

type IWooviChargeCreateResponse = {
  charge: {
    paymentLinkUrl: string;
    qrCodeImage: string;
    brCode: string;
  };
};

type IWooviChargeCreateResult =
  | {
      success: true;
      paymentLinkUrl: string;
      qrCodeImage: string;
      brCode: string;
    }
  | {
      success: false;
      error: string;
    };

export const wooviChargeCreate = async ({
  payload,
  groupId,
}: IWooviChargeCreateArgs): Promise<IWooviChargeCreateResult> => {
  const body = {
    correlationID: payload.correlationID,
    value: payload.value,
    additionalInfo: [
      {
        key: 'groupId',
        value: groupId,
      },
    ],
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await wooviApi('/v1/charge', options);

  if (!response?.ok) {
    return {
      success: false,
      error: 'Failed to generate charge',
    };
  }

  const json = (await response.json()) as IWooviChargeCreateResponse;

  if (
    !json?.charge.paymentLinkUrl ||
    !json?.charge.qrCodeImage ||
    !json?.charge.brCode
  ) {
    return {
      success: false,
      error: 'Failed to generate charge',
    };
  }

  return {
    success: true,
    paymentLinkUrl: json.charge.paymentLinkUrl,
    qrCodeImage: json.charge.qrCodeImage,
    brCode: json.charge.brCode,
  };
};
