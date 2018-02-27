import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import WalletHistory from "./walletHistory";
import WalletAction from "./walletAction";

// proptypes
import { walletProptypes, walletHistoryProptypes } from "../../config/proptypes";

import roundUp from "../../helpers/roundUp";
class  WalletDashboard extends Component {
  state = {
    currentPage: 1,
    limit: 5,
    walletHistory: this.props.walletHistory,
    pages: ["first", "prev", "next", "last"],
    pagesCount: this.props.pagesCount
  }

  componentWillReceiveProps(newProps) {
    const { walletHistory, pagesCount } = newProps;
    if (walletHistory) {
      this.setState({ walletHistory, pagesCount });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      const { walletHistory, pagesCount } = this.props.fetchWalletHistory(this.state.currentPage);
      this.setState({ walletHistory, pagesCount });
    }
  }
  fetchWalletHistory = (page) => {
    const { currentPage, pagesCount: lastPage } =  this.state;

    if (page  === "next" && currentPage < lastPage) {
      return this.setState({ currentPage: currentPage + 1 });
    }
    if (page === "prev" && currentPage > 1) {
      return this.setState({ currentPage: currentPage - 1 });
    }
    if (page === "first" && currentPage > 1) {
      return this.setState({ currentPage: 1 });
    }
    if (page === "last" && currentPage < lastPage) {
      return this.setState({ currentPage: lastPage });
    }

    return;
  }

  buttonDisabled = (page) => {
    const { currentPage, pagesCount }  = this.state;
    if (currentPage === 1 && (page === "prev" || page === "first")) {
      return true;
    }
    if (currentPage === pagesCount && (page === "next" || page === "last")) {
      return true;
    }

    return false;
  }

  render() {
    const { wallet, fundWallet, transferToWallet } = this.props;
    const { walletHistory, currentPage, pagesCount }  = this.state;
    return (
      <div className="wallet-dashboard">
        <div className="container container-lg">
          <div className="wallet-dashboard-intro">
            <div className="wallet-dashboard-balance">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>My Wallet</h4>
                </div>
                <div className="panel-body">
                  <h4 className="wallet-dashboard-balance__label">Balance:</h4>
                  <h2 className="wallet-dashboard-balance__amount">₦{roundUp(wallet.balance)}</h2>
                </div>
              </div>
            </div>
            <WalletAction
              actionType="fund"
              headerTitle="Fund my wallet"
              buttonText="Fund My Wallet"
              formHandler={fundWallet}
              wallet={wallet}
            />
            <WalletAction
              actionType="transfer"
              headerTitle="Transfer To Wallet"
              buttonText="Transfer"
              formHandler={transferToWallet}
              wallet={wallet}
            />
          </div>
          <WalletHistory walletHistory={walletHistory}/>
          { pagesCount > 1 &&
            <div className="pagination">
              <ul className="pagination-links">
                {
                  this.state.pages.map((page) => (
                    <li className={`pagination-link ${page}`}>
                      <button
                        onClick={() => this.fetchWalletHistory(page)}
                        disabled={this.buttonDisabled(page)}
                      >{page}</button>
                    </li>
                  ))
                }
              </ul>
              <p>Page: {currentPage}</p>
            </div>
          }
        </div>
      </div>
    );
  }
}

WalletDashboard.propTypes = {
  ...walletProptypes.wallet,
  walletHistory: PropTypes.arrayOf(walletHistoryProptypes.walletHistory).isRequired
};
export default  WalletDashboard;
