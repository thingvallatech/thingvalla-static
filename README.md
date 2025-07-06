# Thingvalla Static Landing Page

A clean, responsive landing page for thingvalla.tech that provides access to containerized applications.

## Deployment to Porkbun Static Hosting

### Option 1: FTP Upload
1. Use FTP credentials from Porkbun dashboard:
   - Host: `pixie-ftp.porkbun.com`
   - Username: `thingvalla.tech`
   - Password: (from dashboard)

2. Upload files to root directory:
   ```
   index.html
   styles.css
   ```

### Option 2: GitHub Connect (Recommended)
1. Create a GitHub repository
2. Push this static-site folder contents to the repo
3. In Porkbun dashboard, connect to GitHub repo
4. Auto-deploy on push

### Subdomain Configuration
Configure these subdomains in Porkbun DNS:
- `heimdall.thingvalla.tech` → Point to your container server IP
- `rackmap.thingvalla.tech` → Point to RackMap app container server IP

## Features
- Responsive design (mobile, tablet, desktop)
- Modern gradient styling
- Clean navigation to containerized apps
- SEO-friendly structure