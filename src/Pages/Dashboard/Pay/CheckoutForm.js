import { CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CheckoutForm = ({order}) => {
    console.log('order',order)
    const {_id,price,name,email} = order;
    const stripe = useStripe();
    const elements = useElements();

    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [processing,setProcessing] = useState(false);
    const [clientSecrect,setClientSecrect] = useState('');
    
    const history = useHistory();
    useEffect(()=>{
        const url = 'https://visibly-bright-server-production.up.railway.app/create-payment-intent';
        const url1 = 'http://localhost:5000/create-payment-intent';
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({price})
        })
        .then(res => res.json())
        .then(data => setClientSecrect(data.clientSecrect))
        .catch(err=>console.log('khali error',err))
    },[price])
    console.log('client secrect',clientSecrect)

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
              name: name,
              email: email
            },
          },
        },
      );
      console.log('payment',paymentIntent)
      if(errors){
        setSuccess('');
          setError(errors.message)
      }
      else{
          setError('');
          setSuccess('Your payment done');
          console.log('payment Intent',paymentIntent)
          setProcessing(false)
        //   save to database
        const payment = {
          amount: paymentIntent.amount,
          created:Date(1644202473).split(' ').slice(0,4).toString(),
          transaction: paymentIntent.client_secret.split('secret_')[0]
        }
        const url = `https://visibly-bright-server-production.up.railway.app/orders/${_id}`
        const url1 = `http://localhost:5000/orders/${_id}`
        fetch(url,{
          method:'PUT',
          headers:{
            'content-type': 'application/json'
          },
          body:JSON.stringify(payment)
        })
          .then(res=>res.json())
          .then(data=>console.log('nerr',data))
        //   history.push('/')
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
                {processing?<CircularProgress/>:<button disabled={!stripe || success}>Pay ${price}</button>}
            </form>
            {error && <p style={{color:'red'}}>{error}</p>}
            {success && <p style={{color:'green'}}>{success}</p>}
        </div>
    );
};

export default CheckoutForm;