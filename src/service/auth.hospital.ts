import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import {
	insertIntoHospital,
	insertIntoPatient,
	isEmailExistInHospital,
	isEmailExistInPatient,
	loginEmailHospital,
	loginEmailPatient,
} from "../queries/auth.hospital";
import {
	hospitalUser,
	loginUser,
	patientUser,
} from "../interfaces/auth.hospital";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "../util/hashPassword";
// import { userInfo } from "os";
// import { json } from "body-parser";
export class signupService {
	//---------------------------------------------------------------------------
	public createSendtoken = async (
		userId: string,
		res: Response,
		data: Record<string, any>
	) => {
		if (!process.env.JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined");
		}
		const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		//these are the cookie options...
		const cookieOptions = {
			//converting into ms
			expiresIn: new Date(
				Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60
			),
			//this will prevent the browser from accessing the cookie and make it transportOnly
			httpOnly: true,
		};
		res.status(201).json({ data, token: token });
	};

	public signupHospital = async (req: Request, res: Response) => {
		// console.log(req.body);
		const {
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
		}: hospitalUser = req.body;

		// Check if the email is already registered
		const emailExists = await isEmailExistInHospital(email);
		if (emailExists.rows.length > 0) {
			return res.status(400).json({ message: "Email already registered" });
		}

		// Insert the new user into the database
		const id: string = uuidv4();
		const hashedPassword = hashPassword(password);
		const newPassword: string = await hashedPassword;

		const newUser = await insertIntoHospital(
			id,
			name,
			phoneNumber,
			email,
			newPassword,
			licenseId,
			capacity,
			longitude,
			latitude,
			address,
			status
		);

		this.createSendtoken(id, res, {
			message: "Successfully Created",
			user: newUser.rows[0],
		});
	};

	public signupPatient = async (req: Request, res: Response) => {
		const {
			name,
			phoneNumber,
			email,
			password,
			gender,
			address,
			emergencyContact,
		}: patientUser = req.body;

		// Check if the email is already registered
		const emailExists = await isEmailExistInPatient(email);
		if (emailExists.rows.length > 0) {
			return res.status(400).json({ message: "Email already registered" });
		}

		// Insert the new user into the database
		const id: string = uuidv4();
		const hashedPassword = hashPassword(password);
		const newPassword: string = await hashedPassword;

		const newUser = await insertIntoPatient(
			id,
			name,
			phoneNumber,
			email,
			newPassword,
			gender,
			emergencyContact,
			address
		);
		this.createSendtoken(id, res, {
			message: "Successfully Registered",
			user: newUser.rows[0],
		});
	};

	public loginHospital = async (req: Request, res: Response) => {
		const { email, password }: loginUser = req.body;

		const result = await loginEmailHospital(email);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		const user = result.rows[0];

		// Compare the hashed password
		const passCompare = comparePassword(password, user.password);
		const isPasswordValid = await passCompare;
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid password" });
		}
		this.createSendtoken(user.id, res, {
			message: "Successfully Logged In",
			user: user,
		});
	};
	public loginPatient = async (req: Request, res: Response) => {
		const { email, password }: loginUser = req.body;

		const result = await loginEmailPatient(email);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		const user = result.rows[0];

		// Compare the hashed password
		const passCompare = comparePassword(password, user.password);
		const isPasswordValid = await passCompare;
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid password" });
		}
		this.createSendtoken(user.id, res, {
			message: "Successfully Logged In",
			user: user,
		});
	};
}
