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

3. **Start MinIO (local S3):**
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

Required environment variables for S3 configuration:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `8080` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:5173` |
| `S3_ENDPOINT` | S3 service endpoint | `http://localhost:9000` |
| `S3_ACCESS_KEY_ID` | S3 access key | `minioadmin` |
| `S3_SECRET_ACCESS_KEY` | S3 secret key | `minioadmin` |
| `S3_REGION` | S3 region | `us-east-1` |

## Development

- **GraphQL Schema:** Available at `http://localhost:8080/graphql`
- **Code generation:** `npm run codegen`
