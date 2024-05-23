import { config } from 'dotenv';

config();

export default {
    host: process.env.HOST || '',
    database: process.env.DATABASE|| '',
    user: process.env.USER|| '',
    password: process.env.PASSWORD|| ''
};

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY