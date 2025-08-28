# Makefile for hydra-server
# Sample Resource Server for Modern Identity (demo purposes only)

.PHONY: install dev dev-debug build start prod test test-debug lint lint-fix clean

# Default target
all: clean install build

## Dependency management
install:
	@echo "Installing dependencies..."
	npm install

prod-install:
	npm install --omit=dev

## Development
dev:
	@echo "Running in development mode..."
	npm run dev

dev-debug:
	@echo "Running in development debug mode..."
	npm run dev:debug

## Production
build:
	# Compile for production (creates /dist if using babel/ts)
	@echo "Compiling for production..."
	npm run compile

start:
	@echo "Starting in production mode..."
	npm start

prod: build start

## Testing
test:
	@echo "Running tests..."
	npm test

test-debug:
	@echo "Running tests in debug mode..."
	npm run test:debug

## Linting
lint:
	@echo "Linting code..."
	npm run lint

lint-fix:
	@echo "Fixing lint errors..."
	npm run lint -- --fix

## Cleanup
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist node_modules
