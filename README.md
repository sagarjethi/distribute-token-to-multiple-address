# TokenDisttibution
A script to automate the token transfer to multiple addressess.

Airdrop.js is a node.js script performs an automatic token distribution/airdrop to a list of Ethereum addresses. 

distribute.csv is a csv file wherein the first column has the list of addressess and the column has the number of tokens to be sent.

log.csv is the output file which logs all the addressess to which the tokens has been sent successfully. 

Set up
Prerequisite:
Node v8
Npm v5

Run the commands below to set up a brand new project and install the required dependencies:

$ git clone https://github.com/sagarjethi/distribute-token-to-multiple-address.git
$ cd distribute-token-to-multiple-address
$ npm init
$ npm install bignumber.js csv-write-stream ethereumjs-tx fast-csv web3@1.0.0-beta.34  --save

 
Changes to be Made in the Script :
I have commented *//change this* all the lines where changes needs to be done. 

Change the URL in lineNo:8 where your Token contract has been deployed. 
var web3 = new Web3(new Web3.providers.HttpProvider('xxx'),net);//'https://mainnet.infura.io/{{TOKEN}}'

Replace the contract address and the contractABI with your deployed contract address and ABI
LineNo:22 var contractAddress = 'xxx';
LineNo:23 var contractABI = xxxx


Replace the contract address and the contractABI with your deployed contract address and ABI
LineNo:27 const address = 'xxx';
LineNo:28 const privateKey = 'xxxx'

Replace the address and Token count in distribute.csv file

Once the set up u can run the following commands in the terminal
$ node airdrop.js 

You can see the script running and prints the logs of the balance and address to which the tokens has been sent. 

 
