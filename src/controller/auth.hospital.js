"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signupPatient = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const auth_hospital_1 = require("../service/auth.hospital");
class SignupHospital extends auth_hospital_1.signupService {
    constructor() {
        super(...arguments);
        this.signupHospitalUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.signupHospital(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.loginHospitaluser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loginHospital(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.signupPatientUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.signupPatient(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.loginPatientUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loginPatient(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.protect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let token;
            try {
                // Getting the token & Checking if it is there with the header
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith("Bearer")) {
                    token = req.headers.authorization.split(" ")[1];
                }
                else if (req.cookies.jwt) {
                    // To check for the jwt in cookie
                    token = req.cookies.jwt;
                }
                else {
                    throw new Error("You are not logged in; please login to get access");
                }
                if (!process.env.JWT_SECRET) {
                    throw new Error("Misssing JWT_SECRET");
                }
                // Verification of Token
                const payload = yield jwt.verify(token, process.env.JWT_SECRET);
                // Continue with the next middleware or route handler
                res.status(200).json({ message: "Authorized" });
            }
            catch (error) {
                // Handle the error and return a response
                res.status(401).json({ error: "Unauthorized" });
            }
        });
    }
}
exports.default = SignupHospital;
const signupPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Patient signup");
});
exports.signupPatient = signupPatient;
