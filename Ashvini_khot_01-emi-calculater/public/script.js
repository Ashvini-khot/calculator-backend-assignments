class EmiCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.chartInstance = null; // for Chart.js
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
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <style>
                img {
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 20px;
                    border-radius: 10px;
                }
                .card {
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    border-radius: 1rem;
                }
                #result {
                    font-size: 1rem;
                }
            </style>
            
            <div class="container-fluid mt-4">
                <div class="row justify-content-center m-4">
                    <div class="col-8 bg-primary rounded">
                        <h1 class="text-center text-light">Equated Monthly Installment - EMI</h1>
                    </div>
                </div>
                
                <div class="row align-items-center">
                   

                    <div class="col-md-4">
                        <div class="card p-4">
                            <h3 class="text-center text-primary fw-bold mb-4">📊 EMI Calculator</h3>
                            <form>
                                <div class="mb-3">
                                    <label class="form-label">Loan Amount:</label>
                                    <input type="number" id="principal" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Annual Interest Rate (%):</label>
                                    <input type="number" id="rate" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Tenure (months):</label>
                                    <input type="number" id="tenure" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Compounding Frequency (per year):</label>
                                    <input type="number" id="compound" class="form-control" value="12" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Calculate EMI</button>
                            </form>
                        </div>
                    </div>

                    
                    <div class="col-md-4">
                        <img src="images/accounting-concept-illustration_114360-16970.avif" alt="emi-image" class="img-fluid">
                    </div>


                    <div class="col-4">
                        <div class="card text-center bg-primary text-light p-4">
                            <h4>💰 EMI Result</h4>
                            <div id="result">Your EMI will be shown here.</div>
                            <canvas id="emiChart" width="50" height="50" class="mt-3"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async calculateEMI() {
        const principal = this.shadowRoot.querySelector("#principal").value;
        const rate = this.shadowRoot.querySelector("#rate").value;
        const tenure = this.shadowRoot.querySelector("#tenure").value;
        const compound = this.shadowRoot.querySelector("#compound").value;

        const resultDiv = this.shadowRoot.querySelector("#result");
        resultDiv.textContent = "Calculating...";

        try {
            const response = await fetch(`http://localhost:5000/api/emi?principal=${principal}&rate=${rate}&tenure=${tenure}&compound=${compound}`);
            const data = await response.json();

            if (response.ok) {
                resultDiv.innerHTML = `
                    <p class="px-3 py-2 border border-light rounded-3 bg-opacity-25 text-start small">

                        <strong>EMI:</strong> ₹${data.emi}<br>
                        <strong>Total Payable:</strong> ₹${data.totalPayable}<br>
                        <strong>Compound Interest:</strong> ₹${data.compoundInterest}<br>
                        <strong>Compound Amount:</strong> ₹${data.compoundAmount}<br>
                        <strong>Payback Period:</strong> ${data.paybackPeriodMonths} months
                    </p>
                `;

                // Render the donut chart
                const ctx = this.shadowRoot.querySelector("#emiChart").getContext("2d");

                // Destroy previous chart instance if it exists
                if (this.chartInstance) {
                    this.chartInstance.destroy();
                }

                this.chartInstance = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Principal', 'Compound Interest'],
                        datasets: [{
                            data: [parseFloat(principal), data.compoundInterest],
                            backgroundColor: ['#0d6efd', '#ffc107'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#fff'
                                }
                            }
                        }
                    }
                });

            } else {
                resultDiv.textContent = `Error: ${data.error}`;
            }
        } catch (error) {
            resultDiv.textContent = "Server error. Please try again.";
        }
    }
}

if (!customElements.get('emi-calculator')) {
    customElements.define('emi-calculator', EmiCalculator);
}
