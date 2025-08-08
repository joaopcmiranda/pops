const puppeteer = require('puppeteer')
const path = require('path')

async function quickTest() {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })

  // Arrays to store console messages
  const consoleErrors = []
  const consoleWarnings = []

  // Monitor console messages
  page.on('console', msg => {
    const type = msg.type()
    const text = msg.text()

    if (type === 'error') {
      consoleErrors.push({ type, text })
      console.log(`❌ Console Error: ${text}`)
    } else if (type === 'warning') {
      consoleWarnings.push({ type, text })
      console.log(`⚠️  Console Warning: ${text}`)
    }
  })

  try {
    console.log('🚀 Navigating to http://localhost:4000...')

    await page.goto('http://localhost:4000', {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    })

    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Check basic page elements
    const pageInfo = await page.evaluate(() => {
      return {
        title: document.title,
        hasReactRoot: !!document.querySelector('#root'),
        bodyText: document.body.textContent.substring(0, 200),
        headings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h =>
          h.textContent.trim()
        ),
        buttons: document.querySelectorAll('button').length,
        cards: document.querySelectorAll('[class*="card"]').length,
        hasStyles: getComputedStyle(document.body).fontSize !== '',
      }
    })

    console.log('📊 Page Analysis:')
    console.log(`  Title: ${pageInfo.title}`)
    console.log(`  React Root: ${pageInfo.hasReactRoot ? 'Found' : 'Not Found'}`)
    console.log(`  Headings: ${pageInfo.headings.join(', ')}`)
    console.log(`  Buttons: ${pageInfo.buttons}`)
    console.log(`  Cards: ${pageInfo.cards}`)
    console.log(`  Has Styles: ${pageInfo.hasStyles}`)
    console.log(`  Body preview: ${pageInfo.bodyText}`)

    // Take screenshot
    const screenshotPath = path.join(__dirname, 'hub-dashboard-screenshot.png')
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: 'png',
    })
    console.log(`📸 Screenshot saved to: ${screenshotPath}`)

    // Summary
    console.log('\n🎯 Test Summary:')
    console.log(`✅ React App: ${pageInfo.hasReactRoot ? 'MOUNTED' : 'NOT FOUND'}`)
    console.log(`❌ Console Errors: ${consoleErrors.length}`)
    console.log(`⚠️  Console Warnings: ${consoleWarnings.length}`)
    console.log(
      `🎨 Dashboard Status: ${pageInfo.cards > 0 || pageInfo.headings.length > 0 ? 'RENDERED' : 'NOT RENDERED'}`
    )

    if (consoleErrors.length === 0) {
      console.log('🎉 No critical React errors detected!')
    }

    return {
      success: true,
      pageInfo,
      consoleErrors,
      consoleWarnings,
      screenshotPath,
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    return { success: false, error: error.message }
  } finally {
    await browser.close()
  }
}

// Run the test
quickTest()
  .then(result => {
    if (result.success) {
      console.log('\n✅ Test completed successfully')
    } else {
      console.log('\n❌ Test failed')
    }
  })
  .catch(console.error)
