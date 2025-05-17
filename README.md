# E-Commerce Server

API Endpoints

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| GET    | /api/v1/healthcheck           | Returns server status      |
| ---    | ---                           | ---                        |
| POST   | /api/v1/auth/register         | Creates new users          |
| POST   | /api/v1/auth/login            | Login user                 |
| POST   | /api/v1/auth/logout           | Logout user                |
| POST   | /api/v1/auth/refresh          | Refresh access token       |
| ---    | ---                           | ---                        |
| GET    | /api/v1/stores                | Returns list of stores     |
| POST   | /api/v1/stores                | Creates new store          |
| GET    | /api/v1/stores/:id            | Returns store              |
| PATCH  | /api/v1/stores/:id            | Updates store              |
| DELETE | /api/v1/stores/:id            | Deletes store              |
| ---    | ---                           | ---                        |
| GET    | /api/v1/stores/:id/billboards | Returns list of billboards |
| POST   | /api/v1/stores/:id/billboards | Creates new billboard      |
| GET    | /api/v1/billboards/:id        | Returns billboard          |
| PATCH  | /api/v1/billboards/:id        | Updates billboard          |
| DELETE | /api/v1/billboards/:id        | Deletes billboard          |
| ---    | ---                           | ---                        |
| GET    | /api/v1/stores/:id/categories | Returns list of categories |
| POST   | /api/v1/stores/:id/categories | Creates new category       |
| GET    | /api/v1/categories/:id        | Returns category           |
| PATCH  | /api/v1/categories/:id        | Updates category           |
| DELETE | /api/v1/categories/:id        | Deletes category           |
| ---    | ---                           | ---                        |
| GET    | /api/v1/stores/:id/sizes      | Returns list of sizes      |
| POST   | /api/v1/stores/:id/sizes      | Creates new size           |
| GET    | /api/v1/sizes/:id             | Returns size               |
| PATCH  | /api/v1/sizes/:id             | Updates size               |
| DELETE | /api/v1/sizes/:id             | Deletes size               |
| ---    | ---                           | ---                        |
| GET    | /api/v1/stores/:id/colors     | Returns list of colors     |
| POST   | /api/v1/stores/:id/colors     | Creates new color          |
| GET    | /api/v1/colors/:id            | Returns color              |
| PATCH  | /api/v1/colors/:id            | Updates color              |
| DELETE | /api/v1/colors/:id            | Deletes color              |