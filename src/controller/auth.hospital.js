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
exports.signupPatient = void 0;
const auth_hospital_1 = require("../service/auth.hospital");
class signupHospital extends auth_hospital_1.signupService {
    constructor() {
        super(...arguments);
        this.signupHospitalUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.signupHospital(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "internal server error" });
            }
        });
        this.loginHospitaluser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loginHospital(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "internal server error" });
            }
        });
        this.signupPatientUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.signupPatient(req, res);
            }
            catch (error) {
                res.status(500).json({ error: "internal server error" });
            }
        });
    }
}
exports.default = signupHospital;
const signupPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("patient signup");
});
exports.signupPatient = signupPatient;
