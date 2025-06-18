import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ total }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: total },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          alert(`Transaction completed by ${details.payer.name.given_name}`);
        },
        onError: err => {
          console.error('PayPal error:', err);
          alert('PayPal checkout failed. Please try again.');
        },
      }).render(paypalRef.current);
    }
  }, [total]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;

