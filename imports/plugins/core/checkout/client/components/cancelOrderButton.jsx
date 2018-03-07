import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

const CancelOrderButton = (props) => {
  const { order, orderStatus, onCancelOrderClick } = props;
  return (
    <div>
      {
        (orderStatus === "new" || orderStatus === "coreOrderWorkflow/canceled") &&
        <Components.Button
          status="primary"
          disabled={orderStatus === "coreOrderWorkflow/canceled"}
          buttonType="submit"
          onClick={() => { onCancelOrderClick(order); }}
          bezelStyle="solid"
          label={orderStatus === "coreOrderWorkflow/canceled" ? "Cancelled" : "Cancel Order"}
        />
      }
    </div>
  );
};

CancelOrderButton.propTypes = {
  onCancelOrderClick: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  orderStatus: PropTypes.string.isRequired
};

export default CancelOrderButton;
