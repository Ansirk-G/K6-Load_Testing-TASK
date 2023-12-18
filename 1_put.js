import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

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
  const payload = JSON.stringify({
    name: "morpheus",
    job: "zion resident",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.put("https://reqres.in/api/users/2", payload, params);
  check(res, {
    "respons code was 200": (res) => res.status == 200,
  });
  sleep(1);
}
