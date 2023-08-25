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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateContact = void 0;
const contact_1 = __importDefault(require("../models/contact"));
const createOrUpdateContact = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    let existingContactWithEmail, existingContactWithPhone, existingContact;
    if (email) {
        existingContactWithEmail = yield findByEmailOrPhone(email, null);
    }
    if (phoneNumber) {
        existingContactWithPhone = yield findByEmailOrPhone(null, phoneNumber);
    }
    if (existingContactWithEmail && existingContactWithPhone) {
        if (existingContactWithEmail.dataValues.id !== existingContactWithPhone.dataValues.id) {
            // change primary to secondary
        }
    }
    else if (existingContactWithEmail) {
        existingContact = existingContactWithEmail;
    }
    else if (existingContactWithPhone) {
        existingContact = existingContactWithPhone;
    }
    console.log('existing contact :', existingContact);
    if (existingContact) {
        if (email && existingContact.dataValues.email !== email) {
            yield createSecondaryContact(existingContact.dataValues.id, existingContact.dataValues.phoneNumber, email, 'email');
        }
        if (phoneNumber && existingContact.dataValues.phoneNumber !== phoneNumber) {
            yield createSecondaryContact(existingContact.dataValues.id, existingContact.dataValues.email, phoneNumber, 'phoneNumber');
        }
    }
    else {
        existingContact = yield createPrimaryContact(email, phoneNumber);
    }
    return existingContact;
});
exports.createOrUpdateContact = createOrUpdateContact;
const findByEmailOrPhone = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const whereClause = {};
    if (email) {
        whereClause.email = email;
    }
    else if (phoneNumber) {
        whereClause.phoneNumber = phoneNumber;
    }
    whereClause.linkPrecedence = 'primary';
    return contact_1.default.findOne({
        where: whereClause,
        order: [['createdAt', 'ASC']]
    });
});
const createPrimaryContact = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return contact_1.default.create({
        email,
        phoneNumber,
        linkPrecedence: 'primary',
    });
});
const createSecondaryContact = (primaryContactId, existingContactInfo, value, type) => __awaiter(void 0, void 0, void 0, function* () {
    const existingContactInfoType = (type === 'email') ? 'phoneNumber' : 'email';
    console.log(existingContactInfoType, type);
    return contact_1.default.create({
        [type]: value,
        [existingContactInfoType]: existingContactInfo,
        linkedId: primaryContactId,
        linkPrecedence: 'secondary',
    });
});
const updateToSecondary = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
});
