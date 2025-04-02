exports.calculateEMI = (req, res) => {
    const { loanAmount, annualInterestRate, tenureMonths } = req.query;

    if (!loanAmount || !annualInterestRate || !tenureMonths) {
        return res.status(400).json({ error: 'Please provide loanAmount, annualInterestRate, and tenureMonths' });
    }

    const P = parseFloat(loanAmount);
    const R = parseFloat(annualInterestRate) / 12 / 100;
    const N = parseInt(tenureMonths, 10);

    if (P <= 0 || R <= 0 || N <= 0) {
        return res.status(400).json({ error: 'All values must be greater than zero' });
    }

    // EMI Formula Calculation
    const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    res.json({ EMI: EMI.toFixed(2) }); // Returning EMI rounded to 2 decimal places
};
