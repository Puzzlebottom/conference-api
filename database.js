import knexfile from "./knexfile.js"
import knex from "knex"

const config = knexfile[process.env.NODE_ENV || "development"];
export const database = knex(config);