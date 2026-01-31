import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/node";
import { config } from "dotenv";
config();

if (!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY environment variable is not set");
}

if (process.env.NODE_ENV === "test") {
  throw new Error("Arcjet should not be initialized in test mode");
}

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:ARCHIVE", // Archive services e.g. Wayback Machine
        "CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "10s",
      max: 50,
    }),
  ],
});
