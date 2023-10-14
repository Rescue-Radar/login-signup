import express from 'express';
// import { signupHospital, signupPatient } from '../controller/signup.hospital';
import signupHospital from '../controller/auth.hospital';
import  {validateHospitalRequiredFields, validateLogin, validatePatientRequiredFields } from '../middlewares/signup.middleware';
 const {signupHospitalUser,signupPatientUser,loginHospitaluser} = new signupHospital();
const router = express.Router();

router.post("/h/signup",validateHospitalRequiredFields,signupHospitalUser);
router.post("/h/login",validateLogin,loginHospitaluser);
router.post("/p/signup",validatePatientRequiredFields,signupPatientUser);




export default router;