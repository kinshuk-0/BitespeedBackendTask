'use strict'

import { Request, Response } from 'express'
import { createOrUpdateContact, getPrimaryContact, getSecondaryContacts } from '../services/contactService'
import { Model } from 'sequelize'
import { ContactDto } from '../dto/contactDto'
export const identifyContact = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body

    if(!phoneNumber && !email) {
        res.status(400).json({ 'message': 'bad request'})
    } else {

        const contactData = await createOrUpdateContact(email, phoneNumber)

        let primaryContact,
            secondaryContacts

        if(contactData) {
            primaryContact    = await getPrimaryContact(email, phoneNumber)
            secondaryContacts = await getSecondaryContacts(email, phoneNumber)
        }

        const contact = inflateContactDto(primaryContact!!, secondaryContacts!!)

        res.status(200).json( {contact} )
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

function inflateContactDto(primaryContact: Model<any, any>, secondaryContacts: Model<any, any>[]): ContactDto {
    const primaryContatctId: number = primaryContact.dataValues.id

    const secondaryContactIds: number[] = []

    const emailsSet       = new Set<string>()
    const phoneNumbersSet = new Set<string>()

    emailsSet.add(primaryContact.dataValues.email)
    phoneNumbersSet.add(primaryContact.dataValues.phoneNumber)

    secondaryContacts.forEach(element => {
        emailsSet.add(element.dataValues.email)
        phoneNumbersSet.add(element.dataValues.phoneNumber)
        secondaryContactIds.push(element.dataValues.id)
    });

    const emails             : string[] = Array.from(emailsSet)
    const phoneNumbers       : string[] = Array.from(phoneNumbersSet)

    return {primaryContatctId, emails, phoneNumbers, secondaryContactIds} 
}