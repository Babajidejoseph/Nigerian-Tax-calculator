# Nigerian Tax Calculator

A modern, user-friendly web application for calculating Nigerian taxes based on the National Tax Act (NTA) 2025. Calculate PAYE, pension contributions, NHF, NSITF, and various tax reliefs instantly.

## Features

- 🧮 **Accurate Tax Calculations** - Based on NTA 2025 tax brackets
- 💼 **Multiple Income Types** - Salary, commission, business, investment income
- 🏠 **Tax Relief Support** - Rent, life insurance, dependents, disability relief
- 📊 **Detailed Breakdown** - See exactly where your money goes
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 📧 **Email Lead Generation** - Collect user emails for marketing

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Design:** Glassmorphic UI with WorkMerate brand colors
- **Email Storage:** Google Sheets integration
- **Deployment:** Netlify
- **Fonts:** Inter (Google Fonts)

## Local Development

1. Clone this repository
2. Open `index.html` in your browser
3. Start calculating taxes!

No build process required - it's pure HTML, CSS, and JavaScript.

## Deployment

This project is configured for Netlify deployment:

### Option 1: Drag & Drop (Easiest)
1. Go to [Netlify](https://www.netlify.com/)
2. Sign up for a free account
3. Drag the entire project folder to Netlify's drop zone
4. Your site will be live in seconds!

### Option 2: GitHub Integration
1. Push this code to a GitHub repository
2. Connect your GitHub account to Netlify
3. Select the repository
4. Netlify will auto-deploy on every push

## Google Sheets Integration Setup

To collect emails, you need to set up Google Sheets:

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Tax Calculator Leads"
3. Add headers in row 1: `Email`, `Timestamp`, `Source`

### Step 2: Create Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any default code
3. Copy the code from `google-apps-script.js` file
4. Click **Deploy** > **New Deployment**
5. Choose type: **Web app**
6. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy** and copy the Web App URL

### Step 3: Update Configuration
1. Open `email-capture.js`
2. Find line 6: `googleSheetsURL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'`
3. Replace with your Web App URL
4. Save and redeploy to Netlify

## File Structure

```
nigerian-tax-calculator/
├── index.html              # Main HTML file
├── styles.css              # Main stylesheet
├── calculator.js           # Tax calculation logic
├── email-modal.css         # Email modal styling
├── email-capture.js        # Email capture & Google Sheets integration
├── logo.png                # WorkMerate logo
├── netlify.toml           # Netlify configuration
├── google-apps-script.js  # Google Apps Script code (reference)
└── README.md              # This file
```

## Email Lead Retrieval

Once deployed and configured:

1. Emails are automatically saved to your Google Sheet
2. Access your sheet at any time to view leads
3. Export to CSV for use in email marketing tools
4. Each submission includes:
   - Email address
   - Timestamp
   - Source (for tracking)

## Tax Calculation Features

### Income Types
- Employment Salary
- Commission Income
- Lump Sum Payment
- Business Income
- Investment Income
- Rental Income
- Gift/Inheritance

### Deductions Supported
- PAYE (Progressive tax brackets)
- Pension Contribution (8%)
- NHF - National Housing Fund (2.5%)
- NSITF - Nigeria Social Insurance Trust Fund (1%)

### Tax Reliefs
- Rent Relief (up to ₦500,000 or 20% of rent)
- Life Insurance Premium
- Dependent Relief (₦100,000 per dependent, max 4)
- Disability Relief (₦500,000)
- NHIS Contribution
- Loan Interest for Owner-Occupied House

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- All modern mobile browsers

## License

© 2025 WorkMerate. All rights reserved.

## Support

For issues or questions, contact WorkMerate support.

---

**Powered by WorkMerate** | Based on National Tax Act (NTA) 2025
