import http from "k6/http";

import { sleep } from "k6";

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: "per-vu-iterations",

      vus: 1000,

      iterations: 3500,

      maxDuration: "2s",
    },
  },
};

export default function () {
  http.get("https://reqres.in/api/users");
  sleep(1);
}
