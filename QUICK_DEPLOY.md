# Quick Deployment Guide

## 🚀 Recommended: Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mirror-pre-launch-website.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New Project"
3. Import your repository
4. Click "Deploy" (settings auto-detected)

### Step 3: Add Environment Variable
1. In Vercel → Your Project → Settings → Environment Variables
2. Add: `ADMIN_PASSWORD` = `naise444`
3. Click "Redeploy"

### Step 4: Connect Hostinger Domain
1. In Vercel → Your Project → Settings → Domains
2. Add your domain: `yourdomain.com`
3. Vercel shows DNS records to add
4. In Hostinger → DNS Management, add:
   - **A Record**: `@` → Vercel's IP (shown in Vercel)
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
5. Wait 24-48 hours for DNS to propagate

**Done!** Your site will be live at `yourdomain.com`

---

## 📋 Pre-Deployment Checklist

- [ ] Test build locally: `pnpm build && pnpm start`
- [ ] Test admin login at `/admin` with password `naise444`
- [ ] Test email submission forms
- [ ] Check all images load correctly
- [ ] Verify `.env.local` is in `.gitignore` (already done)
- [ ] Push code to GitHub
- [ ] Set `ADMIN_PASSWORD` environment variable in hosting platform

---

## 🔒 Security Reminders

- ✅ Password stored in environment variable (not in code)
- ✅ `.env.local` is in `.gitignore`
- ✅ Admin routes protected with authentication
- ✅ httpOnly cookies for sessions
- ⚠️ Enable HTTPS/SSL in production
- ⚠️ Use strong password in production (change from `naise444`)

---

## 🆘 Troubleshooting

**Build fails?**
- Run `pnpm install` to ensure all dependencies are installed
- Check for TypeScript errors (currently ignored in config)

**Domain not working?**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify domain is pointing to correct IP

**Admin login not working?**
- Verify `ADMIN_PASSWORD` environment variable is set
- Check it matches exactly: `naise444`
- Clear browser cookies and try again

**Emails not saving?**
- Check server has write permissions for `data/` folder
- Verify API routes are working: `/api/subscribe`
- Check server logs for errors

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Hostinger Support**: Check their knowledge base
- **Next.js Docs**: https://nextjs.org/docs

