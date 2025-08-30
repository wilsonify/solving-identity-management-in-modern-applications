
all: client server

server:
	docker build -t hydra-server:latest ./hydra-server

client:
	docker build -t hydra-client:latest ./hydra-client

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
