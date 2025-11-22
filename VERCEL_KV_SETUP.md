# Vercel KV Setup Guide

Your website now uses Vercel KV (Redis) for storing email subscriptions in production. This is required for the website to work on Vercel.

## Quick Setup (2 minutes):

1. **Go to Vercel Dashboard:**
   - Open your project: https://vercel.com/dashboard
   - Click on your project: `mirror-pre-launch-website`

2. **Create Vercel KV Database:**
   - Go to **Storage** tab (in the left sidebar)
   - Click **"Create Database"**
   - Select **"KV"** (Key-Value store)
   - Name it: `mirror-kv` (or any name)
   - Select region closest to you
   - Click **"Create"**

3. **Link KV to Your Project:**
   - After creating, click **"Link to Project"**
   - Select your `mirror-pre-launch-website` project
   - Click **"Link"**

4. **Environment Variables (Auto-added):**
   - Vercel automatically adds these environment variables:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - You don't need to add them manually!

5. **Redeploy:**
   - Go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger auto-deploy

## That's it! 

Your website will now:
- ✅ Save emails to Vercel KV (persistent storage)
- ✅ Show professional success message: "We'll be in touch with you soon"
- ✅ Display all emails in `/admin` page

## Testing:

1. Visit your live website: `mirrorapp.in`
2. Submit an email through any form
3. You should see: "Thank you! We'll be in touch with you soon."
4. Go to `/admin` and login with password `naise444`
5. You should see the email in the list!

---

## Troubleshooting:

**Emails not saving?**
- Make sure Vercel KV is created and linked to your project
- Check that environment variables `KV_REST_API_URL` and `KV_REST_API_TOKEN` exist
- Redeploy after linking KV

**Still seeing errors?**
- Check Vercel logs: Project → Logs tab
- Make sure you've redeployed after setting up KV

