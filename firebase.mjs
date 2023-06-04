import mqtt from 'mqtt';

import {initializeApp} from "firebase/app"
import {child, getDatabase, ref, set, get} from "firebase/database";

let count = 0;
let sum1 = 0;
let sum2 = 0;
let sum3 = 0;
let gas = 0;


// mqtt initialization
const broker_port = 1883;
const broker_host = 'localhost';

var mqtt_options = {
    port: broker_port,
    host: broker_host
};

// mqtt connect
const mqtt_client = mqtt.connect(mqtt_options);
const mqtt_topic = 'data';
mqtt_client.on('connect', function() {
    mqtt_client.subscribe(mqtt_topic, function(err) {
        if (err) {
            console.log('Could not subscribe');
        } else {
            console.log('Subscribed');
        }
    });
});

//Firebase initialization
const firebasConfig = {
    databaseURL: "https://iot-us-default-rtdb.firebaseio.com/",
}


const ddata = `
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
{"id": "$Client_ID-SYSTEMVARIABLE", "time": "$Current_time-SYSTEMVARIABLE", "modifier": "1-100-RANGE", "data": "{ \"data1\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data2\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data3\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 },\"data4\": { \"co\": 0.006104480269226063, \"humidity\": 55.099998474121094, \"light\": true, \"lpg\": 0.008895956948783413, \"motion\": false, \"smoke\": 0.023978358312270912, \"temp\": 31.799999237060547 }, \"temp1\": hello, \"temp2\": bye, \"temp3\":temp, \"device_id\": \"6e:81:c9:d4:9e:58\", \"ts\": 1594419195.292461, }-CONSTANT"}
`;


// main execution function
async function SendData(message) {

    const time = new Date();
    
    // parse the message
    const obj = JSON.parse(message);
    // const str = message.toString();

    //console.log(obj["id"], obj["time"]);
    const id = obj["id"];
    //const time = obj["time"];
    // const data = obj["data"];

    const identifier = id + ' ' + time;
    const data = ddata+identifier;

    const start = performance.now();
    console.time(identifier);


const app = initializeApp(firebasConfig);
const database = getDatabase(app);
    //write to firebase
    set(ref(database, '/'+identifier), {
        identifier: data,
    })
    .then(() => {
        const chain_write = performance.now();
        count += 1;
        sum3 += chain_write-start;
        console.timeEnd(identifier);

        if (count %30 == 0) {
            console.log('Average: ', count, ' : ', sum3);
        }
    })
    .catch((error) => {
        console.log("Error");
    });

    // read from database
    // const dbRef = ref(database, '/');

    // get(child(dbRef, `6 Wed May 24 2023 00:05:17 GMT+0530 (India Standard Time)`))
    // .then((snapshot) => {
    //     if (snapshot.exists()) {

    //     const chain_write = performance.now();
    //     count += 1;
    //     sum3 += chain_write-start;
    //     console.timeEnd(identifier);

    //         if (count %10 == 0) {
    //         console.log('Average: ', count, ' : ', sum3);
    //     }

    //         //console.log("Success");
    //         //console.log(snapshot.val());
    //     } else {
    //         console.log("No data available");
    //     }
    // })
    // .catch((error) => {
    //     console.log("Error");
    // });

    // console.time(identifier+' ');
    // get(child(dbRef, `6 Wed May 24 2023 00:09:02 GMT+0530 (India Standard Time)`))
    // .then((snapshot) => {
    //     if (snapshot.exists()) {

    //     const chain_write = performance.now();
    //     count += 1;
    //     sum3 += chain_write-start;
    //     console.timeEnd(identifier+' ');

    //         if (count %10 == 0) {
    //         console.log('Average: ', count, ' : ', sum3);
    //     }

    //         //console.log("Success");
    //         //console.log(snapshot.val());
    //     } else {
    //         console.log("No data available");
    //     }
    // })
    // .catch((error) => {
    //     console.log("Error");
    // });
}


mqtt_client.on('message', function(topic, message) {
    console.log('sent');
    SendData(message);
});

process.on("SIGINT", () => {
    mqtt_client.end();
    console.log('Closed');
    process.exit(0);
});
