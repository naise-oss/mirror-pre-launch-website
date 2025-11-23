# Netlify Setup Guide

Your website is deployed on Netlify. Here's how to set it up properly:

## Step 1: Get Upstash Redis Credentials

1. Go to [upstash.com](https://upstash.com) and sign up/login
2. Click "Create Database"
3. Choose "Redis" 
4. Name it: `mirror-redis`
5. Select region closest to you
6. Click "Create"
7. After creation, you'll see:
   - **UPSTASH_REDIS_REST_URL** (copy this)
   - **UPSTASH_REDIS_REST_TOKEN** (copy this)

## Step 2: Add Environment Variables to Netlify

1. Go to your Netlify dashboard
2. Click on your project: `mirrorapp.in`
3. Go to **Site configuration** → **Environment variables**
4. Click **"Add a variable"**
5. Add these variables:

   **Variable 1:**
   - Key: `UPSTASH_REDIS_REST_URL`
   - Value: (paste the URL from Upstash)
   - Scopes: Production, Deploy previews, Branch deploys

   **Variable 2:**
   - Key: `UPSTASH_REDIS_REST_TOKEN`
   - Value: (paste the token from Upstash)
   - Scopes: Production, Deploy previews, Branch deploys

   **Variable 3:**
   - Key: `ADMIN_PASSWORD`
   - Value: `naise444`
   - Scopes: Production, Deploy previews, Branch deploys

6. Click **"Save"** after each variable

## Step 3: Configure Build Settings (if needed)

1. Go to **Site configuration** → **Build & deploy**
2. Make sure:
   - **Build command**: `npm run build` or `pnpm build`
   - **Publish directory**: `.next`
   - **Node version**: 18.x or higher

## Step 4: Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to finish

## Step 5: Test

1. Visit `mirrorapp.in`
2. Submit an email
3. You should see: "Thank you! We'll be in touch with you soon."
4. Go to `/admin` and login with password `naise444`
5. Check if the email appears in the list

---

## Troubleshooting

**Still getting 404?**
- Make sure your domain DNS is pointing to Netlify
- Check Netlify → Domain management → DNS settings

**Emails not saving?**
- Verify environment variables are set correctly
- Check Netlify → Deploys → Function logs for errors
- Make sure Upstash Redis database is active

**Build failing?**
- Check Netlify → Deploys → Build logs
- Make sure Node version is 18+ in Netlify settings

