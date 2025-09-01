FROM python:3.12-slim
WORKDIR /app
RUN pip install --no-cache-dir \
    pytest \
    pytest-timeout \
    requests
COPY test_integration.py .
CMD ["pytest", "-v", "--maxfail=1", "--disable-warnings"]
