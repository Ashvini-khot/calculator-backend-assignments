exports.calculateEMI = (req, res) => {
    const { principal, rate, tenure, compound } = req.query;

    // Convert inputs to numbers
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const n = parseInt(tenure); // months
    const c = parseInt(compound); // compound frequency (e.g., 12 for monthly)

    // Validate inputs
    if (isNaN(P) || isNaN(annualRate) || isNaN(n) || isNaN(c) ||
        P <= 0 || annualRate <= 0 || n <= 0 || c <= 0) {
        return res.status(400).json({
            error: 'Invalid input. Please provide positive numeric values for principal, rate, tenure, and compound frequency.'
        });
    }

    // Monthly interest rate
    const r = annualRate / 12 / 100;

    // EMI calculation
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    // Total payable through EMI
    const totalPayable = emi * n;

    // Compound Interest Calculation
    const t = n / 12; // time in years
    const compoundAmount = P * Math.pow((1 + (annualRate / 100) / c), c * t);
    const compoundInterest = compoundAmount - P;

    // Payback period (months) = Principal / EMI
    const paybackPeriodMonths = Math.ceil(P / emi);

    res.status(200).json({
        principal: P,
        rate: annualRate,
        tenure: n,
        emi: emi.toFixed(2),
        totalPayable: totalPayable.toFixed(2),
        compoundInterest: compoundInterest.toFixed(2),
        compoundAmount: compoundAmount.toFixed(2),
        paybackPeriodMonths
    });
};
