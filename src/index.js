'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', contactRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log('Connected...', process.env.PORT);
});
