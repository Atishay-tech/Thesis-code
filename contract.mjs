// import { default as web3 } from 'web3';
import Contract  from 'web3-eth-contract';
import abi from './abi.json' assert { type: 'json' };
// import { default as HDWalletProvider } from '@truffle/hdwallet-provider'

// let ganacheDetails = {
//     chainAddress: 'http://127.0.0.1:7545',
//     publicKey: '0xBEc31B5C3a960C960915879e0af402BA56C42295',
//     contractAddress: '0xCC251E11cFa03240dc7cC4dE372E6eD0A523700D',
//     get provider() {
//         return new Web3.providers.HttpProvider(this.chainAddress);
//     },
// };

console.log(abi);

//web3.eth.setProvider('http://localhost:8545');
Contract.setProvider('http://localhost:8545');
Contract.defaultAccount = '0x0A5837749698a179221f61FdA6D5e06541A50698';
var myContract = new Contract(
    abi, '0x19F0F81642b9e60416e04B9DD703A2c6Dc26F248'    // contract address
);

myContract.methods.store(117).send({from: Contract.defaultAccount})
.on('confirmation', function(confirmation, receipt) {
    console.log(confirmation, receipt);
    myContract.methods.retrieve().call()
    .then(function(receipt) {
        console.log(receipt);
    });
});