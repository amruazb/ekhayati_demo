import createClient from "openapi-fetch";
import { paths } from "./schema";

const { GET, PUT, POST, DELETE } = createClient<paths>({ baseUrl: process?.env?.NEXT_PUBLIC_API_HOST ||  "https://d924s003eg.execute-api.eu-central-1.amazonaws.com/api/" || "http://localhost:1337/api/" || process.env.API_HOST });

export { GET, PUT, POST, DELETE };