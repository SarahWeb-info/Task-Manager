import React from 'react';
import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';

export default function main() {
  return (
    <div className='appContainer'>
      <Navbar />
      <Dashboard />
    </div>
  )
}
