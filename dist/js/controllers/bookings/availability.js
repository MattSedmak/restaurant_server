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
exports.getAvailability = void 0;
const booking_1 = __importDefault(require("../../models/booking"));
const getAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let seatingTime = Number(req.query.seating);
        let guestNumber = Number(req.query.guests);
        const selectedSeatingTime = yield booking_1.default.find();
        let seatingTimeResults = selectedSeatingTime.filter((selected) => seatingTime === selected.seating);
        let numberOfTables = 1;
        let requestedTables = 1;
        let listOfDates = [];
        for (let i = 0; i < seatingTimeResults.length; i++) {
            let guests = seatingTimeResults[i].guests;
            let oneDate = seatingTimeResults[i].date;
            guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
            guestNumber > 6 ? (requestedTables = 2) : (requestedTables = 1);
            const found = listOfDates.find((d) => d.date.toLocaleString().substring(0, 10) ===
                oneDate.toLocaleString().substring(0, 10));
            if (found) {
                let tableCheck = (found.tables += numberOfTables);
                let test = tableCheck + requestedTables;
                test >= 16 ? (found.isAvailable = false) : (found.isAvailable = true);
            }
            else {
                listOfDates.push({
                    date: oneDate,
                    tables: numberOfTables,
                    isAvailable: true,
                });
            }
        }
        res.status(200).json(listOfDates);
    }
    catch (error) {
        throw error;
    }
});
exports.getAvailability = getAvailability;
