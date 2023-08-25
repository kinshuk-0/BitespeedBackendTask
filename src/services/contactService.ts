'use strict'

import Contact from '../models/contact'

const createOrUpdateContact = async (email: string | null, phoneNumber: string | null) => {

    let existingContactWithEmail,
        existingContactWithPhone,
        existingContact

    if(email) {
        existingContactWithEmail = await findByEmailOrPhone(email, null)
    }
    if(phoneNumber) {
        existingContactWithPhone = await findByEmailOrPhone(null, phoneNumber)
    }

    if(existingContactWithEmail && existingContactWithPhone) {
        if(existingContactWithEmail.dataValues.id !== existingContactWithPhone.dataValues.id) {
            updateToSecondary(existingContactWithPhone.dataValues.id, existingContactWithEmail.dataValues.id)
        }

        return await findByEmailOrPhone(email, null)
    } else if(existingContactWithEmail) {
        existingContact = existingContactWithEmail
    } else if(existingContactWithPhone){
        existingContact = existingContactWithPhone
    }
    
    console.log('existing contact :', existingContact)

    if (existingContact) {
        if (email && existingContact.dataValues.email !== email) {
            await createSecondaryContact(existingContact.dataValues.id, existingContact.dataValues.phoneNumber, email, 'email')
        }
        if (phoneNumber && existingContact.dataValues.phoneNumber !== phoneNumber) {
            await createSecondaryContact(existingContact.dataValues.id, existingContact.dataValues.email, phoneNumber, 'phoneNumber')
        }
    } else {
        existingContact = await createPrimaryContact(email, phoneNumber)
    }
  
    return existingContact
}
  
const findByEmailOrPhone = async (email: string | null, phoneNumber: string | null) => {
    const whereClause: any = {}
    if (email) {
        whereClause.email = email
    } else if (phoneNumber) {
        whereClause.phoneNumber = phoneNumber
    }

    whereClause.linkPrecedence = 'primary'

    return Contact.findOne({
        where: whereClause,
        order: [['createdAt', 'ASC']]
    })
}
  
const createPrimaryContact = async (email: string | null, phoneNumber: string | null) => {
    return Contact.create({
        email,
        phoneNumber,
        linkPrecedence: 'primary',
    })
}
  
const createSecondaryContact = async (primaryContactId: number, existingContactInfo: string, value: string, type: 'email' | 'phoneNumber') => {
    const existingContactInfoType = (type === 'email') ? 'phoneNumber' : 'email'

    console.log(existingContactInfoType, type)

    return Contact.create({
        [type]                    : value,
        [existingContactInfoType] : existingContactInfo,
        linkedId                  : primaryContactId,
        linkPrecedence            : 'secondary',
    })
}

const updateToSecondary = async (id: number, linkedId: number) => {
    Contact.update({
        linkedId        : linkedId,
        linkPrecedence  : 'secondary',
        modifiedAt      : new Date()
    }, 
    {
        where: {id: id, linkPrecedence: 'primary'}
    })
}
  
export { createOrUpdateContact }