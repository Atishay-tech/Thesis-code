import mqtt from 'mqtt';
import {create} from 'ipfs-http-client';

import Contract  from 'web3-eth-contract';
import abi from './abi.json' assert { type: 'json' };

let count = 0;
let sum1 = 0;
let sum2 = 0;
let sum3 = 0;
let gas = 0;

// ipfs initialization
// const ipfs = create('/ip4/127.0.0.1/tcp/5001');
// async function WriteToIPFS(str) {
//     const hash = await ipfs.add(str);
//     return hash;
// };

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

// Blockchain initialization
Contract.setProvider('http://localhost:8545');
Contract.defaultAccount = '0x0929f78dCeF26968D56971Eb4D7f2BCbA73daE2d';
var myContract = new Contract (
    abi, '0x06256B075E5a72c5f2c63960cd46F421B9822DCd'    // contract address
);

// Write to blockchain
// async function SaveToChain(id, time, hash) {
//     await myContract.methods.recordHash(id, time, hash)
//     .send({from: Contract.defaultAccount})
//     .then(function(receipt) {
//         console.timeLog(time);
//         return true;
//     });
// }


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

    // write to ipfs
    // const hash = await WriteToIPFS(str);
    // const ipfs_write = performance.now();
    // console.timeLog(identifier);

    // write to chain
    myContract.methods.recordHash(id, time, data)
    .send({from: Contract.defaultAccount})
    .on('sent', function(result) {
        console.timeLog(identifier);
    })
    .on('confirmation', function(confirmation, receipt) {
        const chain_write = performance.now();

        if (confirmation == 1) {
            count += 1;
            // sum1 += ipfs_write - start;
            // sum2 += chain_write - ipfs_write;
            sum3 += chain_write - start;
            gas += receipt['gasUsed'];
        }

        if (confirmation==1 && count % 30 == 0) {
            console.log('Average: ', count, ' : ', sum1, sum2, sum3, gas);
        }

        if (confirmation < 4) {
            console.timeLog(identifier);
            console.log(confirmation, receipt['gasUsed']);
        }
        if (confirmation == 4) {
            console.timeEnd(identifier);
            console.log(confirmation, receipt['gasUsed']);
        }
    });
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
