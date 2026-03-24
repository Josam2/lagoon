
Lagoon: A Basic sBTC Powered Lending App

Lagoon is a decentralized lending application built on the Stacks blockchain, leveraging sBTC (Synthetic Bitcoin) as the primary asset for lending and borrowing. This basic implementation provides a foundation for users to supply and borrow assets, earning interest on deposits and paying interest on loans.

Key Features

- Lending Pool: Users can supply sBTC to the lending pool to earn interest.
- Borrowing: Users can borrow sBTC from the lending pool, using their supplied assets as collateral.
- Interest Rates: Algorithmic interest rates adjust based on utilization of the lending pool.
- Collateral Management: Users can add or remove collateral to manage their loan-to-value ratio.

Technical Overview

- Blockchain: Stacks
- Smart Contract Language: Clarity
- Asset: sBTC (Synthetic Bitcoin)
- Protocol: Decentralized lending and borrowing

Core Functions

Lending
- `supply(sBTC_amount)`: Supply sBTC to the lending pool.
- `withdraw(sBTC_amount)`: Withdraw sBTC from the lending pool.

Borrowing
- `borrow(sBTC_amount, collateral)`: Borrow sBTC from the lending pool, providing collateral.
- `repay(sBTC_amount)`: Repay borrowed sBTC, including interest.

Collateral Management
- `add_collateral(collateral_amount)`: Add collateral to an existing loan.
- `remove_collateral(collateral_amount)`: Remove collateral from an existing loan.

Security Considerations

- Smart Contract Risks: Bugs or vulnerabilities in the contract can lead to loss of funds.
- sBTC Price Volatility: Fluctuations in sBTC price can impact collateral values.

Future Development

- Additional Assets: Support for multiple assets, including Stacks tokens and other synthetic assets.
- Improved Interest Rate Model: More sophisticated interest rate adjustments based on market conditions.
- Enhanced Security Measures: Regular audits and bug bounty programs to ensure contract security.

Contributing

Contributions are welcome! Please submit a pull request with your changes and a detailed description of the updates.

License

This project is licensed under the LICENSE.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
