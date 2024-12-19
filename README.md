
![License GPL](https://img.shields.io/badge/License-GPL-green.svg)

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

  
  

# Hotel Management System 🏨

  

A modern, free, and open-source hotel management software built to streamline operations, enhance guest experience, and simplify daily management tasks. Whether you're managing reservations, tracking staff performance, or analyzing data, our software is designed to empower hotel owners with powerful tools.

  

---

  

## Features

  

### 1. **Dashboard Analytics**

- Gain actionable insights with detailed analytics.

- Visualize occupancy rates, revenue trends, and operational performance in real-time.

- Customizable widgets to prioritize key metrics.

  

### 2. **Room Management**

- Track bookings, check-ins, and check-outs with ease.

- Maintain room status, history, and maintenance logs.

- Seamlessly integrate with task management for smooth operations.

  

### 3. **Staff Management**

- Manage team roles, tasks, and shift schedules efficiently.

- Role-based access control ensures better data security.

- Track individual performance and task history.

  

### 4. **Task and Maintenance Tracking**

- Assign, monitor, and resolve tasks like housekeeping and repairs.

- Receive real-time updates on task completion.

- Schedule maintenance to minimize room downtime.

  

### 5. **External Booking Platform Integration**

- Sync reservations with leading booking platforms in real time.

- Avoid double bookings with unified reservation management.

  

---

  

To update your Markdown file for the new TurboRepo and microservices architecture, you can reorganize the sections to reflect the changes in your project structure. 
  

Here's how you can structure the updated Markdown file:

  

---

  

# Hotel Management Software 

  

## Getting Started

  

### Prerequisites

  

Before starting, ensure you have the following tools installed:

  

-  **Node.js** (v16 or later)

-  **npm** (v7 or later)

-  **PostgreSQL** (recommended for the database)

  

### Installation

  

1.  **Clone the repository:**

  

	```bash
	git clone https://github.com/starkprince/hotel-management-software.git
	cd hotel-management-software
	```

2.  **Install dependencies:**
This will install the dependencies for the entire TurboRepo workspace (both client and server):
	```bash
	npm install
	```

3.  **Set up the database using Prisma:**
Ensure that PostgreSQL is running. You can set it up locally or use a cloud provider. Run the following command to apply database migrations:
	```bash
	npx prisma generate
	npx prisma migrate dev
	```
4.  **Access the application:**
Open [http://localhost:3000](http://localhost:3000/) in your browser to access the frontend client application.
The backend server should be running on [http://localhost:4000](http://localhost:4000/), handling API requests.


---  

## Architecture
  

-  **Client**: The frontend application using Next.js.

-  **Server**: The backend API built with Fastify.

  

These services are under apps whose build is managed by Turborepo which help improve build times and manage monorepos.
  

### Services Overview

  

#### **Client Service** (Frontend)

- Built with **Next.js** for server-rendered React applications.

- Uses **TailwindCSS** for styling and **React Hook Form** for form management.

- The frontend communicates with the backend through RESTful APIs.

  

#### **Server Service** (Backend)

- Built with **Fastify** for fast and scalable server-side APIs.

-  **Prisma** ORM for database interactions (PostgreSQL).

-  **Next-auth** for authentication and user management.

- The backend provides REST APIs consumed by the client service.

  

---

  

## Technologies Used 💻

  

| **Category**            | **Technology**               | **Purpose**                                                                 |
|--------------------------|------------------------------|-----------------------------------------------------------------------------|
| **Framework**            | `Next.js`                   | Framework for building server-rendered React applications.                 |
| **UI Library**           | `@radix-ui/react-*`         | Accessible, customizable UI components.                                    |
| **State Management**     | `react-hook-form`           | Managing form state and validation.                                        |
| **Styling**              | `tailwindcss`               | Utility-first CSS framework for styling.                                   |
| **Server**               | `fastify`                   | High-performance web framework for building server APIs.                   |
| **Database ORM**         | `Prisma`                    | ORM for database interaction (PostgreSQL).                                 |
| **Authentication**       | `next-auth`                 | Authentication for Next.js applications.                                   |
| **Data Fetching**        | `SWR`                       | Stale-while-revalidate data fetching library.                              |
| **Validation**           | `zod`                       | Schema-based data validation.                                              |
| **Charts**               | `recharts`                  | Library for building responsive charts and graphs.                         |
| **Forms**                | `@hookform/resolvers`       | Resolver integration for React Hook Form with Zod validation.              |
| **HTTP Client**          | `axios`                     | Promise-based HTTP client for API requests.                                |
| **JWT Management**       | `@fastify/jwt`              | JWT integration for Fastify server.                                        |
| **Utilities**            | `clsx`, `class-variance-authority` | Utility libraries for conditional class handling.                         |
| **Date Management**      | `date-fns`                  | JavaScript library for date manipulation.                                  |
| **Linting**              | `eslint`, `prettier`        | Linting and formatting tools for maintaining code quality.                 |
| **Build Tools**          | `tsup`, `postcss`, `autoprefixer` | Tools for building and optimizing CSS and TypeScript files.               |
| **QR Code Generation**   | `qrcode`                    | Library for generating QR codes.                                           |
| **Drag-and-Drop**        | `@hello-pangea/dnd`         | Drag-and-drop interactions for React.                                      |
| **Table Management**     | `@tanstack/react-table`     | Library for building flexible and powerful tables.                         |

  

---



## Final Folder Structure

  

With the move to TurboRepo and microservices, the project structure has changed as follows:

  

```

/hotel-management-software

├── /apps
│ ├── /web # Frontend service (Next.js)
│ │ ├── /src
│ │ ├── package.json
│ │ └── .env
│ ├── /server # Backend service (Fastify)
│ │ ├── /src
│ │ └── package.json
├── /node_modules # Dependencies for the entire repo
├── /shared # Shared utilities or components (if any)
├── package.json # Root-level dependencies and scripts
├── .gitignore
└── README.md # Updated project documentation
```

  

---

  

## Troubleshooting

  

-  **Database not connected**: Ensure PostgreSQL is running and properly configured. Check `.env` for correct connection strings.

-  **Prisma migrations failing**: Ensure that Prisma CLI can connect to the database. Check the `.env` file for the database URL and ensure PostgreSQL is accessible.

  

---


  

## Contributing 🤝

  

We welcome contributions from everyone! Whether you want to add features, fix bugs, or improve documentation, your input is valuable.

  

1. Fork the repository.

2. Create a new branch for your changes:

```bash
	git checkout -b feature/your-feature-name
```

3. Commit your changes:

```bash

	git commit -m "Add your message here"

```

4. Push to your branch:

```bash
	git push origin feature/your-feature-name
```

5. Open a pull request.

  

For more details, see the Codeofconduct.md

  

----------

  

## Release Notes 📢

  

### Latest Update Highlights

  

-  **Dashboard Analytics**: Enhanced data visualization and real-time metrics.

-  **Room Management**: Detailed tracking of check-ins, check-outs, and room history.

-  **Staff Management**: Role-based permissions and integrated shift scheduling.

-  **External Booking Integration**: Seamless synchronization with major booking platforms.

  

For full release notes, see [RELEASE.md](https://chatgpt.com/c/RELEASE.md).

  

----------

  

## License 📝

  

This project is licensed under the GPL-3.0 License.

  

----------

  

## Acknowledgments 🙏

  

Special thanks to:

  

- [Radix UI](https://www.radix-ui.com/) for accessible UI components.

- [Prisma](https://www.prisma.io/) for simplifying database interactions.

- The open-source community for inspiration and support.

  

----------

  

Feel free to contribute, star the repository, and share it with others in the hotel industry. Together, we can build something amazing!

  

```
This **README.md** file combines technical details with an approachable tone to attract contributors and provide users with clear guidance. Let me know if you'd like to customize it further!
```