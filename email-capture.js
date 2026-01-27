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
        this.nameInput = null;
        this.emailInput = null;
        this.consentCheckbox = null;
        this.nameError = null;
        this.emailError = null;
        this.consentError = null;
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
                        <div class="email-modal-icon">🧾</div>
                        <h2>Get Free Tax Insights</h2>
                        <p>Enter your details to access the Nigerian Tax Calculator and receive exclusive tax tips and updates.</p>
                    </div>
                    
                    <form class="email-modal-form" id="emailCaptureForm">
                        <div class="email-form-group">
                            <label for="userName">Full Name *</label>
                            <input 
                                type="text" 
                                id="userName" 
                                class="email-input" 
                                placeholder="John Doe"
                                required
                            >
                            <div class="error-message" id="nameError">Please enter your name</div>
                        </div>
                        
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
                        
                        <div class="consent-group">
                            <label class="consent-label">
                                <input type="checkbox" id="ndpaConsent" required>
                                <span class="consent-checkmark"></span>
                                <span class="consent-text">
                                    I consent to the collection and processing of my personal data in accordance with the 
                                    <strong>Nigerian Data Protection Act (NDPA) 2023</strong>. I understand my data will be used 
                                    solely for tax-related communications and I can withdraw consent at any time.
                                </span>
                            </label>
                            <div class="error-message" id="consentError">You must provide consent to continue</div>
                        </div>
                        
                        <button type="submit" class="email-submit-btn" id="emailSubmitBtn" disabled>
                            <span>Continue to Calculator</span>
                            <span class="btn-icon">→</span>
                        </button>
                    </form>
                    
                    <div class="email-privacy">
                        <p><strong>🔒 Your Privacy Rights (NDPA 2023):</strong></p>
                        <p style="font-size: 0.7rem; margin-top: 0.5rem; line-height: 1.4;">
                            You have the right to access, correct, or delete your data at any time. 
                            We will never share your information with third parties without your explicit consent. 
                            Contact us to exercise your rights or withdraw consent.
                        </p>
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
        this.nameInput = document.getElementById('userName');
        this.emailInput = document.getElementById('userEmail');
        this.consentCheckbox = document.getElementById('ndpaConsent');
        this.nameError = document.getElementById('nameError');
        this.emailError = document.getElementById('emailError');
        this.consentError = document.getElementById('consentError');
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

        // Guide users to check consent when they click disabled submit button
        const submitBtn = document.getElementById('emailSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                if (submitBtn.disabled && this.consentCheckbox && !this.consentCheckbox.checked) {
                    e.preventDefault();
                    this.validateConsent();
                    // Briefly highlight the consent checkbox
                    const consentLabel = this.consentCheckbox.closest('.consent-label');
                    if (consentLabel) {
                        consentLabel.style.outline = '2px solid #ef4444';
                        consentLabel.style.outlineOffset = '4px';
                        consentLabel.style.borderRadius = '8px';
                        setTimeout(() => {
                            consentLabel.style.outline = '';
                            consentLabel.style.outlineOffset = '';
                        }, 2000);
                    }
                }
            });
        }

        // Name input validation
        if (this.nameInput) {
            this.nameInput.addEventListener('blur', () => this.validateName());
            this.nameInput.addEventListener('input', () => {
                this.nameInput.classList.remove('error');
                this.nameError.classList.remove('show');
            });
        }

        // Email input validation
        if (this.emailInput) {
            this.emailInput.addEventListener('blur', () => this.validateEmail());
            this.emailInput.addEventListener('input', () => {
                this.emailInput.classList.remove('error');
                this.emailError.classList.remove('show');
            });
        }

        // Consent checkbox validation
        if (this.consentCheckbox) {
            this.consentCheckbox.addEventListener('change', () => {
                this.consentError.classList.remove('show');
                this.updateSubmitButton();
            });
        }
    }

    updateSubmitButton() {
        const submitBtn = document.getElementById('emailSubmitBtn');
        if (submitBtn && this.consentCheckbox) {
            if (this.consentCheckbox.checked) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            } else {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
            }
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

    validateName() {
        const name = this.nameInput.value.trim();

        if (!name || name.length < 2) {
            this.nameInput.classList.add('error');
            this.nameError.classList.add('show');
            this.nameError.textContent = 'Please enter your full name';
            return false;
        }

        this.nameInput.classList.remove('error');
        this.nameError.classList.remove('show');
        return true;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            this.emailInput.classList.add('error');
            this.emailError.classList.add('show');
            return false;
        }

        this.emailInput.classList.remove('error');
        this.emailError.classList.remove('show');
        return true;
    }

    validateConsent() {
        if (!this.consentCheckbox.checked) {
            this.consentError.classList.add('show');
            return false;
        }

        this.consentError.classList.remove('show');
        return true;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const nameValid = this.validateName();
        const emailValid = this.validateEmail();
        const consentValid = this.validateConsent();

        if (!nameValid || !emailValid || !consentValid) {
            return;
        }

        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        const submitBtn = document.getElementById('emailSubmitBtn');

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Submit to Google Sheets
            await this.submitToGoogleSheets(name, email);

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

    async submitToGoogleSheets(name, email) {
        const timestamp = new Date().toISOString();
        const data = {
            name: name,
            email: email,
            timestamp: timestamp,
            consent: 'NDPA 2023 - Granted',
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
