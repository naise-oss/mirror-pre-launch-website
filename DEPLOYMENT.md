# Deployment Guide for Mirror Pre-Launch Website

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers the best hosting experience for Next.js apps. It's free and you can connect your Hostinger domain.

### Steps:

1. **Prepare your code:**
   ```bash
   # Make sure all changes are committed
   git add .
   git commit -m "Ready for deployment"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git remote add origin https://github.com/yourusername/mirror-pre-launch-website.git
     git push -u origin main
     ```

3. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

4. **Add Environment Variables:**
   - In Vercel dashboard, go to your project → Settings → Environment Variables
   - Add: `ADMIN_PASSWORD` = `naise444`
   - Redeploy after adding

5. **Connect Your Hostinger Domain:**
   - In Vercel dashboard → Your Project → Settings → Domains
   - Add your domain (e.g., `yourdomain.com`)
   - Vercel will show DNS records to add
   - Go to Hostinger → DNS Management
   - Add these records:
     - Type: `A` Record
       - Name: `@`
       - Value: Vercel's IP (shown in Vercel dashboard)
     - Type: `CNAME` Record
       - Name: `www`
       - Value: `cname.vercel-dns.com`
   - Wait 24-48 hours for DNS propagation

---

## Option 2: Deploy to Hostinger VPS/Cloud Hosting

If you prefer to host directly on Hostinger:

### Prerequisites:
- Hostinger VPS or Cloud Hosting plan (shared hosting won't work for Node.js)
- SSH access to your server
- Node.js 18+ installed on server

### Steps:

1. **Build your Next.js app locally:**
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. **Upload files to Hostinger:**
   - Use File Manager or FTP/SFTP
   - Upload these folders/files:
     - `.next/` (build output)
     - `public/`
     - `package.json`
     - `package-lock.json` or `pnpm-lock.yaml`
     - `next.config.mjs`
     - `tsconfig.json`
     - `app/`
     - `components/`
     - `lib/`
     - `styles/`
     - `hooks/`

3. **SSH into your Hostinger server:**
   ```bash
   ssh username@your-server-ip
   ```

4. **Install dependencies:**
   ```bash
   cd /path/to/your/website
   npm install --production
   # or
   pnpm install --production
   ```

5. **Set up environment variables:**
   ```bash
   # Create .env.local file
   echo "ADMIN_PASSWORD=naise444" > .env.local
   echo "NODE_ENV=production" >> .env.local
   ```

6. **Install PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   ```

7. **Start your Next.js app:**
   ```bash
   pm2 start npm --name "mirror-website" -- start
   # or
   pm2 start pnpm --name "mirror-website" -- start
   ```

8. **Set up PM2 to start on reboot:**
   ```bash
   pm2 startup
   pm2 save
   ```

9. **Configure Nginx (if needed):**
   Create `/etc/nginx/sites-available/mirror-website`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

10. **Enable SSL (HTTPS):**
    - Use Hostinger's SSL certificate or Let's Encrypt
    - Update Nginx config to use port 443

11. **Point your domain:**
    - In Hostinger DNS, point your domain to your server IP
    - Add A record: `@` → Your server IP
    - Add A record: `www` → Your server IP

---

## Important Notes:

### Environment Variables:
Make sure to set these in production:
- `ADMIN_PASSWORD=naise444` (for admin login)
- `NODE_ENV=production`

### Data Storage:
- The `data/` folder will be created automatically
- Make sure the server has write permissions
- Consider backing up `data/subscribers.json` regularly

### Security:
- Never commit `.env.local` to git (already in .gitignore)
- Use strong passwords in production
- Enable HTTPS/SSL
- Keep dependencies updated

### Testing Before Going Live:
1. Test locally: `npm run build && npm start`
2. Test admin login at `/admin`
3. Test email submission forms
4. Check all images load correctly

---

## Quick Vercel Deployment (Recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add ADMIN_PASSWORD

# Deploy to production
vercel --prod
```

Then connect your Hostinger domain in Vercel dashboard.

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Hostinger Support: Check their knowledge base or contact support
- Next.js Deployment: https://nextjs.org/docs/deployment

