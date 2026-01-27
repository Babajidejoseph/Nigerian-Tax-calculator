/**
 * Email Capture & Lead Generation
 * Integrates with Google Sheets for email storage
 */

// Configuration - UPDATE THIS with your Google Apps Script Web App URL
const CONFIG = {
    googleSheetsURL: 'https://script.google.com/macros/s/AKfycbzzJoztjac4zTaMU0W4ZxKY3TjIP6B0MGBbPqRDhRAnvQ_m4QVqwO12wdtH14hZuYEXpA/exec', // Will be updated after Google Sheets setup
    localStorageKey: 'taxCalculatorEmailSubmitted',
    requiredBeforeUse: true
};

class EmailCapture {
    constructor() {
        this.overlay = null;
        this.modal = null;
        this.form = null;
        this.emailInput = null;
        this.errorMessage = null;
        this.hasSubmitted = this.checkSubmissionStatus();

        this.init();
    }

    init() {
        // Create modal elements
        this.createModal();

        // Check if user needs to submit email
        if (CONFIG.requiredBeforeUse && !this.hasSubmitted) {
            this.showModal();
            this.blockCalculator();
        }

        // Set up event listeners
        this.setupEventListeners();
    }

    createModal() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'email-modal-overlay hidden';
        this.overlay.id = 'emailModalOverlay';

        // Create modal HTML
        this.overlay.innerHTML = `
            <div class="email-modal" id="emailModal">
                <div id="emailFormContent">
                    <div class="email-modal-header">
                        <div class="email-modal-icon">📧</div>
                        <h2>Get Free Tax Insights</h2>
                        <p>Enter your email to access the Nigerian Tax Calculator and receive exclusive tax tips and updates.</p>
                    </div>
                    
                    <form class="email-modal-form" id="emailCaptureForm">
                        <div class="email-form-group">
                            <label for="userEmail">Email Address *</label>
                            <input 
                                type="email" 
                                id="userEmail" 
                                class="email-input" 
                                placeholder="yourname@example.com"
                                required
                            >
                            <div class="error-message" id="emailError">Please enter a valid email address</div>
                        </div>
                        
                        <button type="submit" class="email-submit-btn" id="emailSubmitBtn">
                            <span>Continue to Calculator</span>
                            <span class="btn-icon">→</span>
                        </button>
                    </form>
                    
                    <div class="email-privacy">
                        <p>🔒 We respect your privacy. Your email will only be used for tax-related updates. No spam, ever.</p>
                    </div>
                </div>
                
                <div class="email-success" id="emailSuccess">
                    <div class="email-success-icon">✓</div>
                    <h3>Thank You!</h3>
                    <p>Your email has been registered. You now have full access to the calculator.</p>
                    <button class="email-success-continue" id="continueBtn">Start Calculating</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);

        // Get references to elements
        this.modal = document.getElementById('emailModal');
        this.form = document.getElementById('emailCaptureForm');
        this.emailInput = document.getElementById('userEmail');
        this.errorMessage = document.getElementById('emailError');
    }

    setupEventListeners() {
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Continue button after success
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.hideModal());
        }

        // Email input validation on blur
        if (this.emailInput) {
            this.emailInput.addEventListener('blur', () => this.validateEmail());
            this.emailInput.addEventListener('input', () => {
                this.emailInput.classList.remove('error');
                this.errorMessage.classList.remove('show');
            });
        }
    }

    showModal() {
        if (this.overlay) {
            this.overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    hideModal() {
        if (this.overlay) {
            this.overlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
            this.unblockCalculator();
        }
    }

    blockCalculator() {
        // Disable the calculator form
        const calculatorForm = document.getElementById('taxForm');
        if (calculatorForm) {
            calculatorForm.style.pointerEvents = 'none';
            calculatorForm.style.opacity = '0.5';
        }
    }

    unblockCalculator() {
        // Enable the calculator form
        const calculatorForm = document.getElementById('taxForm');
        if (calculatorForm) {
            calculatorForm.style.pointerEvents = '';
            calculatorForm.style.opacity = '';
        }
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            this.emailInput.classList.add('error');
            this.errorMessage.classList.add('show');
            return false;
        }

        this.emailInput.classList.remove('error');
        this.errorMessage.classList.remove('show');
        return true;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate email
        if (!this.validateEmail()) {
            return;
        }

        const email = this.emailInput.value.trim();
        const submitBtn = document.getElementById('emailSubmitBtn');

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Submit to Google Sheets
            await this.submitToGoogleSheets(email);

            // Mark as submitted
            this.markAsSubmitted();

            // Show success message
            this.showSuccess();

        } catch (error) {
            console.error('Error submitting email:', error);
            alert('There was an error submitting your email. Please try again.');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    async submitToGoogleSheets(email) {
        const timestamp = new Date().toISOString();
        const data = {
            email: email,
            timestamp: timestamp,
            source: 'Nigerian Tax Calculator'
        };

        // If Google Sheets URL is not configured, just proceed (for testing)
        if (CONFIG.googleSheetsURL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            console.log('Email would be submitted:', data);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return;
        }

        // Submit to Google Sheets
        const response = await fetch(CONFIG.googleSheetsURL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Note: no-cors mode doesn't return response, so we assume success
        return response;
    }

    showSuccess() {
        const formContent = document.getElementById('emailFormContent');
        const successContent = document.getElementById('emailSuccess');

        if (formContent && successContent) {
            formContent.style.display = 'none';
            successContent.classList.add('show');

            // Auto-close modal after 3 seconds
            setTimeout(() => {
                this.hideModal();
            }, 3000);
        }
    }

    checkSubmissionStatus() {
        return localStorage.getItem(CONFIG.localStorageKey) === 'true';
    }

    markAsSubmitted() {
        localStorage.setItem(CONFIG.localStorageKey, 'true');
        this.hasSubmitted = true;
    }

    // Public method to reset (for testing purposes)
    reset() {
        localStorage.removeItem(CONFIG.localStorageKey);
        this.hasSubmitted = false;
        location.reload();
    }
}

// Initialize email capture when DOM is ready
let emailCaptureInstance;
document.addEventListener('DOMContentLoaded', () => {
    emailCaptureInstance = new EmailCapture();

    // Expose to window for debugging
    window.emailCapture = emailCaptureInstance;
});
