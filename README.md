
---

### 2. Asset Risk Dashboard with TOTP

This one is actually **stronger for an HR/recruiter email** because it demonstrates security + backend + dashboard development.

```markdown
# Asset Risk Dashboard

A security-focused asset management and risk monitoring dashboard built to provide centralized visibility into infrastructure assets, their security posture, and associated risks.

The application includes secure multi-factor authentication using TOTP and provides an interactive dashboard for monitoring and analyzing asset-related security information.

## Features

- Secure user authentication
- TOTP-based Two-Factor Authentication (2FA)
- Asset management and monitoring
- Risk assessment dashboard
- Interactive data visualization
- Search, filtering, and pagination
- Role-based access control
- RESTful backend APIs
- Secure session and authentication handling

## Tech Stack

### Frontend
- React.js
- Material UI
- JavaScript

### Backend
- Python
- Django
- Django REST Framework

### Authentication & Security
- JWT Authentication
- TOTP-based 2FA
- Role-Based Access Control

### Database & Infrastructure
- PostgreSQL
- Redis

## Architecture

```text
React Dashboard
      ↓
Django REST API
      ↓
Authentication & Authorization
      ↓
PostgreSQL
      ↓
Redis / Background Processing
