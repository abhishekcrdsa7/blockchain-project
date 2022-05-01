/* eslint no-use-before-define: "warn" */
const fs = require("fs");
const chalk = require("chalk");
const { config, ethers } = require("hardhat");
const { utils } = require("ethers");
const R = require("ramda");
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const delayMS = 1000 //sometimes xDAI needs a 6000ms break lol 😅

const main = async () => {

  // ADDRESS TO MINT TO:
  const toAddress = "0x376a71B39a650156A5623993E7eB1e0fE0147D1A";

  console.log("\n\n 🎫 Minting to "+toAddress+"...\n");

  const { deployer } = await getNamedAccounts();
  const yourCollectible = await ethers.getContract("YourCollectible", deployer);

  const gucci = {
    "description": "Gucci Beloved Jackie 1961",
    "image": "https://explainexampleimages.s3.ap-south-1.amazonaws.com/blockchain+project+images/Gucci_NFT.png",
    "brand": "Gucci",
    "attributes": [
       {
         "product_name": "Beloved Jackie 1961",
         "mint_date": "04/24/2022",
         "serial_num": "A&973#HSDJ"
         
       }
    ]
  }
  console.log("Uploading Gucci...")
  const uploadedgucci = await ipfs.add(JSON.stringify(gucci))

  console.log("Minting Gucci with IPFS hash ("+uploadedgucci.path+")")
  await yourCollectible.mintItem(toAddress,uploadedgucci.path,{gasLimit:10000000})


  await sleep(delayMS)


  const lv = {
    "description": "Louis Vuitton Speedy Bandouliere 25",
    "image": "https://explainexampleimages.s3.ap-south-1.amazonaws.com/blockchain+project+images/Louis_Vuitton_NFT.png",
    "brand": "Louis Vuitton",
    "attributes": [
       {
         "product_name": "Speedy Bandouliere 25",
         "mint_date": "04/24/2022",
         "serial_num": "A&973#HSDJ"
         
       }
    ]
  }
  console.log("Uploading Louis Vuitton...")
  const uploadedlv = await ipfs.add(JSON.stringify(lv))

  console.log("Minting Louis Vuitton with IPFS hash ("+uploadedlv.path+")")
  await yourCollectible.mintItem(toAddress,uploadedlv.path,{gasLimit:10000000})



  await sleep(delayMS)


  const supreme = {
    "description": "Supreme Daido Moriyama Denium Trucker Jacket",
    "image": "https://explainexampleimages.s3.ap-south-1.amazonaws.com/blockchain+project+images/Supreme_NFT.png",
    "brand": "Supreme",
    "attributes": [
       {
         "product_name": "Daido Moriyama Denium Trucker Jacket",
         "mint_date": "04/24/2022",
         "serial_num": "A&973#HSDJ"
         
       }
    ]
  }
  console.log("Uploading Supreme...")
  const uploadedsupreme = await ipfs.add(JSON.stringify(supreme))

  console.log("Minting Supreme with IPFS hash ("+uploadedsupreme.path+")")
  await yourCollectible.mintItem(toAddress,uploadedsupreme.path,{gasLimit:10000000})



  //await sleep(delayMS)

  // console.log("Transferring Ownership of YourCollectible to "+toAddress+"...")

  // await yourCollectible.transferOwnership(toAddress)

  // await sleep(delayMS)

  /*


  console.log("Minting zebra...")
  await yourCollectible.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

  */


  //const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])



  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */


  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */


  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
