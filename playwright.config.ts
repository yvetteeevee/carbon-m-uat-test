import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

console.log("BASE_URL from env1:", process.env.BASE_URL);

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    video: "on",
  },
});

console.log("BASE_URL from env2:", process.env.BASE_URL);
