import { post } from "lib/request";
import { NOVA_POSHTA_API, NOVA_POSHTA_URL } from "lib/constants";

export const getCities = (СityName) =>
  post(NOVA_POSHTA_URL, "/Address/searchSettlements", {
    data: {
      apiKey: NOVA_POSHTA_API,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: СityName,
        Limit: 30,
      },
    },
  });
