 
import { Pool } from 'pg';
 

const pool = new Pool({
    user: 'ankitkumar',
    host: '127.0.0.1', // Your PostgreSQL host
    database: 'rescueradar',
    password: 'rescueradar',
    port: 55601 , // Your PostgreSQL port
  //   ssl: {
	// 	rejectUnauthorized: true,
	// },
  });
  pool
  .connect()
  .then(() => {
    console.log('Database connection successful');
    // You can perform further database operations here
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
  });
  export default pool;