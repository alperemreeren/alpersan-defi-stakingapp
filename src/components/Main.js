import React, { Component } from 'react'
import alpersanPng from '../alpn.png'

class Main extends Component {
    render() {
        console.log(this.props.stakingBalance)
        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                    <tr style={{color:'white'}}>
                        <th scope='col'>Staking Balance</th>
                        <th scope='col'>Reward Balance</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr style={{color:'white'}}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} ALPN</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='card mb-2' style={{opacity:'.9'}}>
                    <form 
                    onSubmit={(event) => {
                        event.preventDefault()
                        let amount
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'Ether')
                        this.props.stakeTokens(amount)
                    }}
                    className='mb-3'>
                        <div style={{borderSpacing:'0 1em'}}>
                            <label className='float-left' style={{marginLeft:'15px'}}><b>Stake Tokens</b></label>
                            <span className='float-right' style={{marginRight: '8px'}}>
                                Balance: {window.web3.utils.fromWei(this.props.alpersanBalance, 'Ether')} ALPN
                            </span>
                            <div className='input-group mb-4'>
                                <input
                                ref={(input) => {this.input = input} }
                                type='text'
                                placeholder='0'
                                required />
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img alt='ALPN' src={alpersanPng} height='32' />
                                        &nbsp;&nbsp;&nbsp; ALPN
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                        </div>
                    </form>
                    <button 
                    type='submit'
                    onClick={(event) => {
                        event.preventDefault(
                            this.props.unstakeTokens()
                        )
                    }}
                    className='btn btn-primary btn-lg btn-block'>WITHDRAW</button>
                    <div className='card-body text-center' style={{color:'blue'}}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;