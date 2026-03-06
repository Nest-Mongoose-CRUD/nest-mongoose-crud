# Quick Start - Publishing to npm

## 5-Minute Publishing Process

### Step 1: Prepare Your Package

```bash
cd /Users/mac/projects/nest-mongoose-crud/package

# Build the package
npm run build

# Install dependencies (if not done yet)
npm install
```

### Step 2: Update Package Info

Edit `package.json`:

- Change `name` to your desired package name (e.g., `@yourorg/handler-factory`)
- Update `author`, `repository`, `bugs`, and `homepage` fields

### Step 3: Create npm Account

If you don't have one, sign up at [npmjs.com](https://www.npmjs.com)

### Step 4: Login

```bash
npm login
# Enter your npm username and password
npm whoami  # Verify you're logged in
```

### Step 5: Publish

```bash
npm publish
```

### Step 6: Verify

Visit `https://www.npmjs.com/package/@yourorg/handler-factory` to see your package!

## Installing Your Package

Users can now install it with:

```bash
npm install @yourorg/handler-factory
yarn add @yourorg/handler-factory
```

## Publishing Updates

For each update:

1. Make code changes
2. Update version in `package.json` (e.g., 1.0.0 → 1.0.1)
3. Run `npm run build`
4. Run `npm publish`

That's it! 🚀
