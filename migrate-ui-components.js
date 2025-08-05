#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

// Convert PascalCase to snake-case
function toSnakeCase(str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

// Component name mappings for special cases
const componentMappings = {
  'use_sidebar.tsx': { folder: 'sidebar', name: 'useSidebar' },
  'navigation-menu-trigger-style.tsx': { folder: 'navigation-menu', name: 'navigationMenuTriggerStyle' },
};

// Get component info from filename
function getComponentInfo(filename) {
  const base = path.basename(filename);
  
  // Handle special mappings
  if (componentMappings[base]) {
    return componentMappings[base];
  }
  
  // Remove extension and .stories suffix
  const nameWithoutExt = base.replace(/\.(tsx|ts)$/, '');
  const isStory = nameWithoutExt.endsWith('.stories');
  const componentName = nameWithoutExt.replace(/\.stories$/, '');
  
  // Convert to PascalCase if needed
  const pascalName = componentName
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  return {
    folder: toSnakeCase(componentName),
    name: pascalName,
    isStory
  };
}

// Update imports in file content
async function updateImports(content, fromBase, toBase) {
  // Update relative imports between UI components
  let updated = content;
  
  // Update imports from other ui components
  updated = updated.replace(
    /from ['"]\.\.?\/(.*?)['"]|from ['"]@\/components\/ui\/(.*?)['"]/g,
    (match, relativePath, absolutePath) => {
      const importPath = relativePath || absolutePath;
      
      // Skip non-UI imports
      if (importPath && !importPath.includes('../') && !importPath.includes('./')) {
        // This is likely a UI component import
        const componentName = importPath.split('/')[0];
        return `from '@pops/ui'`;
      }
      
      return match;
    }
  );
  
  // Update @/lib/utils imports
  updated = updated.replace(
    /from ['"]@\/lib\/utils['"]/g,
    `from '@pops/ui'`
  );
  
  return updated;
}

// Create index.ts content for a component
function createIndexContent(componentName, additionalExports = []) {
  const exports = [`export * from './${componentName}'`];
  
  additionalExports.forEach(exp => {
    exports.push(`export * from './${exp}'`);
  });
  
  return exports.join('\n') + '\n';
}

async function migrateComponents() {
  const sourceDir = '/Users/joao/dev/personal/pops/apps/travel/src/components/ui';
  const targetDir = '/Users/joao/dev/personal/pops/packages/ui/src/components';
  const libSourceDir = '/Users/joao/dev/personal/pops/apps/travel/src/lib';
  const libTargetDir = '/Users/joao/dev/personal/pops/packages/ui/src/lib';
  
  try {
    // Create target directories
    await fs.mkdir(targetDir, { recursive: true });
    await fs.mkdir(libTargetDir, { recursive: true });
    
    // First, copy utils.ts
    const utilsSource = path.join(libSourceDir, 'utils.ts');
    const utilsTarget = path.join(libTargetDir, 'utils.ts');
    
    try {
      const utilsContent = await fs.readFile(utilsSource, 'utf-8');
      await fs.writeFile(utilsTarget, utilsContent);
      console.log('✓ Copied utils.ts');
    } catch (err) {
      console.log('⚠ utils.ts not found or already moved');
    }
    
    // Get all files to process
    const files = await fs.readdir(sourceDir, { recursive: true });
    
    // Group files by component
    const componentGroups = {};
    
    for (const file of files) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const fullPath = path.join(sourceDir, file);
        const stat = await fs.stat(fullPath);
        
        if (stat.isFile()) {
          const dir = path.dirname(file);
          const componentInfo = getComponentInfo(file);
          
          // Handle nested components (like form/*, sidebar/*)
          let groupKey = componentInfo.folder;
          if (dir !== '.' && dir !== '') {
            groupKey = dir.split('/')[0];
          }
          
          if (!componentGroups[groupKey]) {
            componentGroups[groupKey] = [];
          }
          
          componentGroups[groupKey].push({
            source: fullPath,
            file: file,
            componentInfo: componentInfo,
            isNested: dir !== '.' && dir !== ''
          });
        }
      }
    }
    
    // Process each component group
    for (const [folderName, files] of Object.entries(componentGroups)) {
      const componentDir = path.join(targetDir, folderName);
      await fs.mkdir(componentDir, { recursive: true });
      
      const mainComponentName = folderName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      
      const additionalExports = [];
      
      for (const fileInfo of files) {
        const { source, file, componentInfo, isNested } = fileInfo;
        
        // Read file content
        let content = await fs.readFile(source, 'utf-8');
        
        // Update imports
        content = await updateImports(content, sourceDir, targetDir);
        
        // Determine target filename
        let targetFilename;
        if (isNested) {
          // For nested files, preserve the structure but capitalize properly
          const parts = file.split('/');
          const filename = parts[parts.length - 1];
          const nameInfo = getComponentInfo(filename);
          targetFilename = nameInfo.isStory 
            ? `${nameInfo.name}.stories.tsx`
            : `${nameInfo.name}.tsx`;
          
          // Track additional exports for nested components
          if (!nameInfo.isStory && nameInfo.name !== mainComponentName) {
            additionalExports.push(nameInfo.name);
          }
        } else {
          targetFilename = componentInfo.isStory 
            ? `${mainComponentName}.stories.tsx`
            : componentInfo.name === mainComponentName 
              ? `${mainComponentName}.tsx`
              : `${componentInfo.name}.tsx`;
          
          // Track additional exports
          if (!componentInfo.isStory && componentInfo.name !== mainComponentName) {
            additionalExports.push(componentInfo.name);
          }
        }
        
        const targetPath = path.join(componentDir, targetFilename);
        await fs.writeFile(targetPath, content);
        console.log(`✓ Migrated ${file} → ${folderName}/${targetFilename}`);
      }
      
      // Create index.ts
      const indexContent = createIndexContent(mainComponentName, additionalExports);
      await fs.writeFile(path.join(componentDir, 'index.ts'), indexContent);
    }
    
    // Create main components index
    const componentFolders = Object.keys(componentGroups).sort();
    const componentsIndexContent = componentFolders
      .map(folder => `export * from './${folder}'`)
      .join('\n') + '\n';
    
    await fs.writeFile(
      path.join(targetDir, 'index.ts'),
      componentsIndexContent
    );
    
    // Create main package index
    const mainIndexContent = `// Components
export * from './components'

// Utilities
export * from './lib/utils'

// Typography
export * from './typography'
`;
    
    await fs.writeFile(
      path.join(targetDir, '..', 'index.ts'),
      mainIndexContent
    );
    
    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateComponents();