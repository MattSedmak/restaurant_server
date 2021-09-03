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
        const selectedSeating = yield booking_1.default.find();
        let selectedDateResults = selectedSeating.filter((selected) => selected.date.toLocaleString('sv-SE').substring(0, 10) ===
            guestDate.substring(0, 10));
        let timeResults = selectedDateResults.filter((selected) => seatingTime === selected.seating);
        let numberOfTables = 1;
        let totalTables = 0;
        let currentGuests = 0;
        let isAvailable = {
            available: true,
        };
        for (let i = 0; i < timeResults.length; i++) {
            let guests = timeResults[i].guests;
            guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
            guestNumber > 6 ? (currentGuests = 2) : (currentGuests = 1);
            totalTables += numberOfTables;
            console.log('isavailable ', isAvailable);
            if (totalTables + currentGuests >= 15) {
                console.log(isAvailable);
                isAvailable.available = false;
            }
        }
        // console.log(isAvailable);
        res.status(200).json(isAvailable);
    }
    catch (error) {
        throw error;
    }
});
exports.getEditAdmin = getEditAdmin;
