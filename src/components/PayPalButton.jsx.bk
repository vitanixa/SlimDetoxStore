import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ total }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (window.paypal && paypalRef.current) {
      // Clear previous buttons if re-rendering
      paypalRef.current.innerHTML = '';

      // Render both PayPal and Card buttons
      ['paypal', 'card'].forEach((fundingSource) => {
        window.paypal.Buttons({
          fundingSource: window.paypal.FUNDING[fundingSource.toUpperCase()],
          style: {
            layout: 'vertical',
            label: fundingSource === 'card' ? 'pay' : undefined,
          },
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
          onError: (err) => {
            console.error(`PayPal (${fundingSource}) error:`, err);
            alert('Checkout failed. Please try again.');
          },
        }).render(paypalRef.current);
      });
    }
  }, [total]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;

