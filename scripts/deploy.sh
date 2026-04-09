#!/bin/bash
# Deploy script for Unifinders Web to Vercel
# Usage: bash scripts/deploy.sh

set -e

echo "🚀 Unifinders Web Deployment Script"
echo "===================================="

# Step 1: Verify build
echo ""
echo "Step 1️⃣: Verifying local build..."
npm install
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Fix errors before deploying."
  exit 1
fi

echo "✅ Build successful!"

# Step 2: Commit changes
echo ""
echo "Step 2️⃣: Committing changes to DEV..."
git add .
git commit -m "fix: next.js 16 route params type & production ready" || echo "⚠️  No changes to commit (might already be committed)"
git push origin DEV

echo "✅ Changes pushed to DEV"

# Step 3: Create main branch
echo ""
echo "Step 3️⃣: Creating production branch (main)..."
git fetch origin --prune
git checkout DEV
git pull origin DEV

if git rev-parse --verify main >/dev/null 2>&1; then
  echo "Branch 'main' already exists locally. Updating..."
  git checkout main
  git pull origin main
else
  echo "Creating new 'main' branch..."
  git checkout -b main
fi

echo "Merging DEV into main..."
git merge --no-ff DEV -m "chore: promote DEV -> main for production deployment"

echo "✅ Main branch ready"

# Step 4: Push main
echo ""
echo "Step 4️⃣: Pushing main to GitHub..."
git push -u origin main

echo "✅ Main pushed to origin"

echo ""
echo "===================================="
echo "✨ Pre-deployment steps complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/arunchaudharyofc/unifinders-web"
echo "2. Connect the repo (if not already connected)"
echo "3. Add environment variables from DEPLOYMENT.md Section 4"
echo "4. Deploy from the main branch"
echo ""
echo "Or use Vercel CLI: vercel --prod"
