class InterestCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateInterest();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .container { padding: 20px; border: 1px solid #ccc; border-radius: 10px; text-align: center; }
                button { margin-top: 10px; padding: 8px 12px; cursor: pointer; }
                #result { margin-top: 10px; font-weight: bold; }
            </style>
            <div class="container">
                <h3>Interest Calculator</h3>
                <form>
                    <label>Principal Amount:</label>
                    <input type="number" id="principal" required><br>
                    <label>Rate of Interest (% per year):</label>
                    <input type="number" id="rate" required><br>
                    <label>Time (years):</label>
                    <input type="number" id="time" required><br>
                    <button type="submit">Calculate</button>
                </form>
                <div id="result"></div>
            </div>
        `;
    }

    calculateInterest() {
        const principal = parseFloat(this.shadowRoot.querySelector("#principal").value);
        const rate = parseFloat(this.shadowRoot.querySelector("#rate").value);
        const time = parseFloat(this.shadowRoot.querySelector("#time").value);

        const interest = (principal * rate * time) / 100;
        this.shadowRoot.querySelector("#result").textContent = `Interest: ₹${interest.toFixed(2)}`;
    }
}

if (!customElements.get('interest-calculator')) customElements.define('interest-calculator', InterestCalculator);

if (!window.customElementsList) window.customElementsList = [];

if (!window.customElementsList.find(item => item.component === 'interest-calculator')) window.customElementsList.push({ component: 'interest-calculator', componentClass: InterestCalculator })