const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

async function testHubDashboard() {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    defaultViewport: { width: 1920, height: 1080 },
  })

  const page = await browser.newPage()

  // Arrays to store console messages
  const consoleErrors = []
  const consoleWarnings = []
  const consoleMessages = []
  const networkFailures = []

  // Monitor console messages
  page.on('console', msg => {
    const type = msg.type()
    const text = msg.text()
    const location = msg.location()

    const logEntry = {
      type,
      text,
      location: location
        ? `${location.url}:${location.lineNumber}:${location.columnNumber}`
        : 'unknown',
    }

    if (type === 'error') {
      consoleErrors.push(logEntry)
      console.log(`❌ Console Error: ${text}`)
    } else if (type === 'warning') {
      consoleWarnings.push(logEntry)
      console.log(`⚠️  Console Warning: ${text}`)
    } else {
      consoleMessages.push(logEntry)
      console.log(`ℹ️  Console: ${text}`)
    }
  })

  // Monitor network failures
  page.on('response', response => {
    if (!response.ok()) {
      const failure = {
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
      }
      networkFailures.push(failure)
      console.log(`🌐 Network Error: ${response.status()} ${response.url()}`)
    }
  })

  // Monitor page errors
  page.on('pageerror', error => {
    consoleErrors.push({
      type: 'pageerror',
      text: error.message,
      stack: error.stack,
      location: 'page runtime',
    })
    console.log(`💥 Page Error: ${error.message}`)
  })

  try {
    console.log('🚀 Navigating to http://localhost:4000...')

    // Navigate with extended timeout
    await page.goto('http://localhost:4000', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    })

    console.log('✅ Page loaded successfully')

    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Check if React app is mounted
    const reactRoot = await page.$('#root')
    console.log(`📦 React root element: ${reactRoot ? 'Found' : 'Not found'}`)

    // Look for common React error boundaries or error messages
    const reactErrors = await page.evaluate(() => {
      const errorElements = document.querySelectorAll(
        '[data-testid*="error"], .error, [class*="error"]'
      )
      return Array.from(errorElements).map(el => ({
        tagName: el.tagName,
        className: el.className,
        textContent: el.textContent.trim(),
      }))
    })

    // Check for dashboard elements
    const dashboardElements = await page.evaluate(() => {
      return {
        title: document.title,
        hasAppGrid: !!document.querySelector('.app-grid'),
        categoryCards: document.querySelectorAll(
          '[class*="card"], .category-card, [data-testid*="card"]'
        ).length,
        bodyContent: document.body.textContent.substring(0, 500),
        visibleText: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
          .map(h => h.textContent.trim())
          .filter(t => t),
        buttonElements: document.querySelectorAll('button').length,
        hasStyles: document.querySelectorAll('link[rel="stylesheet"], style').length > 0,
      }
    })

    console.log('📊 Dashboard Analysis:')
    console.log(`  Title: ${dashboardElements.title}`)
    console.log(`  Has App Grid: ${dashboardElements.hasAppGrid}`)
    console.log(`  Category Cards: ${dashboardElements.categoryCards}`)
    console.log(`  Buttons: ${dashboardElements.buttonElements}`)
    console.log(`  Has Styles: ${dashboardElements.hasStyles}`)
    console.log(`  Visible Headers: ${dashboardElements.visibleText.join(', ')}`)

    // Take screenshot
    const screenshotPath = path.join(__dirname, 'hub-dashboard-test.png')
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: 'png',
    })
    console.log(`📸 Screenshot saved to: ${screenshotPath}`)

    // Generate comprehensive report
    const report = {
      timestamp: new Date().toISOString(),
      url: 'http://localhost:4000',
      testResults: {
        pageLoaded: true,
        reactMounted: !!reactRoot,
        dashboardVisible: dashboardElements.categoryCards > 0 || dashboardElements.hasAppGrid,
        hasStyles: dashboardElements.hasStyles,
      },
      dashboard: dashboardElements,
      issues: {
        consoleErrors,
        consoleWarnings,
        networkFailures,
        reactErrors,
      },
      performance: {
        screenshot: screenshotPath,
      },
    }

    // Save report
    const reportPath = path.join(__dirname, 'hub-dashboard-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`📋 Report saved to: ${reportPath}`)

    // Summary
    console.log('\n🎯 Test Summary:')
    console.log(`✅ Page Navigation: Success`)
    console.log(`✅ React Root: ${reactRoot ? 'Found' : 'Not Found'}`)
    console.log(`❌ Console Errors: ${consoleErrors.length}`)
    console.log(`⚠️  Console Warnings: ${consoleWarnings.length}`)
    console.log(`🌐 Network Failures: ${networkFailures.length}`)
    console.log(`🎨 Dashboard Elements: ${dashboardElements.categoryCards} cards found`)

    if (consoleErrors.length === 0) {
      console.log('🎉 No React import errors detected!')
    } else {
      console.log('⚠️  Issues found - check the detailed report')
    }

    // Keep browser open for manual inspection
    console.log('\n👀 Browser will remain open for manual inspection...')
    console.log('Press Ctrl+C to close when done inspecting')

    // Wait indefinitely until user closes
    await new Promise(() => {})
  } catch (error) {
    console.error('❌ Test failed:', error.message)

    // Take error screenshot
    const errorScreenshotPath = path.join(__dirname, 'hub-dashboard-error.png')
    try {
      await page.screenshot({
        path: errorScreenshotPath,
        fullPage: true,
      })
      console.log(`📸 Error screenshot saved to: ${errorScreenshotPath}`)
    } catch (screenshotError) {
      console.error('Failed to take error screenshot:', screenshotError.message)
    }

    throw error
  } finally {
    // Don't close browser automatically - let user inspect
    process.on('SIGINT', async () => {
      console.log('\n🔄 Closing browser...')
      await browser.close()
      process.exit(0)
    })
  }
}

// Run the test
testHubDashboard().catch(console.error)
