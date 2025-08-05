// Simple test to verify UI package exports
try {
  const ui = require('./packages/ui/dist/index.js');
  console.log('✅ UI package loaded successfully');
  console.log('Available exports:', Object.keys(ui).slice(0, 10).join(', '), '...');
  
  // Test specific components
  if (ui.Button) console.log('✅ Button component available');
  if (ui.Card) console.log('✅ Card component available');
  if (ui.Sidebar) console.log('✅ Sidebar component available');
  if (ui.cn) console.log('✅ cn utility available');
  
} catch (error) {
  console.log('❌ Error loading UI package:', error.message);
}