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
        const seatingTimeTest = 18;
        let guestNumber = Number(req.query.guests);
        const maxBooking = 15;
        const selectedSeatingTime = yield booking_1.default.find();
        let seatingTimeResults = selectedSeatingTime.filter((selected) => seatingTimeTest === selected.seating);
        //  console.log('seatingTimeResults ', seatingTimeResults);
        // *** loop 1 = tid
        let numberOfTables = 1;
        let totalNumberOfTables = 0;
        let listOfDates = [];
        for (let i = 0; i < seatingTimeResults.length; i++) {
            let guests = seatingTimeResults[i].guests;
            let oneDate = seatingTimeResults[i].date;
            guests > 6 ? (numberOfTables = 2) : numberOfTables;
            // Ta reda på om ListofDate har ett objekt som har samma date som på rad 28. 
            const found = listOfDates.find(d => d.date.toString() === oneDate.toString());
            // Om JA, ta objekt i listOfDate och lägg på nrOfTables till IAvailable tables. 
            if (found) {
                found.tables += numberOfTables;
            }
            else {
                // OM NEJ, skapa ett objekt 
                listOfDates.push({
                    date: oneDate,
                    tables: numberOfTables,
                    isAvailable: true,
                });
            }
            // console.log(listOfDates)
        }
        console.log(listOfDates);
        res.status(200).json({ seatingTimeResults });
    }
    catch (error) {
        throw error;
    }
});
exports.getAvailability = getAvailability;
