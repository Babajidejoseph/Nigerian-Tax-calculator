# 🚀 QUICK START GUIDE - Get Live in 12 Minutes!

Your Nigerian Tax Calculator is ready to deploy! Follow these 3 simple steps:

---

## ⚡ Step 1: Google Sheets Setup (5 minutes)

### 1.1 Create the Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank**
3. Name it: **Tax Calculator Leads**
4. Add headers in Row 1:
   - Cell A1: `Email`
   - Cell B1: `Timestamp`  
   - Cell C1: `Source`

### 1.2 Set Up Apps Script
1. Click **Extensions** → **Apps Script**
2. Delete all default code
3. Open `google-apps-script.js` from your project folder
4. Copy ALL the code
5. Paste into Apps Script editor
6. Click **Save** (💾)

### 1.3 Deploy
1. Click **Deploy** → **New deployment**
2. Click ⚙️ next to "Select type"
3. Choose **Web app**
4. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**
6. Authorize (click through the warnings)
7. **COPY THE WEB APP URL** (looks like: `https://script.google.com/macros/s/.../exec`)

### 1.4 Update Your Code
1. Open: `email-capture.js`
2. Go to **Line 6**
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your URL
4. Save

✅ **Done!** Emails will now save to your sheet.

---

## 🌐 Step 2: Deploy to Netlify (2 minutes)

### Quick Deploy (No Account)
1. Go to: [netlify.com/drop](https://app.netlify.com/drop)
2. Drag your **entire project folder** to the drop zone
3. Wait ~30 seconds
4. **COPY YOUR LIVE URL!** (e.g., `https://random-name.netlify.app`)

### OR With Account (For Custom Name)
1. Sign up at [netlify.com](https://www.netlify.com/)
2. Click **Add new site** → **Deploy manually**
3. Drag your project folder
4. Go to **Site settings** → **Change site name**
5. Choose a name: `nigerian-tax-calculator`
6. Your URL: `https://nigerian-tax-calculator.netlify.app`

✅ **Done!** Your site is LIVE!

---

## ✅ Step 3: Test It (5 minutes)

1. Visit your live URL
2. Email modal should appear ✅
3. Enter a test email
4. Click "Continue to Calculator" ✅
5. See success message ✅
6. Calculator becomes active ✅
7. Check your Google Sheet - email appears! ✅
8. Refresh page - no modal (you're remembered) ✅

---

## 🎉 YOU'RE LIVE!

**Share your calculator:**
- Social media
- WhatsApp
- Email signature
- Business cards

**Access your leads:**
- Open your Google Sheet anytime
- Export to CSV for email marketing
- Connect to Mailchimp/HubSpot via Zapier

---

## 📚 Need More Help?

Detailed guides available:
- **Google Sheets:** `GOOGLE_SHEETS_SETUP.md`
- **Netlify:** `NETLIFY_DEPLOYMENT.md`
- **Overview:** `README.md`

---

## 🆘 Troubleshooting

**Modal not showing?**
- Clear browser cache
- Open in incognito mode
- Check browser console (F12)

**Email not in sheet?**
- Verify Web App URL in `email-capture.js` line 6
- Check Apps Script permissions
- Make sure URL ends with `/exec`

**Need to test again?**
- Open browser console (F12)
- Type: `localStorage.clear()`
- Refresh page

---

## ⏱️ Timeline Recap

- ✅ **5 min** - Google Sheets setup
- ✅ **2 min** - Netlify deployment  
- ✅ **5 min** - Testing

**Total: 12 minutes** to go from local to live! 🚀

---

**Ready? Start with Step 1 above!**
