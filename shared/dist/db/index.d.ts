import { Pool } from 'pg';
import * as schema from './schema';
declare const pool: Pool;
export declare const db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
    $client: Pool;
};
export { pool };
