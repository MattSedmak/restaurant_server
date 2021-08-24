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
        let guestTime = Number(req.query.seating);
        const guestTimeTest = 18;
        let guestNumber = Number(req.query.guests);
        const maxBooking = 15;
        let availableArray = [];
        const availability = yield booking_1.default.find();
        availability.map((available) => {
            if (guestTimeTest === available.seating) {
                return available;
            }
        });
        res.status(200).json({ availableArray });
    }
    catch (error) {
        throw error;
    }
});
exports.getAvailability = getAvailability;
