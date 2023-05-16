import React from 'react';
import Logo from '../public/images/dumble.png';
import Image from 'next/image';
const Footer = () => {
  return (
     <>
        <footer className='footer' data-aos='fade-up' data-aos-duration='1500'>
      <div className='container'>
        <div className='footer_wrapper'>
          <div className='footer_box'>
          </div>
          </div>
        <p className='copyright'>
        <a href='http://localhost:3001/'>Copyright - Travel Ease  All rights
          reserved.</a>
        </p>
      </div>
      
    </footer>
         
     </>
    );
};
export default Footer;