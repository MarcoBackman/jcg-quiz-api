module.exports = {
  apps : [{
    name   : "jcg-quiz-api",
    script : "./main.js",
    instances: 1,
    exec_mode: "fork",
    env: {
      "NODE_ENV": "production",
      "PORT": 3000,
      "CORS_ORIGIN": process.env.CORS_ORIGIN || 'http://localhost:8080',
      "API_PREFIX": process.env.API_PREFIX || 'api',
      "AI_API_BASE_URL": process.env.AI_API_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/models/',
      "AI_API_KEY": process.env.AI_API_KEY,
      "AI_AGENT": process.env.AI_AGENT || 'gemini-2.0-flash'
    },
    env_production: {
      "NODE_ENV": "production",
      // These will be overridden by values from the `env` block in the GitHub Actions workflow
      // when `pm2 start ecosystem.config.js --env production` is used.
      // We list them here for clarity, but the actual values will come from the GHA workflow.
      "CORS_ORIGIN": null, // Will be overridden
      "API_PREFIX": null, // Will be overridden
      "AI_API_BASE_URL": null, // Will be overridden
      "AI_API_KEY": null, // THIS IS THE KEY ONE - will be overridden
      "AI_AGENT": null // Will be overridden
    }
  }]
};