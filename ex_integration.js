import http from "k6/http";
import { Counter } from "k6/metrics";
import { sleep, check as loadTestingCheck } from "k6";

let failedTestCases = new Counter("failedTestCases");

export let options = {
  thresholds: {
    failedTestCases: [{ threshold: "count==0" }], // add "abortOnFail: true" to stop on the first failure
  },
  iterations: 1,
  vus: 1,
};

// Functional check (like assert).
let check = function (obj, conditionArray, tags) {
  let result = loadTestingCheck(obj, conditionArray, tags || {});
  failedTestCases.add(!result);
  return result;
};

export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles/");

  check(res.status, {
    "API is working": (status) => status === 200,
  });

  check(res.json().length, {
    "got 8 crocodiles": (number_of_objects) => number_of_objects === 8,
  });

  check(res.json("0.name"), {
    "First crocodile is Bert": (name) => name === "Bert",
  });

  check(res.json("1.name"), {
    "Second crocodile is Pepe": (name) => name === "Pepe",
  });
}
