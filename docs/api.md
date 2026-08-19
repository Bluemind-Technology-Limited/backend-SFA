# SFA Backend API Documentation

This document describes the REST API for the Sales Force Automation backend.

## Base URL

All endpoints are prefixed with `/api`.

## Authentication

The backend uses **Supabase Auth** for authentication. Clients sign in via
Supabase on their own, then send the resulting JWT to this API.

Every protected endpoint requires the header:

```
Authorization: Bearer <JWT>
```

The backend verifies the JWT with Supabase and attaches the database user to the
request before executing the handler.

## Roles

| Role | Access |
| --- | --- |
| `SALES` | Sales team mobile app |
| `DISTRIBUTOR` | Distributor web app |
| `SUPER_ADMIN` | Super admin web app |

## Response Format

Successful responses:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "...",
  "code": "..."
}
```

---

## Endpoints

### Health

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Returns a simple health check |

### Auth

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| GET | `/api/auth/me` | all | Returns the authenticated user's profile |

### Users (Super Admin only)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/users` | Lists all users (optional `?role=`) |
| GET | `/api/users/:id` | Returns a single user |
| POST | `/api/users` | Creates a user |
| PUT | `/api/users/:id` | Updates a user |
| DELETE | `/api/users/:id` | Deactivates a user |

### Distributors (Super Admin only)

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/distributors` | Lists all distributors |
| GET | `/api/distributors/:id` | Returns a distributor with their sales team |
| GET | `/api/distributors/:id/sales-users` | Lists a distributor's sales users |

### Products

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| GET | `/api/products` | SALES, DISTRIBUTOR, SUPER_ADMIN | Lists active products |
| GET | `/api/products/:id` | SALES, DISTRIBUTOR, SUPER_ADMIN | Returns a product |
| POST | `/api/products` | SUPER_ADMIN | Creates a product |
| PUT | `/api/products/:id` | SUPER_ADMIN | Updates a product |
| DELETE | `/api/products/:id` | SUPER_ADMIN | Deactivates a product |

### Requests

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| GET | `/api/requests` | all | Lists requests (filtered by role) |
| GET | `/api/requests/:id` | all | Returns a request (access controlled) |
| POST | `/api/requests` | SALES | Creates a request |
| PATCH | `/api/requests/:id/review` | DISTRIBUTOR, SUPER_ADMIN | Reviews (approve/reject) a request |

### Dashboard

| Method | Path | Roles | Description |
| --- | --- | --- | --- |
| GET | `/api/dashboard` | all | Returns role-specific dashboard stats |

---

## Request Body Examples

### Create User

```json
{
  "authId": "supabase-auth-id",
  "email": "sales@example.com",
  "name": "Sales User",
  "role": "SALES",
  "phone": "08012345678",
  "distributorId": "distributor-id"
}
```

### Create Product

```json
{
  "name": "Product A",
  "sku": "SKU-A",
  "description": "A sample product",
  "unit": "pcs"
}
```

### Create Request

```json
{
  "items": [
    { "productId": "product-id-1", "quantity": 5 },
    { "productId": "product-id-2", "quantity": 10 }
  ]
}
```

### Review Request

```json
{
  "status": "APPROVED",
  "reviewNote": "All items available."
}
```
