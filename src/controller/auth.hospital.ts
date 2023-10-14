
import { Request, Response } from "express";
import {  signupService } from "../service/auth.hospital";

export default class signupHospital extends signupService {
   
    public signupHospitalUser = async (req: Request, res: Response) => {

      try {
      await this.signupHospital(req,res);
        
      } catch (error) {
        res.status(500).json({error:"internal server error"});
      }
    }


    public loginHospitaluser = async(req :Request, res: Response) => {
      try {
        await this.loginHospital(req,res);
      } catch (error) {
        res.status(500).json({error:"internal server error"});
      }
    }

    public signupPatientUser = async (req: Request, res: Response) => {
      try {
        await this.signupPatient(req,res);
      } catch (error) {
        res.status(500).json({error:"internal server error"});
      }
    }
}



export const signupPatient = async (req: Request, res: Response) => {
    console.log("patient signup");
}