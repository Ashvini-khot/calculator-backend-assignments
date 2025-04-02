class AgeCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateAge();
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
                <h3>Age Calculator</h3>
                <form>
                    <label>Date of Birth:</label>
                    <input type="date" id="dob" required>
                    <button type="submit">Calculate</button>
                </form>
                <div id="result"></div>
            </div>
        `;
    }

    calculateAge() {
        const dob = new Date(this.shadowRoot.querySelector("#dob").value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        this.shadowRoot.querySelector("#result").textContent = `Your age is ${age} years.`;
    }
}

if (!customElements.get('age-calculator')) customElements.define('age-calculator', AgeCalculator);

if (!window.customElementsList) window.customElementsList = [];

if (!window.customElementsList.find(item => item.component === 'age-calculator')) window.customElementsList.push({ component: 'age-calculator', componentClass: AgeCalculator })
