import React, { Component } from 'react'
import Navbar from './Navbar';
import Web3 from 'web3';
// import Tether from '../truffle_abis/Tether.json'
import ALPERSAN from '../truffle_abis/ALPERSAN.json'
import RWD from '../truffle_abis/RWD.json'
import DecentralBank from '../truffle_abis/DecentralBank.json'
import Main from './Main.js'
import ParticleSettings from './ParticleSettings'

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } 
        else {
            window.alert('No Ethereum browser detected! You can check out MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({account: accounts[0]})
        const networkId = await web3.eth.net.getId()
        
        // Load Tether Contract
        // const tetherData = Tether.networks[networkId]
        // if(tetherData) {
        //     const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
        //     this.setState({tether})
        //     let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
        //     this.setState({tetherBalance: tetherBalance.toString() })
        //     console.log({balance: tetherBalance})
        // } else {
        //     window.alert('Error! Tether contract not deployed - no detected network!')
        // }

        // Load ALPERSAN Contract
        const alpersanData = ALPERSAN.networks[networkId]
        if(alpersanData) {
            const alpersan = new web3.eth.Contract(ALPERSAN.abi, alpersanData.address)
            this.setState({alpersan})
            let alpersanBalance = await alpersan.methods.balanceOf(this.state.account).call()
            this.setState({alpersanBalance: alpersanBalance.toString() })
            console.log({balance: alpersanBalance})
        } else {
            window.alert('Error! ALPERSAN contract not deployed - no detected network!')
        }

        // Load RWD Contract
        const rwdData = RWD.networks[networkId]
        if(rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
            this.setState({rwd})
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
            this.setState({rwdBalance: rwdBalance.toString() })
            console.log({balance: rwdBalance})
        } else {
            window.alert('Error! RWD contract not deployed - no detected network!')
        }

        // Load DecentralBank Contract
        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({stakingBalance: stakingBalance.toString() })
            console.log({balance: stakingBalance})
        } else {
            window.alert('Error! DecentralBank contract not deployed - no detected network!')
        }
        this.setState({loading: false})
    }

    // two function one that stakes and one that unstakes -
    // leverage our decentralBank contract - deposit tokens and ustaking
    // ALL Of This is for the staking:
    // depositTokens is a transferFrom
    // function to approve transaction hash

    // staking function
    stakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.alpersan.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
            this.state.decentralBank.methods.depositTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
                this.setState({loading: false})
            })
        })
    }

    // unstaking function
    unstakeTokens = (amount) => {
        this.setState({loading: true})
        this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
            this.setState({loading: false})
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            alpersan: {},
            // tether: {},
            rwd: {},
            decentralBank: {},
            alpersanBalance: '0',
            // tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }

    // Our React Code Goes Here
    render() {
        let content

        {this.state.loading ? content =
        <p id='loader' className='text-center' style={{margin:'30px', color:'white'}}>
        LOADING PLEASE WAIT...</p> : content = 
        <Main 
        alpersanBalance={this.state.alpersanBalance}
        // tetherBalance={this.state.tetherBalance}
        rwdBalance={this.state.rwdBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        />}

        //{this.state.loading ? content = <p id="loader" className='text-center' style={{color:'black', margin:'30px'}}>LOADING PLEASE...</p> : content = <Main />}
        
        // if (this.state.loading = true) {
        //     content = <p id="loader" className='text-center' style={{color:'black', margin:'30px'}}>LOADING PLEASE...</p>
        // }
        // else {
        //     content = <Main />
        // }


        return (
            <div className='App' style={{position:'relative'}}>
                <div style={{position:'absolute'}}>
                    <ParticleSettings />
                </div>
                <Navbar account={this.state.account} />
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role='main' className='col-lg-12 ml-auto mr-auto' style={{maxWidth:'600px', minHeight:'100vm'}}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;