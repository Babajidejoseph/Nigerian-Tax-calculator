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

// ===== Contribution Rates & Relief Amounts =====
const RATES = {
    pension: 0.08,      // 8% employee pension contribution
    nhf: 0.025,         // 2.5% National Housing Fund
    nsitf: 0.01,        // 1% Nigeria Social Insurance Trust Fund (employer pays)
    maxRentRelief: 500000,  // Maximum rent relief
    rentReliefRate: 0.20,   // 20% of annual rent
    lifeAssuranceRate: 0.10, // 10% of gross income
    maxLifeAssurance: 500000, // Maximum life assurance relief
    dependentRelief: 100000,  // ₦100,000 per dependent
    maxDependents: 4,         // Maximum 4 dependents
    disabilityRelief: 500000  // ₦500,000 disability relief
};

// ===== DOM Elements =====
const elements = {
    form: document.getElementById('taxForm'),
    grossIncome: document.getElementById('grossIncome'),
    incomeType: document.getElementById('incomeType'),
    salaryStructure: document.getElementById('salaryStructure'),
    taxpayerCategory: document.getElementById('taxpayerCategory'),
    annualRent: document.getElementById('annualRent'),
    lifeAssurance: document.getElementById('lifeAssurance'),
    dependents: document.getElementById('dependents'),
    hasDisability: document.getElementById('hasDisability'),
    includeNhf: document.getElementById('includeNhf'),
    includePension: document.getElementById('includePension'),
    toggleBtns: document.querySelectorAll('.toggle-btn'),
    optionalFields: document.getElementById('optionalFields'),
    expandIcon: document.getElementById('expandIcon'),
    resultsCard: document.getElementById('resultsCard'),
    periodDisplay: document.getElementById('periodDisplay'),
    salaryStructureGroup: document.getElementById('salaryStructureGroup'),

    // Result displays
    takeHome: document.getElementById('takeHome'),
    displayGross: document.getElementById('displayGross'),
    payeAmount: document.getElementById('payeAmount'),
    pensionAmount: document.getElementById('pensionAmount'),
    nhfAmount: document.getElementById('nhfAmount'),
    nsitfAmount: document.getElementById('nsitfAmount'),
    rentRelief: document.getElementById('rentRelief'),
    lifeAssuranceRelief: document.getElementById('lifeAssuranceRelief'),
    dependentRelief: document.getElementById('dependentRelief'),
    disabilityRelief: document.getElementById('disabilityRelief'),
    totalDeductions: document.getElementById('totalDeductions'),
    effectiveRate: document.getElementById('effectiveRate'),
    reliefSection: document.getElementById('reliefSection'),
    pensionRow: document.getElementById('pensionRow'),
    nhfRow: document.getElementById('nhfRow'),
    rentReliefRow: document.getElementById('rentReliefRow'),
    lifeAssuranceRow: document.getElementById('lifeAssuranceRow'),
    dependentRow: document.getElementById('dependentRow'),
    disabilityRow: document.getElementById('disabilityRow')
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
 * Calculate Life Assurance Relief (NTA 2025)
 * Relief is the lower of: ₦500,000 or 10% of gross income
 */
function calculateLifeAssuranceRelief(premium, grossIncome) {
    if (!premium || premium <= 0) return 0;
    const maxRelief = Math.min(grossIncome * RATES.lifeAssuranceRate, RATES.maxLifeAssurance);
    return Math.min(premium, maxRelief);
}

/**
 * Calculate Dependent Relief
 * ₦100,000 per dependent, maximum 4 dependents
 */
function calculateDependentRelief(numberOfDependents) {
    if (!numberOfDependents || numberOfDependents <= 0) return 0;
    const validDependents = Math.min(numberOfDependents, RATES.maxDependents);
    return validDependents * RATES.dependentRelief;
}

/**
 * Calculate Disability Relief
 * ₦500,000 for persons with disabilities
 */
function calculateDisabilityRelief(hasDisability) {
    return hasDisability ? RATES.disabilityRelief : 0;
}

/**
 * Main tax calculation function
 */
function calculateTax(grossAnnual, options = {}) {
    const {
        includePension = true,
        includeNhf = true,
        annualRent = 0,
        lifeAssurance = 0,
        dependents = 0,
        hasDisability = false,
        taxpayerCategory = 'regular-employee',
        incomeType = 'salary'
    } = options;

    // Calculate pension contribution
    const pensionContribution = includePension ? grossAnnual * RATES.pension : 0;

    // Calculate NHF contribution
    const nhfContribution = includeNhf ? grossAnnual * RATES.nhf : 0;

    // Calculate NSITF (employer contribution - shown for information)
    const nsitfContribution = grossAnnual * RATES.nsitf;

    // Calculate all tax reliefs
    const rentRelief = calculateRentRelief(annualRent);
    const lifeAssuranceRelief = calculateLifeAssuranceRelief(lifeAssurance, grossAnnual);
    const dependentRelief = calculateDependentRelief(dependents);
    const disabilityRelief = calculateDisabilityRelief(hasDisability);

    // Total tax reliefs for taxable income calculation
    const totalReliefs = rentRelief + lifeAssuranceRelief + dependentRelief + disabilityRelief;

    // Calculate taxable income
    // Deductions: Pension contribution + All Tax Reliefs
    const totalDeductionsFromTaxable = pensionContribution + totalReliefs;
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
        nsitfContribution,
        rentRelief,
        lifeAssuranceRelief,
        dependentRelief,
        disabilityRelief,
        totalReliefs,
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

    // Update all relief displays
    elements.rentRelief.textContent = formatCurrency(results.rentRelief / divisor);
    elements.lifeAssuranceRelief.textContent = formatCurrency(results.lifeAssuranceRelief / divisor);
    elements.dependentRelief.textContent = formatCurrency(results.dependentRelief / divisor);
    elements.disabilityRelief.textContent = formatCurrency(results.disabilityRelief / divisor);

    // Show/hide relief rows based on values
    const hasAnyRelief = results.totalReliefs > 0;
    elements.reliefSection.classList.toggle('show', hasAnyRelief);

    elements.rentReliefRow.style.display = results.rentRelief > 0 ? 'flex' : 'none';
    elements.lifeAssuranceRow.style.display = results.lifeAssuranceRelief > 0 ? 'flex' : 'none';
    elements.dependentRow.style.display = results.dependentRelief > 0 ? 'flex' : 'none';
    elements.disabilityRow.style.display = results.disabilityRelief > 0 ? 'flex' : 'none';

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
    const lifeAssurance = parseInput(elements.lifeAssurance.value);
    const dependents = parseInt(elements.dependents.value) || 0;
    const hasDisability = elements.hasDisability.checked;
    const includePension = elements.includePension.checked;
    const includeNhf = elements.includeNhf.checked;
    const taxpayerCategory = elements.taxpayerCategory.value;
    const incomeType = elements.incomeType.value;

    // Convert to annual if input is monthly
    if (currentPeriod === 'monthly') {
        grossIncome *= 12;
    }

    // Calculate taxes
    const results = calculateTax(grossIncome, {
        includePension,
        includeNhf,
        annualRent,
        lifeAssurance,
        dependents,
        hasDisability,
        taxpayerCategory,
        incomeType
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
    elements.lifeAssurance.addEventListener('blur', handleInputFormat);

    // Income type change - show/hide salary structure
    elements.incomeType.addEventListener('change', () => {
        const showSalaryStructure = ['salary', 'commission'].includes(elements.incomeType.value);
        elements.salaryStructureGroup.style.display = showSalaryStructure ? 'block' : 'none';

        if (parseInput(elements.grossIncome.value) > 0) {
            handleSubmit(new Event('submit'));
        }
    });

    // Initialize salary structure visibility
    const showSalaryStructure = ['salary', 'commission'].includes(elements.incomeType.value);
    elements.salaryStructureGroup.style.display = showSalaryStructure ? 'block' : 'none';

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

    elements.hasDisability.addEventListener('change', () => {
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
        lifeAssuranceRelief: 0,
        dependentRelief: 0,
        disabilityRelief: 0,
        totalReliefs: 0,
        totalDeductions: 0,
        takeHome: 0,
        effectiveRate: 0
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
