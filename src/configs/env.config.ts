import "dotenv/config";

export const envs = {
    "APP_PORT": <number|undefined> process.env.APP_PORT,
    "DB_HOST": process.env.DB_HOST,
    "DB_PORT": <number|undefined> process.env.DB_PORT,
    "DB_USERNAME": process.env.DB_USERNAME,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_NAME": process.env.DB_NAME,
    "JWT_SECRET": process.env.JWT_SECRET
};