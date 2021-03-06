import React, { Component } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert2";

// proptypes
import { walletProptypes } from "../../config/proptypes";

class WalletAction extends Component {
  state = {
    isLoading: false
  }

  resetInputs = () => {
    if (this.props.actionType === "transfer") {
      this.amountInput.value = "";
      this.emailInput.value = "";
      return;
    }

    this.amountInput.value = "";
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(this.amountInput.value, 10);
    let email;

    this.setState({ isLoading: true });

    if (this.props.actionType === "fund") {
      this.props.formHandler(amount)
        .then((fundWalletSuccess) => {
          Alerts.toast(fundWalletSuccess.message);

          this.resetInputs();

          this.setState({ isLoading: false });
        })
        .catch((fundWalletError) => {
          if (fundWalletError.message === "paystack-popup-close") {
            this.resetInputs();

            this.setState({ isLoading: false });

            return;
          }
          Alerts.toast(fundWalletError.message, "error");

          this.resetInputs();

          this.setState({ isLoading: false });
        });
    } else {
      email = this.emailInput.value;
      swal({
        title: "Confirm funds transfer",
        text: "Transfers are irreversible! Click yes to confirm transaction",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#337ab7;",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      })
        .then(() => this.props.formHandler(amount, email, this.props.wallet))
        .then((transferSuccess) => {
          Alerts.toast(transferSuccess.message);

          this.resetInputs();

          this.setState({ isLoading: false });
        })
        .catch((transferError) => {
          if (typeof transferError === "object") {
            Alerts.toast(transferError.message, "error");
          }

          this.resetInputs();

          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const { buttonText, headerTitle, actionType } = this.props;
    return (
      <div className={`wallet-dashboard-action ${actionType}`}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>{headerTitle}</h4>
          </div>
          <div className="panel-body">
            <form
              className="wallet-dashboard-action__form"
              onSubmit={(e) => this.handleFormSubmit(e)}
            >
              {
                actionType === "transfer"
                &&
                <label>
                  <input
                    type="email"
                    placeholder="Recipient's Email e.g: babyface@mail.com"
                    ref={(node) => (this.emailInput = node)}
                    required
                  />
                </label>

              }
              <label>
                <input
                  type="number"
                  placeholder="Amount e.g: 100"
                  ref={(node) => (this.amountInput = node)}
                  required
                />
              </label>
              <button type="submit" disabled={this.state.isLoading}>
                <i
                  className={`fa fa-spinner fa-spin ${!this.state.isLoading && "hidden"}`}
                  id="btn-processing"
                />
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

WalletAction.propTypes = {
  actionType: PropTypes.oneOf(["fund", "transfer"]).isRequired,
  buttonText: PropTypes.string.isRequired,
  formHandler: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
  ...walletProptypes.wallet
};

export default WalletAction;
