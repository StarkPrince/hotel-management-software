![License GPL](https://img.shields.io/badge/License-GPL-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)


# Hotel and Rstraurent Management System 🏨  

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

## Getting Started  

### Prerequisites  
- **Node.js** (v16 or later)  
- **npm** (v7 or later)  
- **Database**: PostgreSQL (recommended)  

### Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/Mithilastack/spirit.git
   cd spirit

2.  Install dependencies:
    
    ```bash
    npm install
    
    ```
    
3.  Set up the database using Prisma:
    
    ```bash
    npx prisma migrate dev
    
    ```
    
4.  Run the development server:
    
    ```bash
    npm run dev
    
    ```
    
5.  Open [http://localhost:3000](http://localhost:3000/) in your browser to access the application.
    

----------
## Technologies Used 💻

**Category**

**Technology**

**Purpose**

**Framework**

`Next.js`

Framework for building server-rendered React applications.

**UI Library**

`@radix-ui/react-*`

Components for building accessible, customizable UI elements.

**State Management**

`react-hook-form`

Managing form state and validation.

**Styling**

`tailwindcss`

Utility-first CSS framework for styling.

**Server**

`fastify`

Web framework for building fast and scalable server APIs.

**Database ORM**

`Prisma`

ORM for database interaction.

**Authentication**

`next-auth`

Authentication for Next.js applications.

**Data Fetching**

`SWR`

Stale-while-revalidate data fetching library.

**Validation**

`zod`

Schema-based data validation.

Library for creating touch-enabled carousels.

**Charts**

`recharts`

Library for building responsive charts and graphs.

**Forms**

`@hookform/resolvers`

Resolver integration for React Hook Form with Zod validation.

**HTTP Client**

`axios`

Promise-based HTTP client for API requests.

**TypeScript**

`typescript`

Strongly typed JavaScript for application development.

**Linting**

`eslint`

Linting tool for maintaining code quality.

**Build Tools**

`postcss`, `autoprefixer`

Tools for processing and optimizing CSS.

This table highlights the essential tools and libraries, organized by their functionality, to give a quick overview of the project's technological stack.

----------

## Contributing 🤝

We welcome contributions from everyone! Whether you want to add features, fix bugs, or improve documentation, your input is valuable.

1.  Fork the repository.
2.  Create a new branch for your changes:
    
    ```bash
    git checkout -b feature/your-feature-name
    
    ```
    
3.  Commit your changes:
    
    ```bash
    git commit -m "Add your message here"
    
    ```
    
4.  Push to your branch:
    
    ```bash
    git push origin feature/your-feature-name
    
    ```
    
5.  Open a pull request.

For more details, see the Codeofconduct.md

----------

## Release Notes 📢

### Latest Update Highlights

-   **Dashboard Analytics**: Enhanced data visualization and real-time metrics.
-   **Room Management**: Detailed tracking of check-ins, check-outs, and room history.
-   **Staff Management**: Role-based permissions and integrated shift scheduling.
-   **External Booking Integration**: Seamless synchronization with major booking platforms.

For full release notes, see [RELEASE.md](https://chatgpt.com/c/RELEASE.md).

----------

## License 📝

This project is licensed under the GPL-3.0 License.

----------

## Acknowledgments 🙏

Special thanks to:

-   [Radix UI](https://www.radix-ui.com/) for accessible UI components.
-   [Prisma](https://www.prisma.io/) for simplifying database interactions.
-   The open-source community for inspiration and support.

----------

Feel free to contribute, star the repository, and share it with others in the hotel industry. Together, we can build something amazing!

```

This **README.md** file combines technical details with an approachable tone to attract contributors and provide users with clear guidance. Let me know if you'd like to customize it further!

```


