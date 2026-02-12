# Full-Stack E-Commerce Marketplace

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Managed-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

A robust, scalable marketplace platform featuring a decoupled architecture with a Django REST Framework (DRF) backend and a React-based frontend. The project is fully containerized for seamless development and deployment.

## 🌟 Key Features

### Backend (Django REST Framework)
* **Custom User Management:** Advanced user model supporting multiple roles (Customers and Sellers) with dedicated `SellerProfile`.
* **Product Catalog:** Comprehensive system for managing products, including categories, detailed descriptions, and image handling.
* **Promotion System:** Dedicated logic for product highlights and marketing promotions to increase visibility.
* **Review & Rating System:** Fully integrated feedback loop allowing users to rate products and leave detailed reviews.
* **Recommendation Engine:** Built-in module structure ready for implementing personalized user recommendations.
* **Media Management:** Automated handling of product images and static assets.

### Frontend (React SPA)
* **Component-Based Architecture:** Modular UI design with highly reusable components.
* **Dynamic Product Views:** Interactive product listings and detailed single-product pages.
* **User Authentication:** Secure interfaces for user registration, login, and profile management.
* **Responsive Styling:** Component-specific CSS modules ensuring a clean look across different screen sizes.

## 🏗 Project Structure

The project utilizes a monorepo approach, organizing the codebase into distinct service layers:

```text
├── backend/               # Django REST Framework Service
│   ├── apps/              # Domain-driven applications (Users, Products, etc.)
│   ├── marketplace/       # Core project configuration
│   └── Dockerfile         # Backend environment specification
├── frontend/              # React SPA Service
│   ├── src/               # Application logic and UI components
│   └── Dockerfile         # Frontend environment specification
├── docker-compose.yml     # Multi-container orchestration
└── init-privileges.sql    # Database security & initialization script
```
🛠 Tech Stack
Backend: Python 3.10, Django, Django REST Framework.

Frontend: React, JavaScript, HTML5/CSS3.

Database: PostgreSQL.

DevOps: Docker, Docker Compose.

API: RESTful architecture.

🚀 Getting Started
Prerequisites
Docker and Docker Compose installed on your machine.

Installation & Run
Clone the repository:
```bash
git clone [https://github.com/vitaliimusiienko/marketplace-main.git](https://github.com/vitaliimusiienko/marketplace-main.git)
cd marketplace-main
```
Build and launch the containers:
```bash
docker-compose up --build
```
Access the application:

Frontend: http://localhost:3000

Backend API: http://localhost:8000

Django Admin: http://localhost:8000/admin

📡 API Endpoints (Brief Overview)
POST /api/users/register/ - New user registration.

GET /api/products/ - List all available products.

GET /api/products/`<id>`/ - Retrieve specific product details.

POST /api/reviews/ - Submit a product review.

🤝 Contributing
Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📝 License
Distributed under the MIT License.
