import knexfile from "./knexfile.js"
import knex from "knex"

process.env.npm_package_type='module';
const testEnvironment = process.argv.join('').indexOf('mocha') != -1 ? 'test' : undefined;
const config = knexfile[testEnvironment || process.env.DB_ENV || "development"];
export const database = knex(config);
