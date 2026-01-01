# Deployment Guide - Garden Room Calculator

## Prerequisites

1. **MailerLite Account** - Sign up at [mailerlite.com](https://www.mailerlite.com)
2. **Vercel Account** (or your preferred hosting) - Sign up at [vercel.com](https://vercel.com)
3. **GitHub Account** (for version control)

---

## Step 1: Set Up MailerLite

### Get Your API Key

1. Log in to your MailerLite account
2. Go to **Integrations** → **Developer API**
3. Click **Generate new token**
4. Copy the API key (starts with something like `ml_...`)
5. **Important:** Keep this secure - you'll need it for environment variables

### Get Your Group ID (Optional but Recommended)

1. In MailerLite, go to **Subscribers** → **Groups**
2. Create a new group called "Garden Room Leads" (or use existing)
3. Click on the group to view details
4. The Group ID is in the URL: `https://dashboard.mailerlite.com/groups/123456` (the number is your Group ID)
5. Copy this number

### Create Custom Fields (Optional)

To capture quote details, you can create custom fields in MailerLite:
1. Go to **Settings** → **Custom Fields**
2. Add fields like:
   - `floor_area` (Number)
   - `total_price` (Number)
   - `quote_notes` (Text)

---

## Step 2: Configure Environment Variables

### Local Development

1. Create a `.env` file in the root directory:
```env
VITE_MAILERLITE_API_KEY=your_api_key_here
VITE_MAILERLITE_GROUP_ID=your_group_id_here
```

2. Replace `your_api_key_here` with your actual MailerLite API key
3. Replace `your_group_id_here` with your Group ID (or leave empty if not using groups)

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `VITE_MAILERLITE_API_KEY` = `your_api_key_here`
   - `VITE_MAILERLITE_GROUP_ID` = `your_group_id_here` (optional)
4. Make sure to set them for **Production**, **Preview**, and **Development** environments
5. Click **Save**

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/garden-room-calculator.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project**
4. Import your GitHub repository
5. Vercel will auto-detect it's a Vite project
6. **Important:** Add your environment variables in the project settings before deploying
7. Click **Deploy**

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and add environment variables when asked

---

## Step 4: Verify Deployment

1. Visit your deployed site (Vercel will provide a URL)
2. Test the calculator:
   - Select a use case
   - Configure options
   - Submit the form with test data
3. Check your MailerLite account:
   - Go to **Subscribers**
   - Verify the test lead was added
   - Check that custom fields contain quote data

---

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `calculator.yourdomain.com`)
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

---

## Troubleshooting

### MailerLite Not Working

1. **Check API Key:** Ensure it's correct and active
2. **Check Group ID:** Verify the group exists and ID is correct
3. **Check Browser Console:** Look for error messages
4. **Test API Directly:** Use a tool like Postman to test the MailerLite API

### Build Errors

1. **Missing Dependencies:** Run `npm install` locally first
2. **Environment Variables:** Ensure all `VITE_` prefixed variables are set
3. **Check Build Logs:** Review Vercel deployment logs for specific errors

### Mobile Issues

1. **Test on Real Device:** Use Chrome DevTools device emulation
2. **Check Touch Targets:** All buttons should be at least 44px
3. **Viewport Meta:** Already included in `index.html`

---

## File Structure After Build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── images/
    └── [all your images]
```

The `dist` folder contains your production-ready files that Vercel will serve.

---

## Security Notes

- **Never commit `.env` file** - It's already in `.gitignore`
- **API Keys are public** - Since this is a frontend app, the MailerLite API key will be visible in the built JavaScript. This is normal for MailerLite's public API, but consider:
  - Using MailerLite's rate limiting
  - Setting up a simple backend proxy if you need extra security
- **Environment Variables** - Only `VITE_` prefixed variables are exposed to the frontend

---

## Next Steps

1. **Analytics:** Add Google Analytics or Plausible for tracking
2. **A/B Testing:** Test different CTA button text
3. **Email Templates:** Set up automated follow-up emails in MailerLite
4. **Lead Scoring:** Use MailerLite's automation to score leads based on quote value

---

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review Vercel deployment logs
3. Test MailerLite API directly
4. Verify all environment variables are set correctly

