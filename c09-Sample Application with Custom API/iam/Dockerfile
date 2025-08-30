FROM quay.io/keycloak/keycloak:latest
COPY ./opt/keycloak/data/import/realm-export.json /opt/keycloak/data/import/realm-export.json
EXPOSE 8080
CMD ["start-dev", "--http-port=8080", "--import-realm"]
HEALTHCHECK CMD curl --fail http://localhost:8080/health/ready || exit 1