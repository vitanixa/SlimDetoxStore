// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="text-center text-sm text-gray-600 mt-10 mb-4">
    <p className="font-medium text-green-700">Contact Us</p>
    <p>
      <a href="mailto:support@vitanixa.com" className="underline">support@vitanixa.com</a>
      {' '}|{' '}
      <a href="https://www.vitanixa.com" target="_blank" rel="noopener noreferrer" className="underline">
        www.vitanixa.com
      </a>
    </p>
  </footer>
);

export default Footer;

