import { test, expect } from '@playwright/test';
import { join } from 'path';

/**
 * E2E tests for Import Wizard (5-step flow)
 *
 * Tests the complete user journey:
 * 1. Upload CSV file
 * 2. Map columns
 * 3. Process transactions (API call)
 * 4. Review and resolve uncertain matches
 * 5. Execute import (API call)
 * 6. View summary
 */

// Mock API responses
const setupMockAPIs = async (page) => {
  // Log all requests for debugging
  page.on('request', request => {
    if (request.url().includes('/trpc/')) {
      console.log('Request:', request.method(), request.url());
    }
  });

  // Mock processImport endpoint (handles both single and batched requests)
  await page.route(/\/trpc\/imports\.processImport/, async (route) => {
    // Check if this is a batched request
    const url = new URL(route.request().url());
    const isBatch = url.searchParams.has('batch');

    const responseData = {
      result: {
        data: {
            matched: [
              {
                date: '2026-02-13',
                description: 'WOOLWORTHS 1234',
                amount: -125.50,
                account: 'Amex',
                location: 'North Sydney',
                online: false,
                rawRow: '{}',
                checksum: 'abc123',
                entity: {
                  entityId: 'woolworths-id',
                  entityName: 'Woolworths',
                  entityUrl: 'https://www.notion.so/woolworthsid',
                  matchType: 'prefix',
                },
                status: 'matched',
              },
            ],
            uncertain: [
              {
                date: '2026-02-14',
                description: 'UNKNOWN MERCHANT',
                amount: -50.00,
                account: 'Amex',
                rawRow: '{}',
                checksum: 'xyz789',
                entity: {
                  entityName: 'Unknown Merchant',
                  matchType: 'ai',
                  confidence: 0.7,
                },
                status: 'uncertain',
              },
            ],
            failed: [],
            skipped: [],
          },
        },
      };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(isBatch ? [responseData] : responseData),
    });
  });

  // Mock executeImport endpoint
  await page.route(/\/trpc\/imports\.executeImport/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: {
            imported: 1,
            failed: [],
            skipped: 0,
          },
        },
      }),
    });
  });

  // Mock entities.list endpoint
  await page.route(/\/trpc\/entities\.list/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: {
            data: [
              { notionId: 'woolworths-id', name: 'Woolworths' },
              { notionId: 'coles-id', name: 'Coles' },
              { notionId: 'netflix-id', name: 'Netflix' },
            ],
            pagination: {
              total: 3,
              limit: 50,
              offset: 0,
              hasMore: false,
            },
          },
        },
      }),
    });
  });

  // Mock createEntity endpoint
  await page.route(/\/trpc\/imports\.createEntity/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        result: {
          data: {
            entityId: 'new-entity-id',
            entityName: 'New Entity',
            entityUrl: 'https://www.notion.so/newentityid',
          },
        },
      }),
    });
  });
};

