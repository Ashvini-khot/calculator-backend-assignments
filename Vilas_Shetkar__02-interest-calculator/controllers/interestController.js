exports.calculateInterest = (req, res) => {
    const { principal, rate, time } = req.query;

    if (!principal || !rate || !time) {
        return res.status(400).json({ error: 'Please provide principal, rate, and time' });
    }

    const interest = (parseFloat(principal) * parseFloat(rate) * parseFloat(time)) / 100;

    res.json({ principal, rate, time, interest });
};
