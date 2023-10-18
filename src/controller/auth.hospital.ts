import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";
import { signupService } from "../service/auth.hospital";
import { NextFunction } from "express-serve-static-core";

export default class SignupHospital extends signupService {
	public signupHospitalUser = async (req: Request, res: Response) => {
		try {
			await this.signupHospital(req, res);
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	};

	public loginHospitaluser = async (req: Request, res: Response) => {
		try {
			await this.loginHospital(req, res);
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	};

	public signupPatientUser = async (req: Request, res: Response) => {
		try {
			await this.signupPatient(req, res);
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	};

	public loginPatientUser = async (req: Request, res: Response) => {
		try {
			await this.loginPatient(req, res);
		} catch (error) {
			res.status(500).json({ error: "Internal server error" });
		}
	};

	public protect = async (req: Request, res: Response, next: NextFunction) => {
		let token;

		try {
			// Getting the token & Checking if it is there with the header
			if (
				req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")
			) {
				token = req.headers.authorization.split(" ")[1];
			} else if (req.cookies.jwt) {
				// To check for the jwt in cookie
				token = req.cookies.jwt;
			} else {
				throw new Error("You are not logged in, please login to get access");
			}

			if (!process.env.JWT_SECRET) {
				throw new Error("Misssing JWT_SECRET");
			}

			// Verification of Token
			const payload = await jwt.verify(token, process.env.JWT_SECRET);

			// Continue with the next middleware or route handler
			next();
		} catch (error) {
			// Handle the error and return a response
			res.status(401).json({ error: "Unauthorized" });
		}
	};
}

export const signupPatient = async (req: Request, res: Response) => {
	console.log("Patient signup");
};
