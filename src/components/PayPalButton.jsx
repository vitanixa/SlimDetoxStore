import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ total }) => {
  return (
    <PayPalButtons
      style={{ layout: 'vertical', color: 'gold', shape: 'rect' }}
      fundingSource={undefined} // Show all buttons, including card
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total.toFixed(2),
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const details = await actions.order.capture();
        alert(`Transaction completed by ${details.payer.name.given_name}`);
      }}
      onError={(err) => {
        console.error('PayPal error', err);
        alert('Payment failed. Please try again.');
      }}
    />
  );
};

export default PayPalButton;

