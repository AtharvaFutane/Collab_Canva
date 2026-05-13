<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/WebSocket-Realtime-010101?style=for-the-badge&logo=socket.io" alt="WebSocket" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=for-the-badge&logo=turborepo" alt="Turborepo" />
</p>

<h1 align="center"> CollabCanvas</h1>

<p align="center">
  <strong>A real-time collaborative whiteboard built from scratch — without the Canvas API.</strong>
</p>

<p align="center">
  CollabCanvas is a high-performance collaborative drawing application that enables multiple users to sketch, diagram, and brainstorm together in real-time. Built with a custom rendering engine, WebSocket-based synchronization, and a modern monorepo architecture.
</p>

---

## 📸 Screenshots

<p align="center">
  <img src="apps/excelidraw-frontend/public/dashboard.png" alt="CollabCanvas Dashboard" width="100%" />
</p>

<p align="center">
  <img src="apps/excelidraw-frontend/public/colab_room.png" alt="CollabCanvas Canvas" width="100%" />
</p>

---

## ✨ Features

### ⚡ Real-Time Collaboration
- **Instant Sync** — All drawing actions are broadcast to connected users via WebSockets
- **Room-Based Sessions** — Create private rooms with unique URLs for team collaboration
- **Live Cursors** — See other users' cursors in real-time with name labels
- **Persistent Storage** — All drawings are automatically saved to the database

### 🎨 Advanced Drawing Tools
- **Pencil Tool** — Freehand drawing with smooth continuous paths
- **Shape Tools** — Create rectangles and circles with live preview
- **Text Tool** — Click anywhere to add text annotations
- **Eraser Tool** — Continuous object erasing with drag support
- **Selection & Dragging** — Select shapes and move them with real-time sync
- **Visual Feedback** — Dashed selection box with corner handles

### 🔐 Authentication & Security
- **JWT-Based Auth** — Secure token-based authentication system
- **Protected Rooms** — Only authenticated users can join and draw
- **User Sessions** — Persistent login with token management

### 🏗️ Developer Experience
- **Monorepo Architecture** — Organized with Turborepo for scalable development
- **Shared Packages** — Reusable UI components, types, and utilities
- **Type-Safe** — Full TypeScript coverage across frontend and backend

---

## 🏛️ Architecture

CollabCanvas is built as a **Turborepo monorepo** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐     ┌─────────────────────────┐                │
│  │   excelidraw-frontend   │     │          web            │                │
│  │   (Next.js 15 + React)  │     │    (Chat Interface)     │                │
│  │   - Landing Page        │     │    - Room Chat UI       │                │
│  │   - Auth Pages          │     │                         │                │
│  │   - Canvas/Drawing      │     │                         │                │
│  └────────────┬────────────┘     └────────────┬────────────┘                │
│               │                               │                              │
│               └───────────────┬───────────────┘                              │
│                               ▼                                              │
├───────────────────────────────────────────────────────────────────────────┬─┤
│                              BACKEND LAYER                                │ │
├───────────────────────────────────────────────────────────────────────────┤ │
│  ┌─────────────────────────┐     ┌─────────────────────────┐              │ │
│  │      http-backend       │     │       ws-backend        │              │ │
│  │     (Express.js)        │◄───►│      (WebSocket)        │              │ │
│  │   - REST API            │     │   - Real-time Events    │              │ │
│  │   - Auth Endpoints      │     │   - Room Management     │              │ │
│  │   - Room CRUD           │     │   - Shape Broadcasting  │              │ │
│  └────────────┬────────────┘     └────────────┬────────────┘              │ │
│               │                               │                            │ │
│               └───────────────┬───────────────┘                            │ │
│                               ▼                                            │ │
├─────────────────────────────────────────────────────────────────────────────┤
│                             SHARED PACKAGES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  ┌──────────────────────┐ │
│  │  @repo/  │  │  @repo/  │  │     @repo/       │  │       @repo/         │ │
│  │    ui    │  │   db     │  │     common       │  │   backend-common     │ │
│  │          │  │          │  │                  │  │                      │ │
│  │ Button   │  │ Prisma   │  │ Zod Schemas      │  │ JWT Secret Config    │ │
│  │ Card     │  │ Client   │  │ Shared Types     │  │ Middleware Utils     │ │
│  │ Code     │  │ Schema   │  │                  │  │                      │ │
│  └──────────┘  └────┬─────┘  └──────────────────┘  └──────────────────────┘ │
│                     │                                                        │
│                     ▼                                                        │
│            ┌─────────────────┐                                               │
│            │   PostgreSQL    │                                               │
│            │    Database     │                                               │
│            └─────────────────┘                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
CollabCanvas/
├── apps/
│   ├── excelidraw-frontend/     # Main Next.js drawing application
│   │   ├── app/                 # App Router pages
│   │   ├── components/          # React components (Canvas, Auth, etc.)
│   │   └── draw/                # Custom drawing engine (Game.ts)
│   │
│   ├── http-backend/            # Express.js REST API server
│   │   └── src/
│   │       ├── index.ts         # API routes (auth, rooms, chats)
│   │       └── middleware.ts    # JWT authentication middleware
│   │
│   ├── ws-backend/              # WebSocket server for real-time sync
│   │   └── src/
│   │       └── index.ts         # WebSocket event handlers
│   │
│   └── web/                     # Additional chat interface
│
├── packages/
│   ├── ui/                      # Shared UI components
│   ├── db/                      # Prisma client & database schema
│   ├── common/                  # Shared Zod schemas & types
│   ├── backend-common/          # Backend utilities (JWT config)
│   ├── eslint-config/           # Shared ESLint configuration
│   └── typescript-config/       # Shared TypeScript configuration
│
├── turbo.json                   # Turborepo pipeline configuration
├── pnpm-workspace.yaml          # pnpm workspace definition
└── package.json                 # Root package with global scripts
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 | React framework with App Router |
| | React 19 | UI library with concurrent features |
| | TypeScript | Type-safe development |
| | Tailwind CSS | Utility-first styling |
| | Lucide React | Icon library |
| **Backend** | Express.js | REST API server |
| | WebSocket (ws) | Real-time bidirectional communication |
| | JWT | Token-based authentication |
| **Database** | PostgreSQL | Primary data store |
| | Prisma | Type-safe ORM |
| **DevOps** | Turborepo | Monorepo build orchestration |
| | pnpm | Fast package manager |
| | ESLint | Code quality & linting |

