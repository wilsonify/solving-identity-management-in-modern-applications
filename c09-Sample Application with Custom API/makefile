
all: client server idp iam

server:
	docker build -t hydra-server:latest ./hydra-server

client:
	docker build -t hydra-client:latest ./hydra-client

minimal-client:
	docker build -t minimal-html-client:latest ./minimal-html-client

hydra-idp:
	docker build -t hydra-idp:latest ./idp

hydra-iam:
	docker build -t hydra-iam:latest ./iam

test-runner:
	docker build -t hydra-tests ./tests

test:
	docker run --rm --network host hydra-tests

env.enc:
	sops encrypt --age age1mg4zlx7p736nnrp7glt7gyd96s33kmy8wlck903m0srkkndeaawqrqfzek --encrypted-regex "PASSW|MAIL|KEY|TOKEN|SECRET" --input-type dotenv .env > .env.enc

env.tmp:
	SOPS_AGE_KEY_FILE=/home/thom/.config/sops/age/keys.txt sops decrypt --input-type dotenv --output-type dotenv .env.enc > .env.tmp

promote:
	mv .env.tmp .env

dex/config.docker.enc.yaml:
	sops encrypt --age age1mg4zlx7p736nnrp7glt7gyd96s33kmy8wlck903m0srkkndeaawqrqfzek --encrypted-regex "PASSW|MAIL|KEY|TOKEN|SECRET|hash" ./etc/dex/config.docker.yaml > ./etc/dex/config.docker.enc.yaml

dex/config.docker.tmp.yaml:
	sops decrypt ./etc/dex/config.docker.enc.yaml > ./etc/dex/config.docker.tmp.yaml


# Encrypt Keycloak realm import file
keycloak/realm-import.enc.json:
	sops encrypt \
		--age age1mg4zlx7p736nnrp7glt7gyd96s33kmy8wlck903m0srkkndeaawqrqfzek \
		--encrypted-regex "PASSW|MAIL|KEY|TOKEN|SECRET|hash|email|value" \
		./iam/opt/keycloak/data/import/realm-export.json > ./iam/opt/keycloak/data/import/realm-import.enc.json

# Decrypt Keycloak realm import file (temporary working copy)
keycloak/realm-import.tmp.json:
	sops decrypt ./iam/opt/keycloak/data/import/realm-import.enc.json > ./iam/opt/keycloak/data/import/realm-import.tmp.json
