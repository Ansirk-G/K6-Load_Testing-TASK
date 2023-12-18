import http from "k6/http";
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
}
