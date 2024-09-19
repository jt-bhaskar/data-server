function getCurrentISTTime() {
    const currentTime = new Date();
    const istTime = currentTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    return istTime;
}

module.exports = {
    getCurrentISTTime
}