require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');

const privatekey = '95ad9d78a9b2c6ee5bf59ffe9ca340bbcc497b91d95cb581460fd76da4726686';

module.exports = {
    networks: {
        bsctestnet: {
            provider: new HDWalletProvider(privatekey, 'https://data-seed-prebsc-1-s1.binance.org:8545/'),
            port: '8545',
            network_id: '*',
            gas: 4500000,
            gasPrice: 25000000000,
            from: '0x023D6FfcAA9b3B278fd8F805D116dAC6cAc39780'
        },
        // development: {
        //     host: '127.0.0.1',
        //     port: '7545',
        //     network_id: '*' // match any network
        // },
    },
    contracts_directory: './src/contracts',
    contracts_build_directory: './src/truffle_abis',
    compilers: {
        solc: {
            version: '^0.5.0',
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}