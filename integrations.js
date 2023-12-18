import http from "k6/http";
import { check } from "k6";

export default function () {
  const req1 = {
    method: "GET",
    url: "https://reqres.in/api/users",
  };
  const req2 = {
    method: "POST",
    url: "https://reqres.in/api/users",
    body: {
      name: "morpheus",
      job: "leader",
    },
    params: {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  };
  //   const req3 = {
  //     method: "PUT",
  //     url: "https://reqres.in/api/users/2",
  //     body: {
  //       name: "morpheus",
  //       job: "zion resident",
  //     },
  //     params: {
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     },
  //   };
  const responses = http.batch([req1, req2]);
  check(responses[1], {
    "form data OK": (res) => JSON.parse(res.body)["name"] == "morpheus",
  });
}
