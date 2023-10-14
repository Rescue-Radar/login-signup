import { Request, Response } from "express";
import {
  insertIntoHospital,
  insertIntoPatient,
  isEmailExistInHospital,
  isEmailExistInPatient,
  loginEmailHospital,
} from "../queries/auth.hospital";
import { hospitalUser, loginUser, patientUser } from "../interfaces/auth.hospital";
import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "../util/hashPassword";
export class signupService {
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
    console.log(newPassword);

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
    res
      .status(201)
      .json({ message: "Signup successful", user: newUser.rows[0] });
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
    console.log("new->",newPassword);

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
    res
      .status(201)
      .json({ message: "Signup successful", user: newUser.rows[0] });
  };


  public loginHospital = async (req: Request, res: Response) => {


    const { email, password }:loginUser = req.body;
    
    const result = await loginEmailHospital(email);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Compare the hashed password
    const  passCompare =  comparePassword(password, user.password);
    const isPasswordValid = await passCompare;
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful' });

  }
}
