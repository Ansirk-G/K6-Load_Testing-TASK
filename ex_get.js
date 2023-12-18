import http from "k6/http";
export default function () {
  http.get("https://reqres.in/api/users");
}
