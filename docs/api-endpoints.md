# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Documents

- `GET /api/docs`
  - Docs index
  - Displays Users documents AND documents owned by a group user belongs to
- `POST /api/docs`
  - Document must have at least one sheet
- `GET /api/docs/:id`
- `PATCH /api/docs/:id`
- `DELETE /api/docs/:id`
  - Only author can delete

### Groups

- `GET /api/groups`
- `POST /api/groups`
- `GET /api/groups/:id`
- `PATCH /api/groups/:id`
- `DELETE /api/groups/:id`
