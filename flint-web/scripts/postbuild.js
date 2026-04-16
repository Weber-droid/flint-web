// Copies marketing static files into the Vite build output.
// index.html is intentionally excluded — it would overwrite the React app entry point.
const { copyFileSync, existsSync } = require('fs')
const { join } = require('path')

const root = join(__dirname, '..')
const marketing = join(root, 'marketing')
const dist = join(root, 'frontend', 'dist')

const files = [
  'privacy.html',
  'terms.html',
  'license.html',
  'login.html',
  'signup.html',
  'forgot-password.html',
  'logo.svg',
  'icon.svg',
  'icon.png',
]

for (const file of files) {
  const src = join(marketing, file)
  if (existsSync(src)) {
    copyFileSync(src, join(dist, file))
    console.log(`  copied: ${file}`)
  } else {
    console.warn(`  skipped (not found): ${file}`)
  }
}

console.log('postbuild: marketing files copied to dist/')
