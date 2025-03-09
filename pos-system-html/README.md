# Point of Sale (POS) System

## Overview
A comprehensive Point of Sale system designed to manage sales, inventory, and user interactions efficiently.

## Features
- User Authentication and Authorization
- Product Management
- Sales Transactions
- Inventory Tracking
- Sales Reporting
- Role-based Access Control

## Technology Stack
- Backend: C# .NET Core
- Frontend: JavaScript (React.js)
- Database: SQL Server
- Authentication: JWT (JSON Web Tokens)

## Prerequisites
- .NET Core SDK 6.0+ 
- Node.js 16+
- SQL Server
- Visual Studio or Visual Studio Code
- npm

## Backend Setup (.NET Core)
1. Clone the repository
```bash
git clone https://github.com/Chamindu-DM/Point-of-sale-POS-system
cd pos-system/backend
```

2. Restore NuGet Packages
```bash
dotnet restore
```

3. Database Migration
```bash
dotnet ef database update
```

4. Run Backend Server
```bash
dotnet run
```

## Frontend Setup (React)
1. Navigate to frontend directory
```bash
cd ../frontend
npm install
npm start
```

## Project Structure
```
pos-system/
│
├── backend/             # .NET Core Web API
│   ├── Controllers/     # API Controllers
│   ├── Models/          # Data Models
│   ├── Services/        # Business Logic
│   ├── Data/            # Database Context
│   └── appsettings.json # Configuration
│
├── frontend/            # React Application
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API interaction
│   │   └── utils/       # Utility functions
│
├── docs/                # Project documentation
└── README.md            # Project overview
```

## Recommended NuGet Packages
- Microsoft.EntityFrameworkCore
- Microsoft.AspNetCore.Authentication.JwtBearer
- AutoMapper
- Swashbuckle.AspNetCore (Swagger)

## Frontend NPM Packages
- axios (HTTP requests)
- react-router-dom
- redux (state management)
- antd or material-ui (UI components)

## Running Tests
- Backend: `dotnet test`
- Frontend: `npm test`

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Configuration
- Update connection strings in `appsettings.json`
- Configure JWT settings
- Set up environment-specific configurations

## Deployment Considerations
- Use Azure or AWS for hosting
- Configure CI/CD pipelines
- Set up environment-specific configurations
- Implement proper security measures

## License
Distributed under the MIT License.

## Additional Resources
- [.NET Core Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [React Documentation](https://legacy.reactjs.org/docs/getting-started.html)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/)
