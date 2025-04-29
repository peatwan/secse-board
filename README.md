# SECSE Board

A dashboard application for monitoring and managing SECSE (Structure-Evolution and Control Systems Engineering) molecular design projects.

## Overview

SECSE Board is a web-based dashboard that provides an intuitive interface for:

- Creating new SECSE molecular design projects
- Monitoring ongoing projects
- Visualizing molecular structures and docking scores
- Managing project configurations and parameters

The application consists of a React frontend built with TypeScript and a Flask backend API.

## Features

- **Project Creation**: Create new molecular design projects with custom parameters
- **Project Monitoring**: Track the progress of running projects in real-time
- **Data Visualization**: View docking scores, molecule numbers, and other metrics
- **3D Molecule Visualization**: Visualize molecular structures using 3D rendering
- **File Management**: Browse and manage project files and directories

## Tech Stack

### Frontend

- React with TypeScript
- Vite for build tooling
- React Router for navigation
- NextUI and Tailwind CSS for UI components
- ECharts for data visualization
- 3DMol and RDKit for molecular visualization

### Backend

- Flask (Python) API
- Pandas for data processing
- Loguru for logging

## Getting Started

### Prerequisites

- Node.js and npm/pnpm
- Python 3.x with Anaconda (recommended)
- Git

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/secse-board.git
   cd secse-board
   ```

2. Install frontend dependencies:

   ```
   pnpm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

### Development

1. Start the frontend development server:

   ```
   pnpm dev
   ```

2. In a separate terminal, start the backend API:

   ```
   pnpm api
   ```

3. The application will be available at http://localhost:5180

### Production Build

Build the production version of the frontend:

```
pnpm build
```

The output will be in the `dist` directory.

## Project Structure

```
secse-board/
├── backend/           # Flask backend API
│   ├── app/           # API application code
│   ├── data/          # Data files
│   └── run.py         # Entry point for the API
├── public/            # Static public assets
├── src/               # React frontend
│   ├── api/           # API client code
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   └── utils/         # Utility functions
└── types/             # TypeScript type definitions
```

## Authors

- peatwan (peatwan9@gmail.com)
