FROM dexidp/dex:latest
COPY ./etc/dex/config.docker.yaml /etc/dex/config.docker.yaml
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=5 CMD wget -O - http://0.0.0.0:5556/dex/.well-known/openid-configuration || exit 1