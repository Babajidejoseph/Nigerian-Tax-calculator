# GITHUB PAGES DEPLOYMENT GUIDE

## Quick Deploy to GitHub Pages (5 minutes!)

GitHub Pages is a free hosting service for static websites directly from your GitHub repository.

---

## Prerequisites

- GitHub account (create at [github.com/signup](https://github.com/signup))
- Git installed on your computer

---

## Step 1: Create GitHub Repository (2 minutes)

### 1.1 Create Repository on GitHub

1. Go to [github.com](https://github.com)
2. Log in to your account
3. Click the **+** icon (top right) → **New repository**
4. Fill in details:
   - **Repository name:** `Nigerian-Tax-calculator` (or your choice)
   - **Description:** Nigerian Tax Calculator - NTA 2025 Compliant
   - **Public** (required for free GitHub Pages)
   - ❌ **Don't** check "Add README" (we already have one)
5. Click **Create repository**

### 1.2 Copy Repository URL

On the next page, you'll see a URL like:
```
https://github.com/YOUR-USERNAME/Nigerian-Tax-calculator.git
```
**Copy this URL** - you'll need it in the next step.

---

## Step 2: Push Your Code to GitHub (2 minutes)

### 2.1 Check Git Status

Open your terminal/command prompt in your project folder:

```bash
cd "c:\Users\USER\Antigravity\Nigerian Tax calculator"
git status
```

### 2.2 Stage All Files

```bash
git add .
```

### 2.3 Commit Your Changes

```bash
git commit -m "Initial commit - Nigerian Tax Calculator with email capture"
```

### 2.4 Add GitHub Remote

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/Nigerian-Tax-calculator.git
```

Or if you already have a remote named "origin", update it:

```bash
git remote set-url origin https://github.com/YOUR-USERNAME/Nigerian-Tax-calculator.git
```

### 2.5 Push to GitHub

For the first push (if main branch):
```bash
git branch -M main
git push -u origin main
```

Or if you already have a branch:
```bash
git push -u origin master
```

**You may be prompted for your GitHub username and password/token.**

---

## Step 3: Enable GitHub Pages (1 minute)

### 3.1 Go to Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)

### 3.2 Configure GitHub Pages

1. Under **Source**, select:
   - **Branch:** `main` (or `master`)
   - **Folder:** `/ (root)`
2. Click **Save**

### 3.3 Get Your Live URL

After ~1 minute, your site will be live at:
```
https://YOUR-USERNAME.github.io/Nigerian-Tax-calculator/
```

GitHub will show this URL at the top of the Pages settings.

---

## Step 4: Test Your Site (2 minutes)

1. Visit your GitHub Pages URL
2. ✅ Verify email modal appears
3. ✅ Submit a test email
4. ✅ Check your Google Sheet for the email
5. ✅ Use the calculator
6. ✅ Test on mobile

---

## Your Site URLs

**GitHub Pages URL:**
```
https://YOUR-USERNAME.github.io/Nigerian-Tax-calculator/
```

**Repository URL:**
```
https://github.com/YOUR-USERNAME/Nigerian-Tax-calculator
```

---

## Custom Domain (Optional)

### Using Your Own Domain

1. In GitHub Pages settings, click **Add a custom domain**
2. Enter your domain: `taxcalculator.workmerate.com`
3. Click **Save**
4. In your domain provider (Namecheap, GoDaddy, etc.):
   - Add a **CNAME** record pointing to: `YOUR-USERNAME.github.io`
   - Or add **A** records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

5. Wait for DNS propagation (up to 24 hours)
6. Enable **Enforce HTTPS** in GitHub Pages settings

---

## Updating Your Site

When you make changes to your code:

```bash
# 1. Make your changes to files

# 2. Stage changes
git add .

# 3. Commit
git commit -m "Description of changes"

# 4. Push to GitHub
git push

# 5. GitHub Pages auto-updates in ~1 minute
```

---

## Troubleshooting

### Push Rejected?

**Error:** `failed to push some refs to github.com`

**Solution:**
```bash
git pull origin main --rebase
git push
```

### Authentication Failed?

**For HTTPS (recommended):**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token** → **Classic**
3. Give it a name, check **repo** scope
4. Copy the token
5. Use token as password when pushing

**Alternative - SSH:**
Follow GitHub's [SSH key guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Site Not Loading?

**Check build status:**
1. Go to repository **Actions** tab
2. Look for successful deployment
3. If failed, check for errors

**Common fixes:**
- Wait 2-3 minutes after enabling Pages
- Make sure `index.html` is in the root folder
- Check that repository is **Public**
- Try disabling and re-enabling GitHub Pages

### Email Modal Not Working?

- Verify `email-capture.js` has the correct Google Sheets URL
- Check browser console (F12) for errors
- Clear browser cache and reload

### Need to Test Modal Again?

Open browser console (F12) and run:
```javascript
localStorage.clear()
location.reload()
```

---

## GitHub Pages Features (Free)

✅ **Unlimited Static Hosting** - No bandwidth limits  
✅ **Free HTTPS** - Secure SSL certificate  
✅ **Custom Domain** - Use your own domain  
✅ **Auto-Deploy** - Updates automatically on push  
✅ **Version Control** - Track all changes  
✅ **Collaboration** - Share code with team  

---

## Limitations

⚠️ **Repository must be Public** (for free accounts)  
⚠️ **1GB repository size limit**  
⚠️ **100GB monthly bandwidth** (soft limit)  
⚠️ **10 builds per hour**  

For most use cases, these limits are more than sufficient!

---

## Next Steps After Deployment

### 1. Share Your Link
- Social media
- Email signature
- WhatsApp
- Business cards

### 2. Monitor Leads
- Check Google Sheet regularly
- Export to email marketing tool
- Follow up with leads

### 3. Update Content
- Add more tax information
- Update for new tax laws
- Improve calculator features

---

## Comparison: GitHub Pages vs Netlify

| Feature | GitHub Pages | Netlify |
|---------|-------------|---------|
| **Cost** | Free | Free |
| **Custom Domain** | Yes | Yes |
| **HTTPS** | Yes | Yes |
| **Build Time** | ~1 min | ~30 sec |
| **Easy Update** | Git push | Drag & drop or Git |
| **Form Handling** | No (we use Google Sheets) | Built-in |
| **Analytics** | No | Basic (free) |
| **Requires Account** | GitHub | Netlify |

**Bottom Line:** Both are excellent. GitHub Pages is great if you're already using Git!

---

## Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Basics](https://git-scm.com/doc)
- [GitHub Help](https://support.github.com)

---

## Summary

**Total Time:** ~5 minutes

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Enable GitHub Pages
4. ✅ Test live site

**Your URL:** `https://YOUR-USERNAME.github.io/Nigerian-Tax-calculator/`

**Ready to share with the world!** 🚀

---

Need help? Check the main `README.md` or open an issue on your GitHub repository.
