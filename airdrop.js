var fs = require('fs');
var csv = require('fast-csv');
var BigNumber = require('bignumber.js');
var net = require('net');
var Web3 = require('web3');

//change this
var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/HWD664IgvClfn5FNgpVw'),net);//'https://mainnet.infura.io/{{TOKEN}}'


var Tx = require('ethereumjs-tx');
var startTime;
var endTime;
// Reading from csv File and push into transferAddress array
let allocData = new Array(); 
let sentLogs = new Array();

let ENOUGH_TOKEN = "Don't have enough token to make this transaction";
let ENOUGH_ETHER = "Don't have enough ether to make this transaction";

//change this
var contractAddress = '0x60520276d1dFfF4B36F1A5f4F628af4c0C209fe9';
var contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_NAME","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_RESERVED_PERSENTAGE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"cancelOwnershipTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_SYMBOL","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reclaimTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenConversionFactor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_DECIMALS","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"BOARD_RESERVED_YEARS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"TOKEN_TOTALSUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DECIMALSFACTOR","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_RESERVED","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"BOARD_RESERVED","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"BOARD_RESERVED_PERSENTAGE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_proposedOwner","type":"address"}],"name":"initiateOwnershipTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"publicReservedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposedOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"publicReservedToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"completeOwnershipTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"TokensReclaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_proposedOwner","type":"address"}],"name":"OwnershipTransferInitiated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnershipTransferCompleted","type":"event"},{"anonymous":false,"inputs":[],"name":"OwnershipTransferCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
var contractObj = new web3.eth.Contract(contractABI, contractAddress);

//change this 
const address = '0xe43900EAa68801E961baE2904D5E09aDa989eB04';
const privateKey = '17dab1234643a8ae3bb5688e2e284aa5dfd9a035e24626217aee0690ad590845';

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
        
        let balance = await contractObj.methods.balanceOf(address).call();
        console.log("=======balance after sending ==============",await web3.utils.fromWei(balance,'ether'));    
  
    }
    endTime = Date.now()
    var elapsed = (endTime-startTime)/1000;
    console.log("It took "+elapsed+" seconds to complete");
    writeMe();
    
}

async function transferToken(walletAddress, amount) {
    return new Promise(async(resolve, reject) => {
        try {
            
            var balance = await contractObj.methods.balanceOf(address).call();
            console.log("=======balance before sending ==============",await web3.utils.fromWei(balance,'ether'))
            var finalToken = amount*1e+18;
            if (+balance < +finalToken) {
                resolve([null, ENOUGH_TOKEN]);
            } else {
                let sentObject = {}
                var data = contractObj.methods.transfer(walletAddress, finalToken).encodeABI();
                signTransaction(data, resolve, reject).then(function(){
                     sentObject['address'] = walletAddress;
                     sentObject['token'] = amount;
                     sentLogs.push(sentObject);
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

async function signTransaction(functionData, resolve, reject) {
    try {
        var gasObj = {
            to: contractAddress,
            from: address,
            data: functionData
        };

        var nonce;
        var gasPrice;
        var gasEstimate;
        var balance;
        try {
            nonce = await web3.eth.getTransactionCount(address);
            gasPrice = await web3.eth.getGasPrice();
            gasEstimate = await web3.eth.estimateGas(gasObj);
            balance = await web3.eth.getBalance(address);
        } catch (e) {
            console.log(e);
        }
        if (+balance < (+gasEstimate * +gasPrice)) {
            resolve([null, ENOUGH_ETHER]);
        } else {
            var tx = new Tx({
                to: contractAddress,
                nonce: +nonce,
                gasPrice: web3.utils.toHex(gasPrice),
                gasLimit: web3.utils.toHex(gasEstimate),
                data: functionData
            });
            tx.sign(new Buffer(privateKey, 'hex'));
            web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
                .on('transactionHash', function (hash) {
                    console.log(hash);
                })
                .on('receipt', function (receipt) {
                    resolve([receipt]);
                })
                .on('confirmation', function (confirmationNumber, receipt) {

                })
                .on('error', function (error) {
                    try {
                        console.log(error);
                        var data = error.message.split(':\n', 2);
                        if (data.length == 2) {
                            var transaction = JSON.parse(data[1]);
                            transaction.messesge = data[0];
                            return resolve([transaction]);
                        }
                        reject(error);
                    } catch (e) {
                        reject(e);
                    }
                });
        }
    } catch (e) {
        reject(e);
    }
}

web3.eth.net.isListening(function (err, res) {
    if (err)
        console.log(err)
    else
        init();
});



async function init() {
    try {
        console.log('Started')
        startTime = Date.now()
        readFile()
        .then((allocData) => {
            asyncForEach(allocData, async(each) => {
                let [data,err] = await transferToken(each.address,each.token);
                if (err) {
                    console.error("Error", err);
                } else {
                    console.log("Success", data);
                }
            });
        });
         
     }catch (e) {
        console.error(e);
    }
        
}


let count = 0;
function readFile() {
  return new Promise((resolve, reject) => {
    var stream = fs.createReadStream("distribute.csv");
    var csvStream = csv()
    .on("data", function(data){
    
      if(count > 0) {          
      let mapObject = {};
      let isAddress = web3.utils.isAddress(data[0]);
          if(isAddress && data[0]!=null && data[0]!='' ){
            console.log(data[0]);

            data[1] = parseFloat(data[1]);
            if(data[1]!='' && data[1]!=null && data[1]>0){
                    console.log(data[1]);            
                    mapObject['address'] = data[0];
                    mapObject['token'] = data[1];
                    allocData.push(mapObject);
             }
          }
        }
        count++;
    })
    .on("end", function(){
         console.log("done");
         console.log(allocData)
        // printFile();
         resolve(allocData);
    });
 
    stream.pipe(csvStream);
  });

}

console.log(`
--------------------------------------------
------------- Parsing csv file -------------
--------------------------------------------
******** Removing beneficiaries without tokens or address data
--------------------------------------------
-------------------------------------------
`);


///Writing the array into a csv file 
var csvWriter = require('csv-write-stream')
var writer = csvWriter({ headers: ["address","token"]})
writer.pipe(fs.createWriteStream('log.csv'))

function writeMe(){
    console.log("sentLogs.length",sentLogs.length)
    sentLogs.forEach(function (arrayItem) {
        writer.write({address: arrayItem.address,token:arrayItem.token})
  });
  writer.end() 
}