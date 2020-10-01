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
3. Burn 5 COV by tokenholder from 0xAC38aFD62564D33D26F847cdfc5e3590b94CF7C2 - https://ropsten.etherscan.io/tx/0xbb31cd8f0836891598fdf21c8a4473ebebc79d4cf8db79a49e6902e75602acb9
4. Send 3 COV by tokenholder from 0xAC38aFD62564D33D26F847cdfc5e3590b94CF7C2 to 0xaC38afD62564d33d26f847CdFc5e3590b94cF7C3 - https://ropsten.etherscan.io/tx/0x216e2cac9fd3638afccb1fe55a269aeb2490775ecbd2c1889502463b1ab3ab70
5. Burn 2 COV by admin from 0xaC38afD62564d33d26f847CdFc5e3590b94cF7C3 - https://ropsten.etherscan.io/tx/0x4d692731327408a2cd77cecc4c0e94228d5c294b61721d7447d234b70cf1c9f6
6. Блокировка mint'а временная - https://ropsten.etherscan.io/tx/0xe9d193426ce595adff4a10fe38c13112fd427070a8bb0e66b52ec0c44360cd3f
7. Попытка mint 5 монет при блокировке временной - https://ropsten.etherscan.io/tx/0x80564c453d6212bdcce5056a8ac1939fadb7c6e242ecdd21c7241d01e4127856 - временная блокировка как и ожидалось не повлияла на mint 
8. Разблокировка временного mint - https://ropsten.etherscan.io/tx/0x2d6590a2e7f0d2ac7929629f94c02962e66571780d1155e10d75ec83bf4affb2
9. Mint на адрес 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 20 монет - https://ropsten.etherscan.io/tx/0x7ecdfd42607a42e7b54da7306d5e988db71725a3fb2a56a7455a57075922d7bc
10. Блокировка burn'а пользователей - https://ropsten.etherscan.io/tx/0x37faa1243e80153bcf901a62328e68e043d83aadd46091d0069b6365f6ef182e
11. Попытка burn'а 5 монет пользователем 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 - https://ropsten.etherscan.io/tx/0x6a9fa6d5cd361eeb3f15e0fa9637f37e8fd2df1ec47c57b690de1623da3d3828 - попытка не прошла, тест успешный
12. Попытка Burn'а 5 минет админом с пустого адреса 0xaC38afD62564d33d26f847CdFc5e3590b94cF7C3 - https://ropsten.etherscan.io/tx/0xb5322f79e75dcd1672de04d006a7967c1d8fd7bd232b1fa9d91049321f7ca3be - попытка не прошла, тест успешный
13. Попытка burn'а 5 монет админом со счета 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 - https://ropsten.etherscan.io/tx/0x573567fb52a66a7f2d6c710ba88d6c07c32c3092b1513ff2027f5f7471f6944f и https://ropsten.etherscan.io/tx/0xd02aa2c2da31e4929c62a050645b18751804459cff4ee33e93c0d54c22f0180b
14. Разблокировка burn'а пользователя - https://ropsten.etherscan.io/tx/0x23c8adda73053b288c4934f7d827d1222a30039ad457ffa31b4beaad40b9e2da
15. burn 5 монет пользователем 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 - https://ropsten.etherscan.io/tx/0xf18c3cb7ed281ea5737f62043d3e013b495d9d230fc56c6e536f65b1e4c2378d
16. Блокировка transfer пользователя - 
17. Попытка transfer 2 монет пользователем 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 на 0xAC38aFD62564D33D26F847cdfc5e3590b94CF7C2 -
18. Transfer админом 0.5 моент с 0xAC38aFD62564D33D26F847cdfc5e3590b94CF7C2 на 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 - 
19. Разблокировка transfer пользователя -
20. Попытка transfer 2 монет пользователем 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 на 0xAC38aFD62564D33D26F847cdfc5e3590b94CF7C2 -
21. Transfer админом 1.5 моент с 0xAC38aFD62564D33D26F847cdfc5e3590b94CF7C2 на 0x184C3c86D6a50a88ce59c534Df587a4bADFdA427 - 


