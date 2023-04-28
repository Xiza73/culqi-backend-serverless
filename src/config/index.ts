import "dotenv/config";

export default {
  MONGODB_URL: process.env.MONGODB_URL || "",
  JWT_TOKEN: process.env.JWT_TOKEN || "",
};
