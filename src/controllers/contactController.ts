'use strict'

import { Request, Response } from 'express'
import { createOrUpdateContact } from '../services/contactService'

export const identifyContact = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber } = req.body

    if(!phoneNumber && !email) {
        res.status(400).json({ 'message': 'bad request'})
    } else {

        const whereClause: any = {}
    if (email) {
        whereClause.email = email
    } else if (phoneNumber) {
        whereClause.phoneNumber = phoneNumber
    }

    whereClause.linkPrecedence = 'primary'

    console.log(whereClause)
        const contact = createOrUpdateContact(email, phoneNumber)

        res.status(200).json( {'contactData': 'success'} )
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}