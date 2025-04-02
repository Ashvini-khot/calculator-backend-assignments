class EmiCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateEMI();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

                .container {
                    font-family: 'Poppins', sans-serif;
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 350px;
                    margin: auto;
                }
                h3 {
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 15px;
                }
                input {
                    width: 100%;
                    padding: 10px;
                    margin: 8px 0;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 14px;
                    transition: border 0.3s;
                }
                input:focus {
                    border-color: #007BFF;
                    outline: none;
                }
                button {
                    width: 100%;
                    padding: 10px;
                    background: #007BFF;
                    border: none;
                    color: white;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background 0.3s ease-in-out;
                }
                button:hover {
                    background: #0056b3;
                }
                #result {
                    margin-top: 15px;
                    font-weight: bold;
                    color: #333;
                    font-size: 18px;
                }
                .error {
                    color: red;
                    font-size: 14px;
                    margin-top: 5px;
                }
            </style>

            <div class="container">
                <h3>EMI Calculator</h3>
                <form>
                    <label>Loan Amount:</label>
                    <input type="number" id="loanAmount" required min="1" placeholder="Enter loan amount">
                    
                    <label>Annual Interest Rate (%):</label>
                    <input type="number" id="interestRate" required min="0.1" step="0.1" placeholder="Enter interest rate">
                    
                    <label>Tenure (Months):</label>
                    <input type="number" id="tenure" required min="1" placeholder="Enter tenure in months">
                    
                    <button type="submit">Calculate EMI</button>
                </form>
                <div id="result"></div>
                <div id="error" class="error"></div>
            </div>
        `;
    }

    calculateEMI() {
        const loanAmount = parseFloat(this.shadowRoot.querySelector("#loanAmount").value);
        const annualInterestRate = parseFloat(this.shadowRoot.querySelector("#interestRate").value);
        const tenureMonths = parseInt(this.shadowRoot.querySelector("#tenure").value, 10);
        const resultElement = this.shadowRoot.querySelector("#result");
        const errorElement = this.shadowRoot.querySelector("#error");

        if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(tenureMonths) ||
            loanAmount <= 0 || annualInterestRate <= 0 || tenureMonths <= 0) {
            errorElement.textContent = "Please enter valid values.";
            resultElement.textContent = "";
            return;
        }

        // EMI Calculation
        const R = annualInterestRate / 12 / 100;
        const EMI = (loanAmount * R * Math.pow(1 + R, tenureMonths)) / 
                    (Math.pow(1 + R, tenureMonths) - 1);

        resultElement.textContent = `Your EMI is ₹${EMI.toFixed(2)}`;
        errorElement.textContent = "";
    }
}

if (!customElements.get('emi-calculator')) customElements.define('emi-calculator', EmiCalculator);

if (!window.customElementsList) window.customElementsList = [];

if (!window.customElementsList.find(item => item.component === 'emi-calculator')) {
    window.customElementsList.push({ component: 'emi-calculator', componentClass: EmiCalculator });
}
