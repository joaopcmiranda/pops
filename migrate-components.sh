#!/bin/bash

# Source and target directories
SOURCE_DIR="/Users/joao/dev/personal/pops/apps/travel/src/components/ui"
TARGET_DIR="/Users/joao/dev/personal/pops/packages/ui/src/components"
LIB_SOURCE="/Users/joao/dev/personal/pops/apps/travel/src/lib"
LIB_TARGET="/Users/joao/dev/personal/pops/packages/ui/src/lib"

# Create target directories
mkdir -p "$TARGET_DIR"
mkdir -p "$LIB_TARGET"

# Copy utils.ts
if [ -f "$LIB_SOURCE/utils.ts" ]; then
  cp "$LIB_SOURCE/utils.ts" "$LIB_TARGET/"
  echo "✓ Copied utils.ts"
fi

# Function to convert to snake-case
to_snake_case() {
  echo "$1" | sed 's/\([A-Z]\)/-\1/g' | tr '[:upper:]' '[:lower:]' | sed 's/^-//'
}

# Function to convert to PascalCase
to_pascal_case() {
  echo "$1" | sed 's/-\(.\)/\U\1/g' | sed 's/^\(.\)/\U\1/'
}

# Process each component file
cd "$SOURCE_DIR"

# Handle accordion
mkdir -p "$TARGET_DIR/accordion"
[ -f "accordion.tsx" ] && cp "accordion.tsx" "$TARGET_DIR/accordion/Accordion.tsx"
[ -f "accordion.stories.tsx" ] && cp "accordion.stories.tsx" "$TARGET_DIR/accordion/Accordion.stories.tsx"
echo 'export * from "./Accordion"' > "$TARGET_DIR/accordion/index.ts"

# Handle alert
mkdir -p "$TARGET_DIR/alert"
[ -f "alert.tsx" ] && cp "alert.tsx" "$TARGET_DIR/alert/Alert.tsx"
[ -f "alert.stories.tsx" ] && cp "alert.stories.tsx" "$TARGET_DIR/alert/Alert.stories.tsx"
echo 'export * from "./Alert"' > "$TARGET_DIR/alert/index.ts"

# Handle avatar
mkdir -p "$TARGET_DIR/avatar"
[ -f "avatar.tsx" ] && cp "avatar.tsx" "$TARGET_DIR/avatar/Avatar.tsx"
[ -f "avatar.stories.tsx" ] && cp "avatar.stories.tsx" "$TARGET_DIR/avatar/Avatar.stories.tsx"
echo 'export * from "./Avatar"' > "$TARGET_DIR/avatar/index.ts"

# Handle badge with variants
mkdir -p "$TARGET_DIR/badge"
[ -f "badge/badge.tsx" ] && cp "badge/badge.tsx" "$TARGET_DIR/badge/Badge.tsx"
[ -f "badge/badge-variants.ts" ] && cp "badge/badge-variants.ts" "$TARGET_DIR/badge/variants.ts"
[ -f "badge/badge.stories.tsx" ] && cp "badge/badge.stories.tsx" "$TARGET_DIR/badge/Badge.stories.tsx"
cat > "$TARGET_DIR/badge/index.ts" << 'EOF'
export * from "./Badge"
export * from "./variants"
EOF

# Handle button with variants
mkdir -p "$TARGET_DIR/button"
[ -f "button/button.tsx" ] && cp "button/button.tsx" "$TARGET_DIR/button/Button.tsx"
[ -f "button/variants.tsx" ] && cp "button/variants.tsx" "$TARGET_DIR/button/variants.tsx"
[ -f "button/button.stories.tsx" ] && cp "button/button.stories.tsx" "$TARGET_DIR/button/Button.stories.tsx"
cat > "$TARGET_DIR/button/index.ts" << 'EOF'
export * from "./Button"
export * from "./variants"
EOF

# Handle card
mkdir -p "$TARGET_DIR/card"
[ -f "card.tsx" ] && cp "card.tsx" "$TARGET_DIR/card/Card.tsx"
[ -f "card.stories.tsx" ] && cp "card.stories.tsx" "$TARGET_DIR/card/Card.stories.tsx"
echo 'export * from "./Card"' > "$TARGET_DIR/card/index.ts"

# Handle checkbox
mkdir -p "$TARGET_DIR/checkbox"
[ -f "checkbox.tsx" ] && cp "checkbox.tsx" "$TARGET_DIR/checkbox/Checkbox.tsx"
[ -f "checkbox.stories.tsx" ] && cp "checkbox.stories.tsx" "$TARGET_DIR/checkbox/Checkbox.stories.tsx"
echo 'export * from "./Checkbox"' > "$TARGET_DIR/checkbox/index.ts"

