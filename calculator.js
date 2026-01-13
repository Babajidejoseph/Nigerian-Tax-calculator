/**
 * Nigerian Tax Calculator
 * Based on National Tax Act (NTA) 2025
 * 
 * This calculator computes:
 * - PAYE (Pay As You Earn) using progressive tax brackets
 * - Pension contributions (8% employee contribution)
 * - NHF (National Housing Fund) contributions (2.5%)
 * - NSITF (Nigeria Social Insurance Trust Fund) contributions (1% - employer)
 * - Rent Relief deductions
 */

// ===== Tax Brackets (NTA 2025) =====
const TAX_BRACKETS = [
    { min: 0, max: 800000, rate: 0 },
    { min: 800000, max: 3000000, rate: 0.15 },
    { min: 3000000, max: 12000000, rate: 0.18 },
    { min: 12000000, max: 25000000, rate: 0.21 },
    { min: 25000000, max: 50000000, rate: 0.23 },
    { min: 50000000, max: Infinity, rate: 0.25 }
];

// ===== Contribution Rates =====
const RATES = {
    pension: 0.08,      // 8% employee pension contribution
    nhf: 0.025,         // 2.5% National Housing Fund
    nsitf: 0.01,        // 1% Nigeria Social Insurance Trust Fund (employer pays)
    maxRentRelief: 500000,  // Maximum rent relief
    rentReliefRate: 0.20    // 20% of annual rent
};

// ===== DOM Elements =====
const elements = {
    form: document.getElementById('taxForm'),
    grossIncome: document.getElementById('grossIncome'),
    userType: document.getElementById('userType'),
    annualRent: document.getElementById('annualRent'),
    includeNhf: document.getElementById('includeNhf'),
    includePension: document.getElementById('includePension'),
    toggleBtns: document.querySelectorAll('.toggle-btn'),
    optionalFields: document.getElementById('optionalFields'),
    expandIcon: document.getElementById('expandIcon'),
    resultsCard: document.getElementById('resultsCard'),
    periodDisplay: document.getElementById('periodDisplay'),
    
    // Result displays
    takeHome: document.getElementById('takeHome'),
    displayGross: document.getElementById('displayGross'),
    payeAmount: document.getElementById('payeAmount'),
    pensionAmount: document.getElementById('pensionAmount'),
    nhfAmount: document.getElementById('nhfAmount'),
    nsitfAmount: document.getElementById('nsitfAmount'),
    rentRelief: document.getElementById('rentRelief'),
    totalDeductions: document.getElementById('totalDeductions'),
    effectiveRate: document.getElementById('effectiveRate'),
    reliefSection: document.getElementById('reliefSection'),
    pensionRow: document.getElementById('pensionRow'),
    nhfRow: document.getElementById('nhfRow')
};

// ===== State =====
let currentPeriod = 'monthly';

// ===== Utility Functions =====

/**
 * Format number as Nigerian Naira currency
 */
function formatCurrency(amount) {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-NG', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(absAmount);
    return `₦${formatted}`;
}

/**
 * Parse currency input string to number
 */
function parseInput(value) {
    if (!value) return 0;
    // Remove all non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned) || 0;
}

/**
 * Format input as currency while typing
 */
function formatInputValue(input) {
    const value = parseInput(input.value);
    if (value > 0) {
        input.value = new Intl.NumberFormat('en-NG').format(value);
    }
}

// ===== Tax Calculation Functions =====

/**
 * Calculate PAYE tax using progressive tax brackets
 */
function calculatePAYE(taxableIncome) {
    let tax = 0;
    let remainingIncome = taxableIncome;
    
    for (const bracket of TAX_BRACKETS) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(
            remainingIncome,
            bracket.max - bracket.min
        );
        
        if (taxableInBracket > 0) {
            tax += taxableInBracket * bracket.rate;
            remainingIncome -= taxableInBracket;
        }
    }
    
    return tax;
}

/**
 * Calculate Rent Relief (NTA 2025)
 * Relief is the lower of: ₦500,000 or 20% of annual rent paid
 */
function calculateRentRelief(annualRent) {
    if (!annualRent || annualRent <= 0) return 0;
    const twentyPercentRent = annualRent * RATES.rentReliefRate;
    return Math.min(twentyPercentRent, RATES.maxRentRelief);
}

/**
 * Main tax calculation function
 */
function calculateTax(grossAnnual, options = {}) {
    const {
        includePension = true,
        includeNhf = true,
        annualRent = 0,
        userType = 'employee'
    } = options;
    
    // Calculate pension contribution
    const pensionContribution = includePension ? grossAnnual * RATES.pension : 0;
    
    // Calculate NHF contribution
    const nhfContribution = includeNhf ? grossAnnual * RATES.nhf : 0;
    
    // Calculate NSITF (employer contribution - shown for information)
    const nsitfContribution = grossAnnual * RATES.nsitf;
    
    // Calculate Rent Relief
    const rentRelief = calculateRentRelief(annualRent);
    
    // Calculate taxable income
    // Deductions: Pension contribution + Rent Relief
    const totalDeductionsFromTaxable = pensionContribution + rentRelief;
    const taxableIncome = Math.max(0, grossAnnual - totalDeductionsFromTaxable);
    
    // Calculate PAYE tax
    const payeTax = calculatePAYE(taxableIncome);
    
    // Calculate total deductions from pay (employee contributions + PAYE)
    // Note: NSITF is employer contribution, not deducted from employee
    const totalDeductions = payeTax + pensionContribution + nhfContribution;
    
    // Calculate take-home pay
    const takeHome = grossAnnual - totalDeductions;
    
    // Calculate effective tax rate
    const effectiveRate = grossAnnual > 0 ? (totalDeductions / grossAnnual) * 100 : 0;
    
    return {
        grossAnnual,
        taxableIncome,
        payeTax,
        pensionContribution,
        nhfContribution,
        nsitfContribution, // For employer info
        rentRelief,
        totalDeductions,
        takeHome,
        effectiveRate
    };
}

