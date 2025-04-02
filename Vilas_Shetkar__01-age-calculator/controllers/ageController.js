exports.calculateAge = (req, res) => {
    const { birthYear } = req.query;
    
    if (!birthYear) {
        return res.status(400).json({ error: 'Please provide birthYear' });
    }
    
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear, 10);
    
    res.json({ age });
};
