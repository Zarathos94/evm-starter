# 🏄‍♂️ Using Docker

Prerequisite: [Docker](https://docs.docker.com/engine/install/)/)

> clone/fork 🏗 rally-assignment:

```bash
git clone https://github.com/Zarathos94/rally-assignment.git
```

> run the script that sets the stack up and that's it (takes some minutes to finish):

```bash
cd rally-assignment
./docker/setup.sh start
```

> to re-deploy your contracts (container must be up and running):

```bash
./docker/setup.sh deploy
```

> running front-end on a different port (eg. 8080):

```bash
docker rm -f CONTRACT_ETH

docker run \
  --name CONTRACT_ETH \
  -v `pwd`:/opt/rally-assignment \
  -w /opt/rally-assignment \
  -e PORT=8080 \
  -p 8080:8080 \
  -p 8545:8545 \
  -dt node:16

./docker/setup.sh start
```

> running the container in interactive mode (must run each tool manually):

```bash
docker rm -f CONTRACT_ETH

docker run \
  --name CONTRACT_ETH \
  -v `pwd`:/opt/rally-assignment \
  -w /opt/rally-assignment \
  -p 3000:3000 \
  -p 8545:8545 \
  --entrypoint /bin/bash \
  -ti node:16
```

🔏 Edit your smart contract `RallyAssignment.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app
