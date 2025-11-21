# LiveKit Audio Visualizer (React + Vite)

This is a simple React application that connects to a LiveKit room and visualizes audio from the microphone.

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🔑 How to Connect

To use this app, you need a **LiveKit Server URL** and an **Access Token**.

1.  Go to [LiveKit Cloud Dashboard](https://cloud.livekit.io/).
2.  Create a new project (if you haven't already).
3.  **Get Server URL**: Copy the `WebSocket URL` (starts with `wss://`) from the dashboard.
4.  **Generate Token**:
    *   Click **Generate Token**.
    *   Enter an Identity (e.g., `test-user`).
    *   Ensure **Join** and **Subscribe** permissions are checked.
    *   Click **Generate** and copy the token.
5.  **Connect**: Paste the URL and Token into the app's input fields and click **Connect**.

## 🛠️ Tech Stack

*   [Vite](https://vitejs.dev/)
*   [React](https://react.dev/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [LiveKit](https://livekit.io/) (WebRTC)
*   [Tailwind CSS](https://tailwindcss.com/)
