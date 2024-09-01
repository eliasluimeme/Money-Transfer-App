# Money Transfer App

## Getting Started

1. Clone the Repository
Start by cloning the project repository:

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

2. Docker Compose
The project includes a docker-compose.yml file that defines the services:

To build and start the services, run:

```bash
docker-compose up --build
```

This command will:
Build the Docker images for the frontend and backend.
Start the containers for the frontend, backend, and PostgreSQL database.

3. Running Migrations
Once the services are up, you need to apply the Django migrations to set up the database schema:

```bash
docker-compose exec backend python manage.py migrate
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Overview:

The system will follow a microservices architecture with the following main components:
* Backend: Python Django REST Framework
* Frontend: Next.js
* Database: PostgreSQL
* Authentication: JWT (JSON Web Tokens)
* Caching: Redis
* Message Queue: RabbitMQ (for asynchronous tasks)

Data flow:
1. User interacts with the Next.js frontend
2. Frontend makes API calls to the Django backend
3. Backend processes requests, interacts with the database, and returns responses
4. Component Breakdown:

## User Management:

* Handles user registration, authentication, and profile management
* Manages user roles (sender, receiver, agent)
b. Transaction Management:
* Creates and processes money transfer transactions
* Tracks transaction status and history
c. Escrow System: 
* Manages temporary holding of funds during transactions
* Ensures secure fund transfers between parties
d. Agent Matching:
* Assigns available agents to transactions
* Manages agent availability and workload
e. Notification Service:
* Sends notifications to users about transaction status updates
* Handles email and SMS notifications
f. Reporting and Analytics:
* Generates reports on transaction volumes, user activity, etc.
* Provides insights for business intelligence

## Database Schema:

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    agent_id INTEGER REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Escrow Table
CREATE TABLE escrow (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(id),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    released_at TIMESTAMP
);

-- Agent Availability Table
CREATE TABLE agent_availability (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER REFERENCES users(id),
    status VARCHAR(20) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## API Design:

a. User Management:
* POST /api/users/register - Register a new user
* POST /api/users/login - User login
* GET /api/users/profile - Get user profile
* PUT /api/users/profile - Update user profile
* PUT /api/users/role - Switch user role
b. Transaction Management:
* POST /api/transactions - Create a new transaction
* GET /api/transactions/{id} - Get transaction details
* GET /api/transactions - List user's transactions
* PUT /api/transactions/{id}/status - Update transaction status
c. Agent Operations:
* POST /api/agents/availability - Set agent availability
* GET /api/agents/transactions - Get assigned transactions
* PUT /api/agents/transactions/{id}/confirm - Confirm transaction
d. Escrow Operations:
* POST /api/escrow/release/{transaction_id} - Release funds from escrow
5. Security Considerations:
a. User Authentication and Authorization:
* Implement JWT-based authentication
* Use role-based access control (RBAC) for different user types
b. Data Encryption:
* Use HTTPS for all API communications
* Encrypt sensitive data at rest (e.g., using PostgreSQL's pgcrypto extension)
c. Input Validation and Sanitization:
* Validate and sanitize all user inputs to prevent SQL injection and XSS attacks
d. Rate Limiting:
* Implement API rate limiting to prevent abuse and DDoS attacks
e. Secure Password Storage:
* Use strong hashing algorithms (e.g., bcrypt) for password storage
f. Audit Logging:
* Implement comprehensive logging for all sensitive operations
g. Fraud Prevention:
* Implement transaction limits
* Use multi-factor authentication for high-value transactions
