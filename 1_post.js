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
  const url = "https://reqres.in/api/users";
  const payload = JSON.stringify({
    name: "morpheus",
    job: "leader",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post(url, payload, params);
  sleep(1);
}
