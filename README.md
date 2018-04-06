## ERC20_token_transfer

After creating an **ERC20 token** on **Ethereum blockchain**, I found out that MetaMask does not provide a way to transfer tokens from/to Ethereum addresses.

I decided to create a **simple interface connected to MetaMask** that allows users to directly **transfer** my **ERC20 token** to any **Ethereum Addresses**.

I created this interface using **React.js**. The design is fully inspired by the ledger hardware wallet interface.<br>
The wallet only works on **Desktop** and you will need to have the **extension of MetaMask** installed on your browser.

I also **launched** the ERC20 token on the **Ethereum mainnet**, so it can be transfered to real Ethereum addresses that have real value.
<br>It is also **listed on EtherDelta exchange** so anyone can buy the token.

Below are the 2 tokens I created. One on the Rinkeby test network and the other one on the mainnet.

## Token details on the Mainnet

Contract address: **0x7e75A33124F3cb273d2D9dD5B42C1E20a03ebeb4**<br>
Token Name: **BREIZH COIN**<br>
Token Symbol: **BZH**<br>
Decimals: **4**<br>
Total supply: **10 million**<br>
Maximun supply: **21 million**<br>

**Wallet interface:** [Link here](https://bzh-wallet.herokuapp.com/)<br>
**EtherDelta exhange:** [Link here](https://etherdelta.com/#0x7e75a33124f3cb273d2d9dd5b42c1e20a03ebeb4-ETH)

## Token details on the Rinkeby test network

Contract address: **0x64fFD34716711f068c5c5974d1e71d021aEf024A**<br>
Token Name: **BREIZH COIN**<br>
Token Symbol: **BZH**<br>
Decimals: **2**<br>
Total supply: **10,020**<br>
Maximun supply: **20,000**<br>

**Wallet interface:** [Link here](https://stark-cliffs-10440.herokuapp.com/)

## Specificities of this tokens:

* The owner of the contract can increase the total supply.
* The owner of the contract can decrease the total supply.
* There is a fixed maximum supply.
* Each Ethereum addresses can get an airdrop of 1000 tokens.
