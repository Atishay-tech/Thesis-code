import mqtt from 'mqtt';
import GUN from 'gun';
//import { urlSource } from 'ipfs-http-client/dist/src';

// mqtt initialization
const broker_port = 1883;
const broker_host = 'localhost';

var mqtt_options = {
    port: broker_port,
    host: broker_host
};

let count = 0;
let sum1 = 0;
let sum2 = 0;

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

//localStorage.clear();
var gun = GUN({
    peers: ['http://localhost:8765/gun'],
    radisk: false
});
const user = gun.get('user');

// main execution function
async function SendData(message) {
    // parse the message
    const obj = JSON.parse(message);
    // const str = message.toString();

    //console.log(obj["id"], obj["time"]);
    const id = obj["id"];
    const time = obj["time"];
    // const data = obj["data"];
    const data = '0';

    const identifier = id + ' [' + time + ']';

    const start = performance.now();
    console.time(identifier);

    user.get(identifier).put(obj);
    
    user.get(identifier).on(data => {
        console.timeEnd(identifier);
        const written = performance.now();
        count += 1;
        sum1 += written-start;
        if (count%30 == 0) {
            console.log("Reading", count, sum1);
        }
    });
}

mqtt_client.on('message', function(topic, message) {
    //console.log('Sent');
    SendData(message);
});


process.on("SIGINT", () => {
    mqtt_client.end();
    console.log('Closed');
    process.exit(0);
});
