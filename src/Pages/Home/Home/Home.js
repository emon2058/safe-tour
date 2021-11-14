import React from 'react';
import Banner from '../Banner/Banner';
import HotDeals from '../HotDeals/HotDeals';
import Products from '../Products/Products';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Reviews></Reviews>
            <HotDeals></HotDeals>
        </div>
    );
};

export default Home;