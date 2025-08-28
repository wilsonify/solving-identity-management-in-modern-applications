# Makefile for hydra-client (Create React App)

# Default target
.DEFAULT_GOAL := help

# Install dependencies
install:
	yarn install

# Start development server
dev:
	yarn start

# Run tests (interactive watch mode)
test:
	yarn test

# Build production bundle
build:
	yarn build

# Eject CRA (irreversible!)
eject:
	yarn eject

# Clean build artifacts and deps
clean:
	rm -rf node_modules build

# Help message
help:
	@echo "Makefile for hydra-client"
	@echo
	@echo "Usage:"
	@echo "  make install   Install dependencies"
	@echo "  make dev       Run development server"
	@echo "  make test      Run tests"
	@echo "  make build     Build for production"
	@echo "  make eject     Eject CRA config (irreversible!)"
	@echo "  make clean     Remove node_modules and build"
