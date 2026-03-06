# Publishing Guide for Handler Factory

## Prerequisites

1. **Create npm Account**: Go to [npmjs.com](https://www.npmjs.com) and create a free account
2. **Create GitHub Repository**: Push your code to GitHub for source control
3. **Node.js Installed**: Ensure you have Node.js 16+ and npm/yarn installed

## Setup Steps

### 1. Update package.json

Replace these in your `package.json`:

```json
{
  "name": "@yourorg/handler-factory", // Change to your org/package name
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourorg/handler-factory"
  }
}
```

### 2. Login to npm

```bash
npm login
# or
yarn login
```

Enter your npm credentials when prompted.

### 3. Build the Package

```bash
npm run build
# or
yarn build
```

This generates the `dist/` directory with compiled JavaScript and TypeScript declarations.

### 4. Verify Package Contents

```bash
npm pack
# This creates a .tgz file showing what will be published
```

### 5. Publish to npm

#### First Time Publishing:

```bash
npm publish
# or
yarn publish
```

#### Publishing Updates:

Update the version in `package.json` first (semantic versioning):

```json
{
  "version": "1.0.1" // Changed from 1.0.0
}
```

Then publish:

```bash
npm publish
```

### 6. Publish to Yarn (Optional)

Yarn uses the same npm registry, so publishing to npm automatically makes it available to yarn users.

Users can install via:

```bash
yarn add @yourorg/handler-factory
```

## Version Management

Use semantic versioning:

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (1.1.0): New features (backward compatible)
- **PATCH** (1.0.1): Bug fixes

Update version in `package.json` and create a git tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Publishing Checklist

- [ ] Update `package.json` with correct name/author
- [ ] Update version number
- [ ] Update README.md with accurate info
- [ ] Run `npm run build` successfully
- [ ] Run `npm pack` and verify contents
- [ ] Logged in to npm (`npm whoami`)
- [ ] Run `npm publish`
- [ ] Verify on npmjs.com

## Verify Published Package

```bash
npm view @yourorg/handler-factory
```

Or install in another project to test:

```bash
npm install @yourorg/handler-factory
```

## Managing Package Access

If you want org-scoped packages to be private, modify in `package.json`:

```json
{
  "publishConfig": {
    "access": "private"
  }
}
```

Note: Private packages require npm Pro subscription.

## Troubleshooting

**Error: 403 Forbidden**

- Package name already exists
- Try a different scoped name: `@yourorg/unique-name`

**Error: You must be logged in**

```bash
npm logout
npm login
npm publish
```

**Permission Denied**

- Ensure you're logged into the correct npm account
- Check org membership if using org-scoped packages

## Support

For more info:

- [npm Publishing Guide](https://docs.npmjs.com/cli/publish)
- [npm Scoped Packages](https://docs.npmjs.com/cli/init#scope)