---

## 🗃️ Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  photo     String?
  rooms     Room[]
  chats     Chat[]
}

model Room {
  id        Int      @id @default(autoincrement())
  slug      String   @unique
  createAt  DateTime @default(now())
  adminId   String
  admin     User     @relation(fields: [adminId], references: [id])
  chats     Chat[]
}

model Chat {
  id        Int      @id @default(autoincrement())
  roomId    Int
  message   String   // Stores shape data as JSON
  userId    String
  room      Room     @relation(fields: [roomId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## 🌐 API Reference

### HTTP Backend (Port 3001)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/signup` | Register a new user | ❌ |
| `POST` | `/signin` | Authenticate & get JWT token | ❌ |
| `POST` | `/room` | Create a new drawing room | ✅ |
| `GET` | `/room/:slug` | Get room details by slug | ❌ |
| `GET` | `/chats/:roomId` | Get all shapes/messages in a room | ❌ |

### WebSocket Backend (Port 8080)

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `join_room` | Client → Server | `{ roomId: string }` | Join a drawing room |
| `leave_room` | Client → Server | `{ roomId: string }` | Leave a drawing room |
| `chat` | Client ↔ Server | `{ message: JSON, roomId: string }` | Broadcast shape data |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **pnpm** ≥ 9.0.0
- **PostgreSQL** database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/CollabCanvas.git
   cd CollabCanvas
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create `.env` in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/collabcanvas"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

   Create `.env` in `packages/db/`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/collabcanvas"
   ```

4. **Initialize the database**
   ```bash
   cd packages/db
   pnpm prisma generate
   pnpm prisma db push
   cd ../..
   ```

5. **Start development servers**
   ```bash
   pnpm dev
   ```

   This starts all services concurrently:
   - **Frontend**: http://localhost:3000
   - **HTTP API**: http://localhost:3001
   - **WebSocket**: ws://localhost:8080

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all packages and apps for production |
| `pnpm lint` | Run ESLint across all packages |
| `pnpm format` | Format code with Prettier |
| `pnpm check-types` | Run TypeScript type checking |

### Running Individual Apps

```bash
pnpm dev --filter=excelidraw-frontend   # Frontend only
pnpm dev --filter=http-backend          # HTTP API only
pnpm dev --filter=ws-backend            # WebSocket server only
```

---

## 🎨 How the Drawing Engine Works

CollabCanvas uses a **custom rendering engine** instead of relying on the Canvas API abstractions:

1. **Shape Tracking**: All shapes (circles, rectangles, pencil strokes, text) are stored as typed objects
2. **Hit Testing**: Click detection for selection and erasing using geometric calculations
3. **Event Handling**: Mouse events (mousedown, mousemove, mouseup) track drawing actions
4. **Real-time Sync**: On shape completion, updates, or deletion — data is broadcast via WebSocket
5. **Canvas Redraw**: The `clearCanvas()` method redraws all shapes plus selection indicators

```typescript
type Shape = 
  | { type: "rect"; id: string; x: number; y: number; width: number; height: number }
  | { type: "circle"; id: string; centerX: number; centerY: number; radius: number }
  | { type: "pencil"; id: string; points: number[] } // Continuous path coordinates
  | { type: "text"; id: string; x: number; y: number; content: string; fontSize: number };
```

### Selection & Dragging
- Shapes can be selected with the arrow tool using hit testing
- Selected shapes display a dashed bounding box with corner handles
- Drag operations update coordinates in real-time across all connected users

---

## 🚢 Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables (Production)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `NODE_ENV` | Set to `production` |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  <strong>CollabCanvas</strong> — Where creativity meets collaboration. 🎨✨
</p>
