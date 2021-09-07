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
        console.log('query id: ' + id);
        const selectedSeating = yield booking_1.default.find();
        let selectedDateResults = selectedSeating.filter((selected) => selected.date.toLocaleString('sv-SE').substring(0, 10) ===
            guestDate.substring(0, 10));
        let timeResults = selectedDateResults.filter((selected) => seatingTime === selected.seating);
        let numberOfTables = 1;
        let currentTables = 0;
        let newTables = 0;
        // let testingObject: {} = {};
        let isAvailable = {
            available: true,
        };
        for (let i = 0; i < timeResults.length; i++) {
            let guests = timeResults[i].guests;
            guests > 6 ? (numberOfTables = 2) : (numberOfTables = 1);
            guestNumber > 6 ? (newTables = 2) : (newTables = 1);
            let totalTables = (currentTables += numberOfTables);
            let totalTablesSameDateEdit = totalTables - newTables;
            // totalTablesSameDateEdit + newTables >= 16
            if (timeResults[i].id.toString() === id &&
                totalTablesSameDateEdit + newTables >= 16) {
                // totalTablesSameDateEdit + newTables >= 16
                //   ? (isAvailable.available = false)
                //   : (isAvailable.available = true);
                // console.log(timeResults[i].id.toString());
                // console.log(timeResults[i]);
                isAvailable.available = false;
                console.log('första if körs');
            }
            else if (totalTables + newTables >= 16) {
                isAvailable.available = false;
                console.log('andra if id: ' + timeResults[i].id.toString());
                console.log('query id: ' + id);
                console.log('andra if körs');
                // NÄR EN BOKNING PÅ SAMMA DAG ÄNDRAS TILL 2 från 1 bildas nytt id?!?!
                // console.log(timeResults[i].id.toString());
                //console.log(timeResults[i]);
                //console.log(id);
            }
            // if (totalTables + newTables >= 16) {
            //   isAvailable.available = false;
            // }
        }
        console.log(isAvailable);
        res.status(200).json(isAvailable);
    }
    catch (error) {
        throw error;
    }
});
exports.getEditAdmin = getEditAdmin;
