import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";
import { signupService } from "../service/auth.hospital";
import { NextFunction } from "express-serve-static-core";
import * as dotenv from "dotenv";
import { isHospitalExistusingId } from "../queries/auth.hospital";
import { JwtPayload } from "../interfaces/auth.hospital";
dotenv.config({ path: `${__dirname}/.env` });
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
		

		try {
			const authorizationHeader = req.headers.authorization;
			if(authorizationHeader){
				const token = authorizationHeader.split(' ')[1];
				const payload =  jwt.verify(token, "cat-human-mat-mouse-dog-elephant-phone-id") as JwtPayload;

				console.log(payload);
				if(payload){

					const id = payload.userId;
					const result = await isHospitalExistusingId(id);

				const user = result.rows[0];
				if(user){
					res.status(200).json({ message: "authorized" });
				}
				   
				}

			}else{
				res.status(401).json({ error: "LogIn to access" });
			}

		} catch (error) {
			// Handle the error and return a response
			res.status(401).json({ error: "unauthorized" });
		}
	};
}

export const signupPatient = async (req: Request, res: Response) => {
	console.log("Patient signup");
};
