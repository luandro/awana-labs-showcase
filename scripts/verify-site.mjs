// @ts-check
import { chromium } from 'playwright';

const SITE_URL = 'https://luandro.github.io/awana-labs-showcase/';

async function verifySite() {
  console.log(`🌐 Navigating to ${SITE_URL}`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Track console messages and errors
  const consoleLogs = [];
  const jsErrors = [];

  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
    if (msg.type() === 'error') {
      console.error(`❌ Console Error: ${msg.text()}`);
      jsErrors.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    console.error(`🚨 Page Error: ${error.message}`);
    jsErrors.push(error.message);
  });

  // Navigate to the site
  try {
    await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 15000 });
    console.log('✅ Page loaded successfully');
  } catch (error) {
    console.error(`❌ Failed to load page: ${error.message}`);
    await browser.close();
    return;
  }

  // Wait for content to load
  await page.waitForTimeout(3000);

  // Take a full page screenshot
  await page.screenshot({
    path: 'playwright-report/full-page-screenshot.png',
    fullPage: true
  });
  console.log('📸 Full page screenshot saved');

  // Check for projects section
  const projectsSection = await page.$('[data-testid="projects-section"]');
  if (projectsSection) {
    console.log('✅ Projects section found');
  } else {
    console.log('⚠️ Projects section not found (checking alternate selectors)');
    // Try alternate selectors
    const h2Elements = await page.$$('h2');
    for (const h2 of h2Elements) {
      const text = await h2.textContent();
      if (text && text.toLowerCase().includes('project')) {
        console.log(`✅ Found projects heading: "${text}"`);
        break;
      }
    }
  }

  // Look for CoMapeo project card
  const comapeoSelectors = [
    'text=CoMapeo',
    'text="CoMapeo Config Spreadsheet Plugin"',
    '[data-testid*="comapeo"]',
    '[data-testid*="project-card"]'
  ];

  let comapeoFound = false;
  for (const selector of comapeoSelectors) {
    try {
      const element = await page.$(selector);
      if (element) {
        console.log(`✅ CoMapeo project found using selector: ${selector}`);
        comapeoFound = true;

        // Get the text content of the project card
        const textContent = await element.textContent();
        console.log('📄 Project content preview:', textContent?.substring(0, 200));

        // Take a screenshot of just the project card
        await element.screenshot({ path: 'playwright-report/comapeo-project-card.png' });
        console.log('📸 CoMapeo project card screenshot saved');

        break;
      }
    } catch (e) {
      // Selector might not be valid, continue to next
    }
  }

  if (!comapeoFound) {
    console.log('⚠️ CoMapeo project not found with standard selectors');
    // Dump all project cards to help debug
    console.log('🔍 Searching for all project cards...');
    const allCards = await page.$$('[class*="card"], [class*="project"], article');
    console.log(`Found ${allCards.length} potential card elements`);
  }

  // Check for Digital Democracy organization
  const ddOrg = await page.$('text=Digital Democracy');
  if (ddOrg) {
    console.log('✅ Digital Democracy organization found');
  } else {
    console.log('⚠️ Digital Democracy organization not explicitly found');
  }

  // Check for status badges
  const badges = await page.$$('[class*="badge"], span[class*="status"]');
  console.log(`📊 Found ${badges.length} badge elements`);

  // Check for tags
  const tags = await page.$$('[class*="tag"]');
  console.log(`🏷️ Found ${tags.length} tag elements`);

  // Get page title
  const title = await page.title();
  console.log(`📝 Page title: "${title}"`);

  // Close browser
  await browser.close();

  // Summary report
  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION REPORT');
  console.log('='.repeat(60));
  console.log(`Site URL: ${SITE_URL}`);
  console.log(`Page Title: ${title}`);
  console.log(`JavaScript Errors: ${jsErrors.length}`);
  if (jsErrors.length > 0) {
    jsErrors.forEach(err => console.log(`  - ${err}`));
  }
  console.log(`Console Messages: ${consoleLogs.length}`);
  console.log(`Projects Section: ${projectsSection ? '✅ Found' : '⚠️ Not explicitly found'}`);
  console.log(`CoMapeo Project: ${comapeoFound ? '✅ Found' : '❌ Not found'}`);
  console.log(`Digital Democracy Org: ${ddOrg ? '✅ Found' : '⚠️ Not found'}`);
  console.log(`Badges Found: ${badges.length}`);
  console.log(`Tags Found: ${tags.length}`);
  console.log('\n📸 Screenshots saved:');
  console.log('  - playwright-report/full-page-screenshot.png');
  if (comapeoFound) {
    console.log('  - playwright-report/comapeo-project-card.png');
  }
  console.log('='.repeat(60));
}

verifySite().catch(console.error);
