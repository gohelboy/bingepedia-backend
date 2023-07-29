const generate = (length = 4) => {
  const numbers = "0123456789";
  let OTP = numbers[Math.floor(Math.random() * 9) + 1];

  for (let i = 0; i < length - 1; i++) {
    OTP += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return OTP;
};

module.exports = { generate }
