import pool from "../configs/db.config";

export const isEmailExistInHospital = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.hospital WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};
export const isEmailExistInPatient = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.patient WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};

export const insertIntoHospital = async (
	id: string,
	name: string,
	phoneNumber: number,
	email: string,
	password: string,
	licenseId: string,
	capacity: number,
	longitude: string,
	latitude: string,
	address: string,
	status: string
) => {
	const insertUserQuery = `INSERT INTO hospital 
  (id, name, "phoneNumber", email, password, "licenseId", capacity, longitude, latitude, address, status) 
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *`;

	const result = await pool.query(insertUserQuery, [
		id,
		name,
		phoneNumber,
		email,
		password,
		licenseId,
		capacity,
		longitude,
		latitude,
		address,
		status,
	]);

	return result;
};

export const insertIntoPatient = async (
	id: string,
	name: string,
	phoneNumber: number,
	email: string,
	password: string,
	gender: string,
	emergencyContact: number,
	address: string
) => {
	const insertUserQuery = `INSERT INTO patient 
  (id, name,gender, "phoneNumber", email,  address, password, "emergencyContact") 
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

	const result = await pool.query(insertUserQuery, [
		id,
		name,
		gender,
		phoneNumber,
		email,
		address,
		password,
		emergencyContact,
	]);

	return result;
};

export const loginEmailHospital = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.hospital WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};

export const loginEmailPatient = async (email: string) => {
	const checkEmailQuery = "SELECT * FROM public.patient WHERE email = $1";

	const result = await pool.query(checkEmailQuery, [email]);
	return result;
};
