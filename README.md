# SECSE Board

A modern dashboard application for monitoring and managing SECSE (Structure-Evolution and Control Systems Engineering) molecular design projects.

## Overview

SECSE Board is a web-based dashboard that provides an intuitive interface for molecular design workflows. The application combines real-time monitoring capabilities with advanced visualization tools to streamline the molecular design process.

### Key Capabilities

- **Project Creation**: Set up new molecular design projects with customizable parameters for docking, prediction, and molecular properties
- **Real-time Monitoring**: Track project progress with live updates and detailed statistics
- **3D Molecular Visualization**: Interactive 3D rendering of molecular structures using 3DMol.js and RDKit
- **Data Analytics**: Comprehensive visualization of docking scores, molecular metrics, and project statistics using ECharts
- **File Management**: Browse, upload, and manage project files and directory structures
- **Parameter Management**: Configure docking parameters, prediction settings, and molecular properties

The application features a modern React frontend with TypeScript and a robust Flask backend API.

## Features

- **Project Creation**: Create new molecular design projects with custom parameters
- **Project Monitoring**: Track the progress of running projects in real-time
- **Data Visualization**: View docking scores, molecule numbers, and other metrics
- **3D Molecule Visualization**: Visualize molecular structures using 3D rendering
- **File Management**: Browse and manage project files and directories

## Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Vite** for fast build tooling and hot module replacement
- **React Router DOM** for client-side routing
- **HeroUI** and **Tailwind CSS** for modern, responsive UI components
- **Framer Motion** for smooth animations and transitions
- **ECharts** for interactive data visualization and charting
- **3DMol.js** and **RDKit** for molecular structure visualization
- **Zustand** for lightweight state management
- **Axios** for HTTP client requests
- **Sonner** for elegant toast notifications

### Backend
- **Flask** (Python) REST API with production-ready architecture
- **Pandas** for efficient data processing and analysis
- **Loguru** for structured logging and debugging

### Development & Deployment
- **TypeScript** for enhanced code quality and IDE support
- **ESLint** and **Prettier** for code formatting and linting
- **Docker** and **Docker Compose** for containerized deployment
- **Nginx** for production web server configuration

## Getting Started

### Prerequisites

- **Node.js** (v18 or later) and **pnpm** (recommended) or npm
- **Python 3.8+** with **Anaconda** (recommended for managing Python environments)
- **Git** for version control
- **Docker** and **Docker Compose** (optional, for containerized deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/secse-board.git
   cd secse-board
   ```

2. **Install frontend dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up Python environment and install backend dependencies:**
   ```bash
   cd backend
   # Create conda environment (recommended)
   conda create -n secse-flask python=3.9
   conda activate secse-flask

   # Install dependencies
   pip install -r requirements.txt
   cd ..
   ```

### Development

**Option 1: Using pnpm scripts (Recommended)**

1. **Start the development environment:**
   ```bash
   # Terminal 1: Start frontend development server
   pnpm dev

   # Terminal 2: Start backend API server
   pnpm api
   ```

2. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

**Option 2: Manual startup**

1. **Start the frontend:**
   ```bash
   pnpm dev
   ```

2. **Start the backend (in separate terminal):**
   ```bash
   cd backend
   # Make sure your conda environment is activated
   conda activate secse-flask
   python run.py
   ```

### Production Deployment

**Option 1: Docker (Recommended)**

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application at http://localhost:8080
```

**Option 2: Manual build**

```bash
# Build frontend for production
pnpm build

# The built files will be in the dist/ directory
# Serve with your preferred web server (nginx, apache, etc.)
```

### Available Scripts

- `pnpm dev` - Start frontend development server
- `pnpm api` - Start backend API server
- `pnpm build` - Build frontend for production
- `pnpm serve` - Preview production build locally
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm package:backend` - Package backend for deployment

## Project Structure

```
secse-board/
├── backend/                     # Flask backend API
│   ├── app/                    # Core application modules
│   │   ├── routes/            # API route handlers
│   │   │   ├── main.py       # Main routes
│   │   │   ├── project_routes.py # Project management
│   │   │   ├── job_routes.py  # Job monitoring
│   │   │   └── file_routes.py # File operations
│   │   ├── utils/             # Utility functions
│   │   └── logging_config.py  # Logging configuration
│   ├── data/                  # Configuration and data files
│   ├── logs/                  # Application logs
│   ├── requirements.txt       # Python dependencies
│   └── run.py                 # Flask application entry point
├── src/                        # React frontend source
│   ├── api/                   # API client and type definitions
│   ├── components/            # Reusable UI components
│   │   ├── choose-modal/      # File/directory selection modal
│   │   ├── molecule-3d-viewer/ # 3D molecular visualization
│   │   ├── molecule-editor/   # Molecule editing interface
│   │   ├── molecule-viewer/   # 2D molecule display
│   │   ├── navibar/          # Navigation bar
│   │   └── react-echarts/    # Chart components
│   ├── pages/                 # Page components
│   │   ├── edit/             # Project editing
│   │   ├── home/             # Dashboard home
│   │   ├── monitor/          # Project monitoring
│   │   └── new/              # New project creation
│   ├── assets/               # Static assets and icons
│   └── utils/                # Frontend utility functions
├── public/                    # Public static assets
├── types/                     # TypeScript type definitions
├── docker-compose.yml         # Docker composition
├── Dockerfile.frontend        # Frontend Docker image
├── Dockerfile.backend         # Backend Docker image
├── package.json              # Node.js dependencies and scripts
├── vite.config.ts            # Vite build configuration
├── tailwind.config.mjs       # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Features in Detail

### Project Management
- **Create Projects**: Define new molecular design projects with custom parameters
- **Import/Export**: Import existing projects and export results
- **Template System**: Use predefined templates for common workflows

### Monitoring Dashboard
- **Real-time Updates**: Live progress tracking with WebSocket connections
- **Statistical Overview**: Project statistics, completion rates, and performance metrics
- **Job Queue Management**: Monitor and manage computational job queues

### Molecular Visualization
- **3D Rendering**: Interactive 3D molecular structures with zoom, rotate, and pan
- **2D Structures**: Chemical structure diagrams with highlighting
- **Property Visualization**: Color-coded molecular properties and binding sites

### Data Analysis
- **Interactive Charts**: Docking scores, energy distributions, and property correlations
- **Export Options**: Export charts and data in various formats (PNG, SVG, CSV)
- **Filtering**: Advanced filtering and sorting of molecular data

## Configuration

### Backend Configuration
The backend uses a configuration file at `backend/data/config.ini` for:
- Database connections
- File paths and directories
- API settings
- Logging levels

### Frontend Configuration
Environment variables can be configured in `.env` files:
- API endpoints
- Feature flags
- Build-time configurations

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write unit tests for new features
- Ensure code passes linting and type checking
- Update documentation for API changes


## Authors

- **peatwan** (peatwan9@gmail.com) - Initial work and maintenance

## Support

For support, email peatwan9@gmail.com or open an issue on GitHub.
