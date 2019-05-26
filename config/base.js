TWO_HOURS = 1000 * 60 * 60 * 2;

exports = {
  HOST,
  DB_URL,
  PORT,
  SESS_SECRET,
  NODE_ENV,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  SESS_LIFETIME = TWO_HOURS,
  SESS_NAME = "sid" //защита сессий
} = process.env;

exports = IN_PROD = NODE_ENV === "production";
