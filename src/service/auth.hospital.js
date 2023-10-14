"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupService = void 0;
const auth_hospital_1 = require("../queries/auth.hospital");
const uuid_1 = require("uuid");
const hashPassword_1 = require("../util/hashPassword");
class signupService {
    constructor() {
        this.signupHospital = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            const { name, phoneNumber, email, password, licenseId, capacity, longitude, latitude, address, status, } = req.body;
            // Check if the email is already registered
            const emailExists = yield (0, auth_hospital_1.isEmailExistInHospital)(email);
            if (emailExists.rows.length > 0) {
                return res.status(400).json({ message: "Email already registered" });
            }
            // Insert the new user into the database
            const id = (0, uuid_1.v4)();
            const hashedPassword = (0, hashPassword_1.hashPassword)(password);
            const newPassword = yield hashedPassword;
            console.log(newPassword);
            const newUser = yield (0, auth_hospital_1.insertIntoHospital)(id, name, phoneNumber, email, newPassword, licenseId, capacity, longitude, latitude, address, status);
            res
                .status(201)
                .json({ message: "Signup successful", user: newUser.rows[0] });
        });
        this.signupPatient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, phoneNumber, email, password, gender, address, emergencyContact, } = req.body;
            // Check if the email is already registered
            const emailExists = yield (0, auth_hospital_1.isEmailExistInPatient)(email);
            if (emailExists.rows.length > 0) {
                return res.status(400).json({ message: "Email already registered" });
            }
            // Insert the new user into the database
            const id = (0, uuid_1.v4)();
            const hashedPassword = (0, hashPassword_1.hashPassword)(password);
            const newPassword = yield hashedPassword;
            console.log("new->", newPassword);
            const newUser = yield (0, auth_hospital_1.insertIntoPatient)(id, name, phoneNumber, email, newPassword, gender, emergencyContact, address);
            res
                .status(201)
                .json({ message: "Signup successful", user: newUser.rows[0] });
        });
        this.loginHospital = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield (0, auth_hospital_1.loginEmailHospital)(email);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            const user = result.rows[0];
            // Compare the hashed password
            const passCompare = (0, hashPassword_1.comparePassword)(password, user.password);
            const isPasswordValid = yield passCompare;
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            return res.status(200).json({ message: 'Login successful' });
        });
    }
}
exports.signupService = signupService;
