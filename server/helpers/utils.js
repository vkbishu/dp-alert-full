const clearPrice = (amt) => {
    amt = amt.replace(/[^0-9.-]+/g,"");
    return parseFloat(amt);
};

const randomString = (length) => {
    let result = '';
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

module.exports = {
    clearPrice,
    randomString
};