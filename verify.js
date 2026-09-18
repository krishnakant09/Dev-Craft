const fs = require('fs');
const path = require('path');

const dir = __dirname;
console.log('--- DevCraft Automated Verification Suite ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

// 1. Check Files
const htmlPath = path.join(dir, 'index.html');
const cssPath = path.join(dir, 'style.css');
const jsPath = path.join(dir, 'app.js');

assert(fs.existsSync(htmlPath), 'index.html exists');
assert(fs.existsSync(cssPath), 'style.css exists');
assert(fs.existsSync(jsPath), 'app.js exists');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');

// 2. Semantic HTML5 Structure Verification
assert(/<header[\s\S]*?class="site-header"/.test(html), 'Semantic <header> exists with site-header class');
assert(/<nav[\s\S]*?id="primary-nav"/.test(html), 'Semantic <nav> exists with primary-nav id');
assert(/<section[\s\S]*?class="hero-section"/.test(html), 'Semantic <section> for Hero exists');
assert(/<main[\s\S]*?class="main-wrapper"/.test(html), 'Semantic <main> tag exists');
assert(/<section[\s\S]*?class="tutorials-section"/.test(html), 'Semantic <section> for tutorials exists');
assert(/<article[\s\S]*?class="tutorial-card"/.test(html), 'Semantic <article> tags exist for tutorial cards');
assert((html.match(/<article[\s\S]*?class="tutorial-card"/g) || []).length >= 6, 'Contains at least 6 tutorial article cards');
assert(/<aside[\s\S]*?class="sidebar-section"/.test(html), 'Semantic <aside> tag exists for sidebar');
assert(/<footer[\s\S]*?class="site-footer"/.test(html), 'Semantic <footer> exists');

// 3. Required User Specs Verification
assert(/id="about-author"/.test(html), 'About the Author sidebar section exists');
assert(/Alex Vance/.test(html), 'Author name exists in sidebar');
assert(/class="hero-cta-group"/.test(html), 'Hero section has call-to-action button group');
assert(/class="hamburger-btn"/.test(html), 'Responsive hamburger toggle button exists');
assert(/class="tutorials-grid"/.test(html), 'Grid container for recent tutorials exists');

// 4. ARIA and Accessibility Attributes
assert(/aria-label=/.test(html), 'Contains accessible aria-label attributes');
assert(/aria-expanded=/.test(html), 'Hamburger button contains aria-expanded attribute');
assert(/aria-controls=/.test(html), 'Hamburger button contains aria-controls attribute');
assert(/role="tablist"/.test(html), 'Category filters have role="tablist"');
assert(/role="tab"/.test(html), 'Category filter buttons have role="tab"');
assert(/<h1[\s\S]*?<\/h1>/.test(html), 'Contains <h1> heading element');
assert((html.match(/<h1[\s>]/g) || []).length === 1, 'Contains exactly one single <h1> per best practices');

// 5. CSS Grid and Flexbox Usage
assert(/display:\s*grid/.test(css), 'style.css utilizes CSS Grid (display: grid)');
assert(/grid-template-columns:\s*minmax\(0,\s*1fr\)\s*340px/.test(css), 'Primary two-column desktop layout uses CSS Grid');
assert(/display:\s*flex/.test(css), 'style.css utilizes Flexbox (display: flex)');
assert(/gap:\s*/.test(css), 'Uses modern gap property for layouts');
assert(/position:\s*sticky/.test(css), 'Sticky header or sidebar implemented');

// 6. CSS Media Queries for Responsive Design
assert(/@media[\s\S]*?max-width:\s*1024px/.test(css), 'Media query for tablet/laptop (<= 1024px) exists');
assert(/@media[\s\S]*?max-width:\s*880px/.test(css), 'Media query for medium screen/sidebar collapse (<= 880px) exists');
assert(/@media[\s\S]*?max-width:\s*768px/.test(css), 'Media query for mobile breakpoint (<= 768px) exists');
assert(/@media[\s\S]*?max-width:\s*480px/.test(css), 'Media query for small mobile devices (<= 480px) exists');

// 7. JavaScript Interactivity
assert(/initThemeToggle/.test(js), 'JS includes theme switcher logic');
assert(/initMobileNav/.test(js), 'JS includes responsive mobile navigation drawer logic');
assert(/initCategoryFilters/.test(js), 'JS includes tutorial category filtering');
assert(/initNewsletterForm/.test(js), 'JS includes newsletter form handling');

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('SOME CHECKS FAILED!');
  process.exit(1);
}
