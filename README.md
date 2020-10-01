![Covesting Token](logo.png "Covesting token")

# Covesting smart contract

* _Standart_        : ERC20
* _Name_            : Covesting
* _Ticket_          : COV
* _Decimals_        : 18
* _Emission_        : Mintable

## Smart-contracts description

New COV Token smart-contract

### Contracts contains
1. _COVToken_ - Token contract

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.6.2
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

## Main network configuration

* _Contract creator_              : 

### Links
1. _Token_ -

## Tests
### Tests in Ropsten 1 - commit - 5d1d97383fde3e3adaf8cf4044c5bd8ad0b4fa1e 
_token_ - https://ropsten.etherscan.io/token/0x2da6c0dc45bffc825637732924ff1a0eb4eb27eb
_creator_ - https://ropsten.etherscan.io/address/0xac38afd62564d33d26f847cdfc5e3590b94cf7c2
#### Txs
1. Creation - https://ropsten.etherscan.io/tx/0x73c17f2615ee62dbb9f51afd386c44761c6fdb11d63dc622f6a2de65633f3987
2. Mint by creator 10 COV to 0xAC38aFD62564D33D26F847cdfc5e3590b94CF7C2 - https://ropsten.etherscan.io/tx/0xb582d9c9a7d6b1060a7d5af735d68b181560029e20ca43ee461d818fd47f9e29


