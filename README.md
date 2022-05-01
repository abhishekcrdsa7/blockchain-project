verihat
Manually minting ERC721 (NFT) of different brands on Mumbai (testnet)

git clone https://github.com/abhishekcrdsa7/blockchain-project.git
cd verihat
yarn install
yarn generate
This will create a new mnemonic and you can get this deployer address using the command:

yarn account
Go to https://faucet.matic.network to get some Mumbai-MATIC (testnet currency).

Compile and deploy your NFT contract:

yarn deploy
Start the frontend with:

yarn start
Open http://localhost:3000 to see the app

Minting:
Edit the mint script mint.js in packages/hardhat/scripts and update the toAddress to your frontend address (wallet address in the top right or localhost:3000).

in a new terminal window run the mint script:

cd verihat
yarn mint
You should see your brand NFT show up on the frontend if you minted to the correct address.

Now you will be able to send the NFTs to any ethererum address from front end.
