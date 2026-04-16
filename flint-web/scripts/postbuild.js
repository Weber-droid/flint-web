// Copies marketing static files into the Vite build output.
// index.html is intentionally excluded — it would overwrite the React app entry point.
const { copyFileSync, existsSync } = require('fs')
const { join } = require('path')

const root = join(__dirname, '..')
const marketing = join(root, 'marketing')
const dist = join(root, 'frontend', 'dist')

const files = [
  ['index.html', 'home.html'],   // marketing home → avoids overwriting React's index.html
  ['privacy.html', 'privacy.html'],
  ['terms.html', 'terms.html'],
  ['license.html', 'license.html'],
  ['login.html', 'login.html'],
  ['signup.html', 'signup.html'],
  ['forgot-password.html', 'forgot-password.html'],
  ['logo.svg', 'logo.svg'],
  ['icon.svg', 'icon.svg'],
  ['icon.png', 'icon.png'],
]

for (const [src, dest] of files) {
  const srcPath = join(marketing, src)
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, join(dist, dest))
    console.log(`  copied: ${src} → ${dest}`)
  } else {
    console.warn(`  skipped (not found): ${src}`)
  }
}

console.log('postbuild: marketing files copied to dist/')
