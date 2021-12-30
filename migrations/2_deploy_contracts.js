const ALPERSAN = artifacts.require('ALPERSAN')
// const Tether = artifacts.require('Tether')
const RWD = artifacts.require('RWD')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function(deployer, network, accounts) {
    //Deploy ALPERSAN Contract
    await deployer.deploy(ALPERSAN)
    const alpersan = await ALPERSAN.deployed()

    // //Deploy Mock Tether contract
    // await deployer.deploy(Tether)
    // const tether = await Tether.deployed()

    // Deploy RWD Contract
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    // Deploy Decentral Bank Contract
    await deployer.deploy(DecentralBank, rwd.address, alpersan.address)
    const decentralBank = await DecentralBank.deployed()

    // Transfer all RWD tokens to Decentral Bank
    await rwd.transfer(decentralBank.address, '1000000000000000000000000')

    // Distribute 100 ALPERSAN tokens to project's own wallet
    await alpersan.transfer("0x023D6FfcAA9b3B278fd8F805D116dAC6cAc39780", '100000000000000000000')

    // // Distribute 100 Tether tokens to investor
    // await tether.transfer(accounts[1], '100000000000000000000')
}