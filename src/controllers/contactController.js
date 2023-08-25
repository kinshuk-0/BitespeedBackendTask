'use strict';
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
exports.identifyContact = void 0;
const contactService_1 = require("../services/contactService");
const identifyContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phoneNumber } = req.body;
        if (!phoneNumber && !email) {
            res.status(400).json({ 'message': 'bad request' });
        }
        else {
            const whereClause = {};
            if (email) {
                whereClause.email = email;
            }
            else if (phoneNumber) {
                whereClause.phoneNumber = phoneNumber;
            }
            whereClause.linkPrecedence = 'primary';
            console.log(whereClause);
            const contact = (0, contactService_1.createOrUpdateContact)(email, phoneNumber);
            res.status(200).json({ 'contactData': 'success' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.identifyContact = identifyContact;
