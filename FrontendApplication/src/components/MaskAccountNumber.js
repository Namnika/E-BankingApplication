import React from 'react'

 // this function inside your Transactions component
  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return '';
    // Keep first 4 and last 4 digits, mask the rest with X
    const firstThree = accountNumber.slice(0, 3);
    const lastFour = accountNumber.slice(-3);
    const maskedLength = accountNumber.length - 6;
    const masked = 'X'.repeat(maskedLength);
    return `${firstThree}${masked}${lastFour}`;
  };

export default maskAccountNumber;