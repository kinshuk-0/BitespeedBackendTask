'use strict'

import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/db'

const Contact = sequelize.define('contact',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linkedId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    linkPrecedence: {
        type: DataTypes.ENUM('primary', 'secondary'),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
})

export default Contact