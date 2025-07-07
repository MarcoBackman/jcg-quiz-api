module.exports = {
  apps : [{
    name   : "jcg-quiz-api",
    script : "./dist/main.js",
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
    }
  }]
};