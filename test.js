var fs = require('fs');
var csv = require('fast-csv');
var BigNumber = require('bignumber.js');
var net = require('net');
var Web3 = require('web3');

//change this
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'),net);

// Reading from csv File and push into transferAddress array
let allocData = new Array(); 
let sentLogs = new Array();


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
readFile()