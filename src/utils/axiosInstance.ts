import axios from "axios";
import { Buffer as buffer } from "buffer";

const username: string = process.env.REACT_APP_GITHUB_USERNAME as string,
  token: string = process.env.REACT_APP_GITHUB_TOKEN as string,
  authToken = buffer.from(String(`${username}:${token}`)).toString("base64");

const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Basic ${authToken}`,
  },
});

export default instance;
