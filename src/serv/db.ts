
import mongodb = require("mongodb");
let server = new mongodb.Server("localhost", 27017);
let db = new mongodb.Db("clip", server, { w: 1 });
db.open(function() {} );

export interface Clip {
  _id: string;
  clipUrl: string;
  startTime: number;
  endTime: number;
}

export interface Comment {
  _id: mongodb.ObjectID;
  whatTime: number;
  time: string;
}

export interface Test {
  text: string;
}
export function addTest(title: string, callback: Function) {
    db.collection("test", function(error, test) {
        if (error) { console.error(error); return; }
        test.insert(
            {text: title},
            function (error, user) {
                if (error) { console.error(error); return; }
                callback();
            }
        );
    });
}
