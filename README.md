This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies by run

```bash
npm install
```

then run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Smart Contracts

1. Implement a smart contract in `contracts`
2. 
3. To compile the contract, run

```bash
npm run build:hardhat
```

3. Write a test file in `test/contracts`. After finished, run

```bash
npm run test:hardhat
```

to test the contract. Note that the contract file name MUST be the same with the test file name. For example, `FooBarContract.sol` and `FooBarContract.test.js`

4. To start the local hardhat server, run

```bash
npm run local-testnet
``` 

5. Add the contract name at the array `const contracts` in `scripts/deployContracts.js`. Note that the contract name is what you write in the `.sol` file, NOT the file name. For example, in `FooBarContract.sol`, we have

```bash
contract FooBar {
  ...
}
```

so the array should be `const contracts = [ ..., "FooBar"]`. Then run the deploy script by

```bash
npm run deploy:hardhat
```

6. To use the contract, copy `artifacts/contracts/YOUR_CONTRACT_FILE_NAME.sol/YOUR_CONTRACT_NAME.json` to `src/lib/contracts/YOUR_CONTRACT_NAME/contractAbi.json`, then import both files in the code by

```js
import contractAddress from "@/lib/contracts/YOUR_CONTRACT_NAME/contractAddress.json";
import contractAbi from "@/lib/contracts/YOUR_CONTRACT_NAME/contractAbi.json";
```

7. Thi Luea Ko Su Su Cha <3
