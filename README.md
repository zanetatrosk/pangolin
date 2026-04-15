## Run with Docker

### Prerequisites

- Docker
- Docker Compose (v2)

### Start

```bash
docker compose up --build
```

App will be available at http://localhost:3000

### Stop

Press `Ctrl+C`, then run:

```bash
docker compose down
```

### Run in background (optional)

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```
