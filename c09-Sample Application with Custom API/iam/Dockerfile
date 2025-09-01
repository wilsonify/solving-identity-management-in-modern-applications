FROM quay.io/keycloak/keycloak:26.3.3
COPY ./opt/keycloak/data/import/realm-export.json /opt/keycloak/data/import/realm-export.json
EXPOSE 8080
CMD ["start-dev", "--http-port=8080", "--import-realm"]
