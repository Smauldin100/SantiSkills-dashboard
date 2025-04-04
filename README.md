# SantiSkills Dashboard

A comprehensive skills management and personal development dashboard built with React.

## Overview

SantiSkills Dashboard is a modern web application designed to help users track, manage, and visualize their skills development journey. The dashboard provides a centralized platform for monitoring various aspects of personal and professional growth.

## Features

### 1. Skills Visualization
- Interactive radar charts for skill assessment
- Timeline view of skill progression
- Language usage analytics
- Skills gap analysis

### 2. Project Management
- Project tracking and organization
- Progress monitoring
- Task management system
- Project timeline visualization

### 3. Professional Development
- Experience tracking
- Education history
- Certification management
- Professional achievements

### 4. Personal Organization
- Calendar integration
- Task management
- Notification system
- Chat interface

### 5. Profile Management
- Personal information management
- Skills inventory
- Professional summary
- Achievement showcase

## Technical Stack

- **Frontend**: React.js
- **UI Components**: Material-UI (MUI)
- **Charts**: Recharts
- **Styling**: Styled Components
- **Routing**: React Router
- **State Management**: React Context API
- **Database**: SQLite
- **Authentication**: Firebase

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Smauldin100/SantiSkills-dashboard.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your configuration:
   ```
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Deployment

The application is deployed using GitHub Pages. To deploy updates:

```bash
npm run deploy
```

## Project Structure

```
santiskills-dashboard/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── charts/          # Chart components
│   ├── sections/        # Main dashboard sections
│   ├── App.js           # Main application component
│   └── index.js         # Application entry point
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue in the repository.

## Acknowledgments

- Material-UI for the component library
- Recharts for data visualization
- React community for the amazing ecosystem
