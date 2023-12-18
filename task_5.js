import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

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
  const url1 = "https://reqres.in/api/users";
  const payload1 = JSON.stringify({
    name: "morpheus",
    job: "leader",
  });
  const params1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post(url1, payload1, params1);

  const payload2 = JSON.stringify({
    name: "morpheus",
    job: "zion resident",
  });
  const params2 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.put("https://reqres.in/api/users/2", payload2, params2);
  check(res, {
    "respons code was 200": (res) => res.status == 200,
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
