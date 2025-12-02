# Linting Guide

This project is configured to show linting errors and warnings in the terminal to help you catch issues early.

## Available Commands

### ESLint Commands

```bash
# Run ESLint once (fails on warnings)
npm run lint

# Fix auto-fixable ESLint issues
npm run lint:fix

# Watch mode - runs linting on file changes
npm run lint:watch

# Verbose output with better formatting
npm run lint:verbose

# Run both ESLint and Tailwind CSS checks
npm run lint:all
```

### Tailwind CSS Class Checker

```bash
# Check for common Tailwind CSS class issues
npm run check:tailwind
```

This script checks for:
- `flex-shrink-0` → should be `shrink-0`
- `flex-grow-0` → should be `grow-0`
- `aspect-[280/200]` → should be `aspect-280/200`
- `min-h-[2.5rem]` → should be `min-h-10`
- `bg-gradient-to-*` → should be `bg-linear-to-*`

## Integration with Development

### Option 1: Run linting in watch mode (Recommended)

Open a separate terminal and run:
```bash
npm run lint:watch
```

This will continuously check your files and show errors/warnings as you code.

### Option 2: Run before commits

Add to your git hooks or run manually:
```bash
npm run lint:all
```

### Option 3: Check Tailwind CSS issues only

```bash
npm run check:tailwind
```

## Understanding the Output

### ESLint Output
- ❌ **Errors**: Must be fixed (build will fail)
- ⚠️ **Warnings**: Should be fixed (linting fails with `--max-warnings=0`)

### Tailwind CSS Checker Output
- ⚠️ **Warnings**: Deprecated or non-standard class patterns
- 💡 **Suggestions**: Recommended replacements

## Common Issues and Fixes

| Old Pattern | New Pattern | Reason |
|------------|------------|--------|
| `flex-shrink-0` | `shrink-0` | Modern Tailwind CSS v4 syntax |
| `flex-grow-0` | `grow-0` | Modern Tailwind CSS v4 syntax |
| `aspect-[280/200]` | `aspect-280/200` | Custom aspect ratio utility |
| `min-h-[2.5rem]` | `min-h-10` | Standard utility exists |
| `bg-gradient-to-*` | `bg-linear-to-*` | Custom gradient utility |

## Tips

1. **Keep a terminal open** with `npm run lint:watch` while developing
2. **Fix issues as you code** - easier than fixing many at once
3. **Use `lint:fix`** for auto-fixable issues
4. **Run `check:tailwind`** before committing to catch Tailwind CSS issues

## Troubleshooting

If linting shows errors but you've already fixed them:
- The linter cache might be stale
- Try restarting your IDE/editor
- Run `npm run lint` to refresh

## Configuration Files

- **ESLint**: `eslint.config.js`
- **Tailwind CSS Checker**: `scripts/check-tailwind.js`
- **Vite Config**: `vite.config.js` (shows build warnings)

