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
        let newArray = [];
        const selectedSeatingTime = yield booking_1.default.find();
        let seatingTimeResults = selectedSeatingTime.filter((selected) => seatingTimeTest === selected.seating);
        console.log(seatingTimeResults);
        // const nDate = new Date();
        // const count = seatingTimeResults.reduce(
        //   (acc, cur) => (cur.date === nDate ? ++acc : acc),
        //   0
        // );
        // alla results har samma tid. Vi vill räkna ut hur många objekt har samma datum.
        // 15st === fullt.
        // guestnumber (1-6) === 1 booking
        // guestnumber (7-12) === 2 bokkings
        res.status(200).json({ seatingTimeResults });
    }
    catch (error) {
        throw error;
    }
});
exports.getAvailability = getAvailability;