# Handle command
mkdir -p "$TARGET_DIR/command"
[ -f "command.tsx" ] && cp "command.tsx" "$TARGET_DIR/command/Command.tsx"
[ -f "command.stories.tsx" ] && cp "command.stories.tsx" "$TARGET_DIR/command/Command.stories.tsx"
echo 'export * from "./Command"' > "$TARGET_DIR/command/index.ts"

# Handle dialog
mkdir -p "$TARGET_DIR/dialog"
[ -f "dialog.tsx" ] && cp "dialog.tsx" "$TARGET_DIR/dialog/Dialog.tsx"
[ -f "dialog.stories.tsx" ] && cp "dialog.stories.tsx" "$TARGET_DIR/dialog/Dialog.stories.tsx"
echo 'export * from "./Dialog"' > "$TARGET_DIR/dialog/index.ts"

# Handle drawer
mkdir -p "$TARGET_DIR/drawer"
[ -f "drawer.tsx" ] && cp "drawer.tsx" "$TARGET_DIR/drawer/Drawer.tsx"
[ -f "drawer.stories.tsx" ] && cp "drawer.stories.tsx" "$TARGET_DIR/drawer/Drawer.stories.tsx"
echo 'export * from "./Drawer"' > "$TARGET_DIR/drawer/index.ts"

# Handle dropdown-menu
mkdir -p "$TARGET_DIR/dropdown-menu"
[ -f "dropdown-menu.tsx" ] && cp "dropdown-menu.tsx" "$TARGET_DIR/dropdown-menu/DropdownMenu.tsx"
[ -f "dropdown-menu.stories.tsx" ] && cp "dropdown-menu.stories.tsx" "$TARGET_DIR/dropdown-menu/DropdownMenu.stories.tsx"
echo 'export * from "./DropdownMenu"' > "$TARGET_DIR/dropdown-menu/index.ts"

# Handle form components
mkdir -p "$TARGET_DIR/form"
[ -f "form/form.tsx" ] && cp "form/form.tsx" "$TARGET_DIR/form/Form.tsx"
[ -f "form/context.tsx" ] && cp "form/context.tsx" "$TARGET_DIR/form/context.tsx"
[ -f "form/useFormField.tsx" ] && cp "form/useFormField.tsx" "$TARGET_DIR/form/useFormField.tsx"
[ -f "form/form.stories.tsx" ] && cp "form/form.stories.tsx" "$TARGET_DIR/form/Form.stories.tsx"
cat > "$TARGET_DIR/form/index.ts" << 'EOF'
export * from "./Form"
export * from "./context"
export * from "./useFormField"
EOF

# Handle hover-card
mkdir -p "$TARGET_DIR/hover-card"
[ -f "hover-card.tsx" ] && cp "hover-card.tsx" "$TARGET_DIR/hover-card/HoverCard.tsx"
[ -f "hover-card.stories.tsx" ] && cp "hover-card.stories.tsx" "$TARGET_DIR/hover-card/HoverCard.stories.tsx"
echo 'export * from "./HoverCard"' > "$TARGET_DIR/hover-card/index.ts"

# Handle input
mkdir -p "$TARGET_DIR/input"
[ -f "input.tsx" ] && cp "input.tsx" "$TARGET_DIR/input/Input.tsx"
[ -f "input.stories.tsx" ] && cp "input.stories.tsx" "$TARGET_DIR/input/Input.stories.tsx"
echo 'export * from "./Input"' > "$TARGET_DIR/input/index.ts"

# Handle label
mkdir -p "$TARGET_DIR/label"
[ -f "label.tsx" ] && cp "label.tsx" "$TARGET_DIR/label/Label.tsx"
[ -f "label.stories.tsx" ] && cp "label.stories.tsx" "$TARGET_DIR/label/Label.stories.tsx"
echo 'export * from "./Label"' > "$TARGET_DIR/label/index.ts"

# Continue with remaining components...
echo "✓ Basic components migrated"

# Create main components index
cat > "$TARGET_DIR/index.ts" << 'EOF'
export * from './accordion'
export * from './alert'
export * from './avatar'
export * from './badge'
export * from './button'
export * from './card'
export * from './checkbox'
export * from './command'
export * from './dialog'
export * from './drawer'
export * from './dropdown-menu'
export * from './form'
export * from './hover-card'
export * from './input'
export * from './label'
EOF

echo "✓ Migration script completed!"