# Audio Transcription Demo - Backend

GraphQL API server for audio transcription with S3 file storage.

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment configuration:**
   Create `.env` file in the server root with the required variables (see `.env.example`).
   ```bash
   cp .env.example .env
   ```

3. **Start services (MongoDB, Redis, MinIO, Mongo Express):**
   ```bash
   docker-compose up -d
   ```

4. **Run development server:**
   ```bash
   npm run start:dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm run start:prod
   ```

## Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `8080` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:5173` |
| `S3_ENDPOINT` | S3 service endpoint | `http://localhost:9000` |
| `S3_ACCESS_KEY_ID` | S3 access key | `minioadmin` |
| `S3_SECRET_ACCESS_KEY` | S3 secret key | `minioadmin` |
| `S3_REGION` | S3 region | `us-east-1` |
| `MONGO_USERNAME` | MongoDB admin username | `admin` |
| `MONGO_PASSWORD` | MongoDB admin password | `password123` |
| `MONGO_PORT` | MongoDB port | `27017` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | `redis123` |

## Services

When running `docker-compose up -d`, the following services will be available:

| Service | URL | Description |
|---------|-----|-------------|
| **MinIO Console** | http://localhost:9001 | S3-compatible storage admin interface |
| **MinIO API** | http://localhost:9000 | S3-compatible storage API |
| **Mongo Express** | http://localhost:8090 | MongoDB admin interface |
| **MongoDB** | localhost:27017 | MongoDB database |
| **Redis** | localhost:6379 | Redis cache |

## Development

- **GraphQL Schema:** Available at `http://localhost:8080/graphql`
- **Code generation:** `npm run codegen`
