# 🏗 rally-assignment
# 🏄‍♂️ Run locally

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 rally-assignment:

```bash
git clone https://github.com/Zarathos94/rally-assignment.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd rally-assignment
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd rally-assignment
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd rally-assignment
yarn deploy
```

🔏 Edit your smart contract `RallyAssignment.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app