// ===== Display Functions =====

/**
 * Update the results display
 */
function updateResults(results) {
    const divisor = currentPeriod === 'monthly' ? 12 : 1;
    
    // Update period display
    elements.periodDisplay.textContent = currentPeriod === 'monthly' ? 'Monthly' : 'Annual';
    
    // Update values
    elements.takeHome.textContent = formatCurrency(results.takeHome / divisor);
    elements.displayGross.textContent = formatCurrency(results.grossAnnual / divisor);
    elements.payeAmount.textContent = `-${formatCurrency(results.payeTax / divisor)}`;
    elements.pensionAmount.textContent = `-${formatCurrency(results.pensionContribution / divisor)}`;
    elements.nhfAmount.textContent = `-${formatCurrency(results.nhfContribution / divisor)}`;
    elements.nsitfAmount.textContent = `-${formatCurrency(results.nsitfContribution / divisor)}`;
    elements.totalDeductions.textContent = `-${formatCurrency(results.totalDeductions / divisor)}`;
    elements.effectiveRate.textContent = `${results.effectiveRate.toFixed(1)}%`;
    
    // Handle rent relief display
    if (results.rentRelief > 0) {
        elements.rentRelief.textContent = formatCurrency(results.rentRelief / divisor);
        elements.reliefSection.classList.add('show');
    } else {
        elements.reliefSection.classList.remove('show');
    }
    
    // Show/hide pension and NHF rows based on selection
    elements.pensionRow.style.display = elements.includePension.checked ? 'flex' : 'none';
    elements.nhfRow.style.display = elements.includeNhf.checked ? 'flex' : 'none';
    
    // Scroll results into view on mobile
    if (window.innerWidth <= 1024) {
        elements.resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== Event Handlers =====

/**
 * Handle form submission
 */
function handleSubmit(e) {
    e.preventDefault();
    
    // Get input values
    let grossIncome = parseInput(elements.grossIncome.value);
    const annualRent = parseInput(elements.annualRent.value);
    const includePension = elements.includePension.checked;
    const includeNhf = elements.includeNhf.checked;
    const userType = elements.userType.value;
    
    // Convert to annual if input is monthly
    if (currentPeriod === 'monthly') {
        grossIncome *= 12;
    }
    
    // Calculate taxes
    const results = calculateTax(grossIncome, {
        includePension,
        includeNhf,
        annualRent,
        userType
    });
    
    // Update display
    updateResults(results);
}

/**
 * Toggle period (monthly/annual)
 */
function handlePeriodToggle(e) {
    if (!e.target.classList.contains('toggle-btn')) return;
    
    elements.toggleBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentPeriod = e.target.dataset.period;
    
    // Recalculate if there's a value
    if (parseInput(elements.grossIncome.value) > 0) {
        handleSubmit(new Event('submit'));
    }
}

/**
 * Toggle optional fields visibility
 */
function toggleOptional() {
    elements.optionalFields.classList.toggle('show');
    elements.expandIcon.textContent = elements.optionalFields.classList.contains('show') ? '−' : '+';
}

/**
 * Handle input formatting
 */
function handleInputFormat(e) {
    if (e.target.type === 'text' && e.target.inputMode === 'numeric') {
        formatInputValue(e.target);
    }
}

// ===== Initialize =====

function init() {
    // Form submission
    elements.form.addEventListener('submit', handleSubmit);
    
    // Period toggle
    document.querySelector('.toggle-group').addEventListener('click', handlePeriodToggle);
    
    // Input formatting
    elements.grossIncome.addEventListener('blur', handleInputFormat);
    elements.annualRent.addEventListener('blur', handleInputFormat);
    
    // Real-time calculation on input change
    elements.grossIncome.addEventListener('input', () => {
        if (parseInput(elements.grossIncome.value) > 0) {
            // Debounce the calculation
            clearTimeout(elements.grossIncome.timeout);
            elements.grossIncome.timeout = setTimeout(() => {
                handleSubmit(new Event('submit'));
            }, 500);
        }
    });
    
    // Checkbox changes trigger recalculation
    elements.includePension.addEventListener('change', () => {
        if (parseInput(elements.grossIncome.value) > 0) {
            handleSubmit(new Event('submit'));
        }
    });
    
    elements.includeNhf.addEventListener('change', () => {
        if (parseInput(elements.grossIncome.value) > 0) {
            handleSubmit(new Event('submit'));
        }
    });
    
    // Expose toggleOptional to global scope for onclick
    window.toggleOptional = toggleOptional;
    
    // Initial calculation with zero
    updateResults({
        grossAnnual: 0,
        taxableIncome: 0,
        payeTax: 0,
        pensionContribution: 0,
        nhfContribution: 0,
        nsitfContribution: 0,
        rentRelief: 0,
        totalDeductions: 0,
        takeHome: 0,
        effectiveRate: 0
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
