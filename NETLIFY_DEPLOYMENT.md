# NETLIFY DEPLOYMENT GUIDE

## Quick Deploy (2 minutes!)

The easiest way to deploy your Nigerian Tax Calculator to the web.

---

## Option 1: Drag & Drop Deploy (Recommended - No Account Required Initially)

### Steps:

1. **Go to Netlify**
   - Visit [netlify.com/drop](https://app.netlify.com/drop)

2. **Prepare Your Files**
   - Open your project folder: `c:\Users\USER\Antigravity\Nigerian Tax calculator`
   - Make sure all files are ready:
     - ✅ `index.html`
     - ✅ `styles.css`
     - ✅ `calculator.js`
     - ✅ `email-modal.css`
     - ✅ `email-capture.js`
     - ✅ `logo.png`
     - ✅ `netlify.toml`

3. **Drag & Drop**
   - Select ALL files in your project folder
   - Drag them onto the Netlify drop zone
   - Netlify will upload and deploy automatically

4. **Get Your URL**
   - After ~30 seconds, you'll get a URL like: `https://random-name-12345.netlify.app`
   - Your site is LIVE! 🎉

5. **Sign Up (Optional)**
   - Create a free Netlify account to:
     - Keep your site permanently
     - Get a custom domain
     - View analytics
     - Make updates easily

---

## Option 2: Deploy via Netlify Dashboard (Recommended for Long-term)

### Prerequisites:
- Free Netlify account ([Sign up here](https://app.netlify.com/signup))

### Steps:

1. **Create Account**
   - Go to [netlify.com](https://www.netlify.com/)
   - Click **Sign Up** (free forever)
   - Sign up with email or GitHub

2. **Deploy Your Site**
   - Log in to Netlify
   - Click **Add new site** → **Deploy manually**
   - Drag your entire project folder
   - Wait for deployment (~30 seconds)

3. **Your Site is Live!**
   - You'll get a URL like: `https://clever-name-123456.netlify.app`
   - Click the URL to view your live calculator

4. **Customize Site Name (Optional)**
   - Go to **Site settings** → **Site details**
   - Click **Change site name**
   - Enter a custom name: `nigerian-tax-calculator`
   - Your URL becomes: `https://nigerian-tax-calculator.netlify.app`

5. **Add Custom Domain (Optional)**
   - Go to **Domain settings**
   - Click **Add custom domain**
   - Follow instructions to connect your domain
   - Example: `taxcalculator.workmerate.com`

---

## Option 3: Deploy via GitHub (For Developers)

### Prerequisites:
- GitHub account
- Git installed on your computer

### Steps:

1. **Create GitHub Repository**
   ```bash
   cd "c:\Users\USER\Antigravity\Nigerian Tax calculator"
   git init
   git add .
   git commit -m "Initial commit - Nigerian Tax Calculator"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code

3. **Connect Netlify to GitHub**
   - Log in to Netlify
   - Click **Add new site** → **Import an existing project**
   - Choose **GitHub**
   - Select your repository
   - Click **Deploy site**

4. **Auto-Deploy on Updates**
   - Every time you push to GitHub, Netlify auto-deploys
   - Great for ongoing updates!

---

## After Deployment

### 1. Test Your Site

Visit your Netlify URL and verify:
- ✅ Page loads correctly
- ✅ Email modal appears
- ✅ Can submit email (test with your own email)
- ✅ Calculator works after email submission
- ✅ All styling looks good
- ✅ Works on mobile

### 2. Verify Email Collection

1. Submit a test email on your live site
2. Check your Google Sheet
3. Confirm the email appears with timestamp

### 3. Share Your Link

Your calculator is now accessible worldwide!
- Share the link: `https://your-site.netlify.app`
- Add to your website
- Share on social media
- Include in email signatures

---

## Updating Your Site

### If Deployed via Drag & Drop:
1. Make changes to your local files
2. Go to Netlify **Deploys** tab
3. Drag & drop the updated files
4. Site updates automatically

### If Deployed via GitHub:
1. Make changes to your local files
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update email modal styling"
   git push
   ```
3. Netlify auto-deploys the changes

### If Using Netlify Dashboard:
1. Make changes to your local files
2. Go to **Deploys** tab in Netlify
3. Scroll to bottom and drag new files to replace old ones

---

## Custom Domain Setup (Optional)

### Using Your Own Domain:

1. **Purchase a Domain** (if you don't have one)
   - Namecheap, GoDaddy, Google Domains, etc.
   - Example: `taxcalculator.com`

2. **Add to Netlify**
   - Go to **Domain settings**
   - Click **Add custom domain**
   - Enter your domain
   - Follow DNS configuration instructions

3. **Configure DNS**
   - Add Netlify's nameservers to your domain provider
   - OR create an A record/CNAME pointing to Netlify

4. **Enable HTTPS**
   - Netlify provides free SSL certificates
   - Auto-enabled after DNS configuration

---

## Netlify Features You Get (Free)

✅ **Instant Global CDN** - Fast loading worldwide  
✅ **Free HTTPS** - Secure SSL certificate  
✅ **Automatic Deploys** - With GitHub integration  
✅ **Form Handling** - Built-in form support  
✅ **Analytics** - Basic traffic stats  
✅ **Custom Domain** - Use your own domain  
✅ **Deploy Previews** - Test changes before going live  

---

## Troubleshooting

### Site Not Loading?
- Check all files uploaded correctly
- Verify `index.html` exists in root folder
- Check browser console for errors (F12)

### Email Modal Not Working?
- Verify `email-capture.js` has correct Google Sheets URL
- Check browser console for errors
- Test Google Apps Script separately

### Need to Rollback?
- Go to **Deploys** tab
- Find previous deployment
- Click **Publish deploy** to revert

---

## Site URLs

After deployment, you'll have:

**Netlify URL:** `https://your-site-name.netlify.app`  
**Custom Domain (optional):** `https://your-domain.com`

Both URLs work the same way!

---

## Next Steps

1. ✅ Deploy to Netlify (you're doing this now!)
2. 🧪 Test the live site
3. 📧 Verify emails are being collected
4. 📱 Test on mobile devices
5. 🚀 Share your calculator with the world!

Need help? Check the main `README.md` or Netlify's [documentation](https://docs.netlify.com/).
