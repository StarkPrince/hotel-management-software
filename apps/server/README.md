---

### **User**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique identifier for the user (cuid).    |
| name            | String?       | Name of the user (optional).              |
| email           | String?       | Unique email of the user (optional).      |
| password        | String        | Encrypted password.                       |
| role            | UserRole      | Role of the user (e.g., ADMIN, STAFF).    |
| departmentId    | String?       | Associated department's ID (optional).    |
| createdAt       | DateTime      | Timestamp when created.                   |

---

### **Department**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique identifier for the department.     |
| name            | String        | Name of the department.                   |
| staff           | User[]        | List of users in this department.         |
| createdAt       | DateTime      | Timestamp when created.                   |
| updatedAt       | DateTime      | Timestamp when updated.                   |

---

### **Room**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique identifier for the room.           |
| number          | String        | Unique room number.                       |
| type            | RoomType      | Room type (e.g., STANDARD, SUITE).        |
| status          | RoomStatus    | Availability status (e.g., AVAILABLE).    |
| floor           | Int           | Floor number of the room.                 |
| price           | Float         | Price per night.                          |
| createdAt       | DateTime      | Timestamp when created.                   |

---

### **Booking**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique identifier for the booking.        |
| roomId          | String        | Associated room's ID.                     |
| guestName       | String        | Name of the guest.                        |
| checkIn         | DateTime      | Check-in date.                            |
| checkOut        | DateTime      | Check-out date.                           |
| totalAmount     | Float         | Total amount for the booking.             |
| paymentStatus   | PaymentStatus | Payment status (e.g., PENDING).           |

---

### **Task**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique identifier for the task.           |
| title           | String        | Title of the task.                        |
| description     | String?       | Task description (optional).              |
| userId          | String        | ID of the assigned user.                  |
| dueDate         | DateTime      | Deadline for the task.                    |
| priority        | Priority      | Task priority (e.g., LOW, URGENT).        |
| status          | TaskStatus    | Status of the task (e.g., PENDING).       |

---

### **Session**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique session identifier.                |
| userId          | String        | Associated user's ID.                     |
| bookingId       | String        | Associated booking's ID.                  |
| jwt             | String        | JWT token for session validation.         |
| expiresAt       | DateTime      | Expiry time for the session.              |
| isActive        | Boolean       | Indicates if the session is active.       |
| lastActivity    | DateTime      | Timestamp of the last session activity.   |

---

### **Amenity**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique identifier for the amenity.        |
| name            | String        | Name of the amenity.                      |
| category        | AmenityType   | Type of amenity (e.g., POOL, SPA).        |
| maxUsage        | Int?          | Maximum usage allowed per booking.        |
| isActive        | Boolean       | Indicates if the amenity is active.       |
| createdAt       | DateTime      | Timestamp when created.                   |

---

### **PlatformBooking**
| Column          | Type          | Description                                |
|-----------------|---------------|--------------------------------------------|
| id              | String        | Unique platform booking identifier.       |
| bookingId       | String        | Associated booking's ID.                  |
| platform        | BookingSource | Booking platform (e.g., DIRECT).          |
| platformId      | String        | Original ID from the platform.            |
| metadata        | Json          | Platform-specific details.                |
