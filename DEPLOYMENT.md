# GitHub Pages Deployment Guide

This guide will help you deploy your Base Ticket Forge application to GitHub Pages.

## Prerequisites

- A GitHub repository (already set up)
- Code pushed to the `main` branch

## Step-by-Step Deployment

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Push Your Code

The GitHub Actions workflow will automatically trigger when you push to the `main` branch:

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to monitor the progress
4. Wait for it to complete (usually takes 2-3 minutes)

### 4. Access Your Site

Once deployment is complete, your site will be available at:
`https://lucasvanderlein.github.io/baseticket/`

## Troubleshooting

### Common Issues

1. **Build Fails**: Check the Actions tab for error details
2. **Site Not Loading**: Ensure the base path is correct in `vite.config.ts`
3. **404 Errors**: Make sure all routes are properly configured for SPA

### Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build:prod

# Test locally
npm run preview:prod

# The dist/ folder contains your built files
```

### Configuration Files

- **Workflow**: `.github/workflows/deploy.yml`
- **Vite Config**: `vite.config.ts` (base path configured)
- **Package Scripts**: `package.json` (build scripts added)

## Next Steps

After successful deployment:

1. Test all functionality on the live site
2. Update any hardcoded URLs if needed
3. Consider setting up a custom domain if desired
4. Monitor the Actions tab for future deployments

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your repository settings
3. Ensure all dependencies are properly installed
4. Check the browser console for any runtime errors
