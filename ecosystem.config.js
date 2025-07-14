module.exports = {
  apps : [{
    name   : "jcg-quiz-api",
    script : "./main.js",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "development", // Default environment
      PORT: 3000,
      CORS_ORIGIN: "http://localhost:8080,https://marcobackman.github.io",
      API_PREFIX: "api",
      AI_API_BASE_URL: "https://generativelanguage.googleapis.com/v1beta/models/",
      AI_AGENT: "gemini-2.0-flash",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000, // Or whatever production port you use
      CORS_ORIGIN: process.env.CORS_ORIGIN || "https://quiz-app-from.com,https://demo.marcobackman.cloud,https://marcobackman.github.io/quiz-app-frontend/,https://marcobackman.github.io", // This will take precedence if set via process.env
      API_PREFIX: process.env.API_PREFIX || "api",
      AI_API_BASE_URL: process.env.AI_API_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/models/",
      AI_API_KEY: process.env.AI_API_KEY, // This should come from secrets
      AI_AGENT: process.env.AI_AGENT || "gemini-2.0-flash",
    }
  }]
};