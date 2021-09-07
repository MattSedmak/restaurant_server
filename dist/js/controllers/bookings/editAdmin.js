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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditAdmin = void 0;
const booking_1 = __importDefault(require("../../models/booking"));
const getEditAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let seatingTime = Number(req.query.seating);
        let guestNumber = Number(req.query.guests);
        let guestDate = String(req.query.date);
        let id = String(req.query.id);
        const selectedSeating = yield booking_1.default.find();
        let selectedDateResults = selectedSeating.filter((selected) => selected.date.toLocaleString('sv-SE').substring(0, 10) ===
            guestDate.substring(0, 10));
        let timeResults = selectedDateResults.filter((selected) => seatingTime === selected.seating);
        let numberOfTables = 1;
        let currentTables = 0;
        let newTables = 0;
        let isAvailable = {
            available: true,
        };
        let totalTables = 0;
        for (let i = 0; i < timeResults.length; i++) {
            let guests = timeResults[i].guests;
            guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
            guestNumber > 6 ? (newTables = 2) : (newTables = 1);
            totalTables = currentTables += numberOfTables;
        }
        let foundOwnBooking = false;
        let tablesFromCurrentBooking = 0;
        for (let i = 0; i < timeResults.length; i++) {
            if (timeResults[i].id.toString() === id) {
                foundOwnBooking = true;
                tablesFromCurrentBooking = Math.ceil(timeResults[i].guests / 6);
            }
        }
        if (foundOwnBooking) {
            if (totalTables - tablesFromCurrentBooking + newTables >= 16) {
                isAvailable.available = false;
                foundOwnBooking = true;
            }
        }
        else {
            if (totalTables + newTables >= 16) {
                isAvailable.available = false;
            }
        }
        res.status(200).json(isAvailable);
    }
    catch (error) {
        throw error;
    }
});
exports.getEditAdmin = getEditAdmin;