test.describe('Import Wizard - Complete Flow', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockAPIs(page);
    await page.goto('/import');
  });

  test('should complete full import flow successfully', async ({ page }) => {
    // Step 1: Upload CSV
    await test.step('Upload CSV file', async () => {
      await expect(page.getByText('Upload CSV')).toBeVisible();

      // Create a test CSV file
      const csvContent = `Date,Description,Amount
13/02/2026,WOOLWORTHS 1234,125.50
14/02/2026,UNKNOWN MERCHANT,50.00`;

      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles({
        name: 'test.csv',
        mimeType: 'text/csv',
        buffer: Buffer.from(csvContent),
      });

      // Should show file name
      await expect(page.getByText('test.csv')).toBeVisible();

      // Click Next
      await page.getByRole('button', { name: /next/i }).click();
    });

    // Step 2: Map Columns
    await test.step('Map columns', async () => {
      await expect(page.getByText('Map Columns')).toBeVisible();

      // Columns should be auto-detected
      await expect(page.locator('select[name="date"]')).toHaveValue('Date');
      await expect(page.locator('select[name="description"]')).toHaveValue('Description');
      await expect(page.locator('select[name="amount"]')).toHaveValue('Amount');

      // Should show preview of parsed data
      await expect(page.getByText('2026-02-13')).toBeVisible();
      await expect(page.getByText('WOOLWORTHS 1234')).toBeVisible();

      // Click Next
      await page.getByRole('button', { name: /next/i }).click();
    });

    // Step 3: Processing
    await test.step('Process transactions', async () => {
      await expect(page.getByText('Processing')).toBeVisible();

      // Should show loading state
      await expect(page.getByText(/processing/i)).toBeVisible();

      // Wait for processing to complete (API call)
      await expect(page.getByText('Review')).toBeVisible({ timeout: 10000 });
    });

    // Step 4: Review
    await test.step('Review transactions', async () => {
      // Should show tabs
      await expect(page.getByRole('tab', { name: /matched/i })).toBeVisible();
      await expect(page.getByRole('tab', { name: /uncertain/i })).toBeVisible();

      // Should show matched transaction
      await expect(page.getByText('WOOLWORTHS 1234')).toBeVisible();
      await expect(page.getByText('Woolworths')).toBeVisible();

      // Switch to uncertain tab
      await page.getByRole('tab', { name: /uncertain/i }).click();

      // Should show uncertain transaction
      await expect(page.getByText('UNKNOWN MERCHANT')).toBeVisible();

      // Resolve uncertain transaction by selecting entity
      const entitySelect = page.locator('select').first();
      await entitySelect.selectOption('woolworths-id');

      // Should move to matched
      await page.getByRole('tab', { name: /matched/i }).click();
      await expect(page.getByText('UNKNOWN MERCHANT')).toBeVisible();

      // Import button should be enabled
      const importButton = page.getByRole('button', { name: /import/i });
      await expect(importButton).toBeEnabled();
      await importButton.click();
    });

    // Step 5: Summary
    await test.step('View summary', async () => {
      await expect(page.getByText('Import Complete')).toBeVisible({ timeout: 10000 });

      // Should show success metrics
      await expect(page.getByText(/1.*imported/i)).toBeVisible();
      await expect(page.getByText(/0.*failed/i)).toBeVisible();

      // Should have button to start new import
      await expect(page.getByRole('button', { name: /new import/i })).toBeVisible();
    });
  });

  test('should validate required fields in upload step', async ({ page }) => {
    await expect(page.getByText('Upload CSV')).toBeVisible();

    // Next button should be disabled without file
    const nextButton = page.getByRole('button', { name: /next/i });
    await expect(nextButton).toBeDisabled();
  });

  test('should handle file upload errors', async ({ page }) => {
    await expect(page.getByText('Upload CSV')).toBeVisible();

    // Try to upload non-CSV file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('not a csv'),
    });

    // Should show error
    await expect(page.getByText(/invalid file type/i)).toBeVisible();
  });

  test('should validate column mapping', async ({ page }) => {
    // Upload CSV first
    const csvContent = `Date,Description,Amount
13/02/2026,TEST,100.00`;

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from(csvContent),
    });

    await page.getByRole('button', { name: /next/i }).click();

    // On column mapping step
    await expect(page.getByText('Map Columns')).toBeVisible();

    // Clear required field
    await page.locator('select[name="date"]').selectOption('');

    // Next button should be disabled
    const nextButton = page.getByRole('button', { name: /next/i });
    await expect(nextButton).toBeDisabled();
  });

  test('should allow navigation back through steps', async ({ page }) => {
    // Upload CSV
    const csvContent = `Date,Description,Amount
13/02/2026,TEST,100.00`;

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from(csvContent),
    });

    await page.getByRole('button', { name: /next/i }).click();

    // On column mapping
    await expect(page.getByText('Map Columns')).toBeVisible();

    // Click back
    await page.getByRole('button', { name: /back/i }).click();

    // Should be back on upload
    await expect(page.getByText('Upload CSV')).toBeVisible();

    // File should still be selected
    await expect(page.getByText('test.csv')).toBeVisible();
  });

  test('should create new entity from review step', async ({ page }) => {
    // Upload and navigate to review
    const csvContent = `Date,Description,Amount
13/02/2026,TEST,100.00`;

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from(csvContent),
    });

    await page.getByRole('button', { name: /next/i }).click();
    await page.getByRole('button', { name: /next/i }).click();

    // Wait for review step
    await expect(page.getByRole('tab', { name: /uncertain/i })).toBeVisible({ timeout: 10000 });
    await page.getByRole('tab', { name: /uncertain/i }).click();

    // Click "New" button to create entity
    await page.getByRole('button', { name: /new/i }).click();

    // Dialog should open
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Create New Entity')).toBeVisible();

    // Fill in entity name
    await page.getByLabel(/entity name/i).fill('New Test Entity');

    // Submit
    await page.getByRole('button', { name: /create/i }).click();

    // Dialog should close and entity should be selected
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should disable import button when uncertain transactions exist', async ({ page }) => {
    const csvContent = `Date,Description,Amount
13/02/2026,TEST,100.00`;

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from(csvContent),
    });

    await page.getByRole('button', { name: /next/i }).click();
    await page.getByRole('button', { name: /next/i }).click();

    // Wait for review
    await expect(page.getByRole('tab', { name: /uncertain/i })).toBeVisible({ timeout: 10000 });

    // Import button should be disabled
    const importButton = page.getByRole('button', { name: /import/i });
    await expect(importButton).toBeDisabled();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Override processImport to return error
    await page.route(/\/trpc\/imports\.processImport/, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: {
            message: 'Internal server error',
          },
        }),
      });
    });

    const csvContent = `Date,Description,Amount
13/02/2026,TEST,100.00`;

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from(csvContent),
    });

    await page.getByRole('button', { name: /next/i }).click();
    await page.getByRole('button', { name: /next/i }).click();

    // Should show error message
    await expect(page.getByText(/error/i)).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Import Wizard - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockAPIs(page);
    await page.goto('/import');
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab to file input
    await page.keyboard.press('Tab');

    // Should focus on file input
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeFocused();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check for proper labels
    await expect(page.locator('input[type="file"]')).toHaveAttribute('aria-label', /.*/);
  });

  test('should show validation errors with proper aria-invalid', async ({ page }) => {
    const csvContent = `Date,Description,Amount
13/02/2026,TEST,100.00`;

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from(csvContent),
    });

    await page.getByRole('button', { name: /next/i }).click();

    // Clear required field
    await page.locator('select[name="date"]').selectOption('');

    // Should have aria-invalid
    await expect(page.locator('select[name="date"]')).toHaveAttribute('aria-invalid', 'true');
  });
});

test.describe('Import Wizard - Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await setupMockAPIs(page);
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/import');

    // Should still show upload UI
    await expect(page.getByText('Upload CSV')).toBeVisible();

    // File input should be accessible
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/import');

    await expect(page.getByText('Upload CSV')).toBeVisible();
  });
});
