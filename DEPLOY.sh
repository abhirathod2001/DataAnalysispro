#!/bin/bash
# DataAnalysis Pro — GitHub + Vercel Deploy Script
# Run this from inside the project folder

echo "Step 1: Enter your GitHub Personal Access Token"
echo "(Get one at: GitHub → Settings → Developer settings → Personal access tokens → Tokens classic)"
echo "(Needs 'repo' scope)"
read -sp "GitHub PAT: " GH_TOKEN
echo ""

# Push to GitHub
git remote set-url origin "https://${GH_TOKEN}@github.com/abhirathod2001/DataAnalysispro.git"
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Code pushed to GitHub!"
  echo ""
  echo "Step 2: Vercel will auto-deploy if GitHub integration is connected."
  echo "If not, go to: https://vercel.com/new"
  echo "→ Import 'abhirathod2001/DataAnalysispro'"
  echo "→ Framework: Next.js (auto-detected)"
  echo "→ Click Deploy"
else
  echo "❌ Push failed. Check your token has 'repo' permissions."
fi
