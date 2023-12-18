import http from "k6/http";
import { check } from "k6";
export default function () {
  const payload = JSON.stringify({
    userId: "1",
    id: "21",
    title: "Finish materi 8",
    completed: "true",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.put("https://jsonplaceholder.typicode.com/todos/21", payload, params);
  check(res, {
    "respons code was 200": (res) => res.status == 200,
  });
}
