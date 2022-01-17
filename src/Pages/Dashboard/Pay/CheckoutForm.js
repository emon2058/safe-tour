import { CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({order}) => {
    // console.log('order',order)
    const {price,name,email} = order;
    const stripe = useStripe();
    const elements = useElements();

    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [processing,setProcessing] = useState(false);
    const [clientSecrect,setClientSecrect] = useState('');
    
    useEffect(()=>{
        fetch('http://localhost:5000/create-payment-intent',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({price})
        })
        .then(res => res.json())
        .then(data => setClientSecrect(data))
    },[price])

    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const card = elements.getElement(CardElement);
      if(card === null){
          return;
      }
      setProcessing(true);
      const {error,paymentMethod} = await stripe.createPaymentMethod({
          type:'card',
          card
      });
      if(error){
        setError(error.message)
        setSuccess('');
      }
      else{
          setError('')
          console.log('payment method',paymentMethod)
      }

    //   payment intent 
    const {paymentIntent, errors} = await stripe.confirmCardPayment(
        clientSecrect,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: 'Jenny Rosen',
            },
          },
        },
      );
      console.log('payment',paymentIntent)
      if(errors){
          setError(errors.message)
          setSuccess('');
      }
      else{
          setError('');
          setSuccess('Your payment done');
          console.log('payment Intent',paymentIntent)
          setProcessing(false)
      }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement 
                 options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}/>
                {processing?<CircularProgress/>:<button disabled={!stripe}>Pay ${price}</button>}
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
            {success && <p style={{color:'green'}}>{success}</p>}
        </div>
    );
};

export default CheckoutForm;