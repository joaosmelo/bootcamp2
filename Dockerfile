FROM mcr.microsoft.com/playwright:focal

# Create app directory
WORKDIR /app

# Copy project files (if you have package.json at repo root, copy it too)
COPY . /app

# Install dependencies if package.json exists
RUN if [ -f package.json ]; then npm ci; fi

# Ensure Playwright browsers are installed
RUN npx playwright install --with-deps

# Copy extension into container
COPY extension /app/extension

# Default command: run Playwright tests (use the npm script or direct command)
CMD ["bash", "-lc", "npx playwright test --project=chromium --reporter=html || true"]
