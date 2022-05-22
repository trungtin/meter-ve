const fs = require("fs");

const accounts = require("../test/fixtures/accounts");

async function main() {
  const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10] = accounts;

  token = await ethers.getContractFactory("Token");

  usdc = await token.deploy("USDC", "USDC");
  await usdc.mint(
    a0.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await usdc.mint(
    a1.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await usdc.mint(
    a2.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );

  usdt = await token.deploy("USDT", "USDT");
  await usdt.mint(
    a0.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await usdt.mint(
    a1.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await usdt.mint(
    a2.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );

  mim = await token.deploy("MIM", "MIM");
  await mim.mint(
    a0.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await mim.mint(
    a1.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await mim.mint(
    a2.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );

  dai = await token.deploy("DAI", "DAI");
  await dai.mint(
    a0.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await dai.mint(
    a1.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await dai.mint(
    a2.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );

  await usdt.deployed();
  await mim.deployed();
  await dai.deployed();

  let data = {};
  try {
    data = JSON.parse(fs.readFileSync("output/test_tokens.json", "utf8"));
  } catch (e) {}

  data = {
    ...data,
    usdt: usdt.address,
    mim: mim.address,
    dai: dai.address,
    usdc: usdc.address
  };
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }
  fs.writeFileSync("output/test_tokens.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
