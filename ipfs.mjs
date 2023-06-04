//const {create} = require('ipfs-http-client');
import {create} from 'ipfs-http-client';

const ipfs = create('/ip4/127.0.0.1/tcp/5001');
async function writeToIPFS(str) {
    const hash = await ipfs.add(str);
    return hash;
}

async function SendData(data) {
    const hash = await writeToIPFS(JSON.stringify(data));
    console.log(data, hash);
};

// const ipfsClient = require('ipfs-http-client')
// const ipfs = new ipfsClient({host: 'localhost', port: '5001', protocol: 'http'});

// const addFile = async function(data) {
//     const hash = await ipfs.a
// }