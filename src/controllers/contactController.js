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
            const contactData = yield (0, contactService_1.createOrUpdateContact)(email, phoneNumber);
            let primaryContact, secondaryContacts;
            if (contactData) {
                primaryContact = yield (0, contactService_1.getPrimaryContact)(email, phoneNumber);
                secondaryContacts = yield (0, contactService_1.getSecondaryContacts)(email, phoneNumber);
            }
            const contact = inflateContactDto(primaryContact, secondaryContacts);
            res.status(200).json({ contact });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.identifyContact = identifyContact;
function inflateContactDto(primaryContact, secondaryContacts) {
    const primarycontactId = primaryContact.dataValues.id;
    const secondaryContactIds = [];
    const emailsSet = new Set();
    const phoneNumbersSet = new Set();
    emailsSet.add(primaryContact.dataValues.email);
    phoneNumbersSet.add(primaryContact.dataValues.phoneNumber);
    secondaryContacts.forEach(element => {
        emailsSet.add(element.dataValues.email);
        phoneNumbersSet.add(element.dataValues.phoneNumber);
        secondaryContactIds.push(element.dataValues.id);
    });
    const emails = Array.from(emailsSet);
    const phoneNumbers = Array.from(phoneNumbersSet);
    return { primarycontactId, emails, phoneNumbers, secondaryContactIds };
}
