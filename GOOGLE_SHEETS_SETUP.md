# GOOGLE SHEETS SETUP GUIDE

## Quick Setup (5 minutes)

Follow these steps to connect your Tax Calculator to Google Sheets for email collection:

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: **Tax Calculator Leads**
4. In Row 1, add these headers:
   - Cell A1: `Email`
   - Cell B1: `Timestamp`
   - Cell C1: `Source`

Your sheet should look like this:
```
| Email | Timestamp | Source |
|-------|-----------|--------|
```

### Step 2: Create Apps Script Web App

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a code editor with some default code
3. **Delete all the default code**
4. Open the file `google-apps-script.js` from your project folder
5. **Copy all the code** from `google-apps-script.js`
6. **Paste it** into the Apps Script editor
7. Click the **Save** icon (💾) or press `Ctrl+S`
8. Name your project: **Tax Calculator Email Handler**

### Step 3: Deploy as Web App

1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Configure the deployment:
   - **Description:** Tax Calculator Email Collector
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
6. Click **Deploy**
7. You may need to authorize the app:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to Tax Calculator Email Handler (unsafe)**
   - Click **Allow**
8. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/...`)

### Step 4: Update Your Calculator

1. Open the file: `email-capture.js`
2. Find **line 6** (the CONFIG section)
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web App URL

**Before:**
```javascript
const CONFIG = {
    googleSheetsURL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    ...
```

**After:**
```javascript
const CONFIG = {
    googleSheetsURL: 'https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE/exec',
    ...
```

4. **Save the file**

### Step 5: Deploy to Netlify

Now you're ready to deploy! See `NETLIFY_DEPLOYMENT.md` for deployment instructions.

---

## Testing Your Setup

After deploying to Netlify:

1. Visit your live website
2. Enter a test email address
3. Click "Continue to Calculator"
4. Check your Google Sheet - you should see the email appear!

**Example result in sheet:**
```
| Name           | Email              | Timestamp                | Consent             | Source                    |
|----------------|--------------------|--------------------------|---------------------|---------------------------|
| John Doe       | test@example.com   | 2026-01-27T09:54:12.000Z | NDPA 2023 - Granted | Nigerian Tax Calculator   |
```

---

## Accessing Your Emails

### View in Google Sheets
1. Go to [Google Sheets](https://sheets.google.com)
2. Open "Tax Calculator Leads"
3. All emails are there with timestamps

### Export to CSV
1. Open your Google Sheet
2. Click **File** → **Download** → **Comma Separated Values (.csv)**
3. Import into your email marketing tool (Mailchimp, SendGrid, etc.)

### Use Google Sheets API
You can also connect Google Sheets to:
- Mailchimp (via Zapier)
- ActiveCampaign
- HubSpot
- Any email marketing platform

---

## Troubleshooting

### Emails Not Appearing in Sheet?

1. **Check the Web App URL:**
   - Make sure you copied the complete URL
   - It should end with `/exec`
   - Should start with `https://script.google.com/macros/s/`

2. **Check Apps Script Permissions:**
   - Go to Apps Script editor
   - Click **Deploy** → **Manage deployments**
   - Verify "Who has access" is set to **Anyone**

3. **Redeploy:**
   - In Apps Script, click **Deploy** → **Manage deployments**
   - Click ✏️ Edit
   - Click **Deploy** (this creates a new version)
   - Copy the new URL and update `email-capture.js`

4. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for any error messages

### Need to Update the Script?

1. Make changes in Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click ✏️ Edit on your deployment
4. Change version to **New version**
5. Click **Deploy**
6. The URL stays the same (no need to update `email-capture.js`)

---

## Privacy & Security

✅ **Secure:** Google Apps Script runs on Google's secure infrastructure  
✅ **Private:** Only you can access the Google Sheet  
✅ **GDPR Compliant:** You control the data  
✅ **No Cost:** Completely free with Google account  

---

## Next Steps

Once your Google Sheets is set up:
1. ✅ Configure the Web App URL in `email-capture.js`
2. 📤 Deploy to Netlify (see `NETLIFY_DEPLOYMENT.md`)
3. 🧪 Test with a real email
4. 📧 Start collecting leads!

Need help? Check the main `README.md` for more information.
