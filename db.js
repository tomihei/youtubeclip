"use strict";
const mongodb = require("mongodb");
let server = new mongodb.Server("localhost", 27017);
let db = new mongodb.Db("clip", server, { w: 1 });
db.open(function () { });
function addTest(title, callback) {
    db.collection("test", function (error, test) {
        if (error) {
            console.error(error);
            return;
        }
        test.insert({ text: title }, function (error, user) {
            if (error) {
                console.error(error);
                return;
            }
            callback();
        });
    });
}
exports.addTest = addTest;
