# movie-app-backend
## REST API documentation:


# GROUPS

This documentation outlines the endpoints for managing groups in the application.

## 1. Get List of All Groups

### Endpoint: `GET /group/allgroups`

Retrieve a list of all groups with their IDs and names.

#### Request:

- Method: `GET`
- URL: `/group/allgroups`

#### Response:

- Status Code: `201 OK`
  - Content: Array of group objects, each containing:
    - `id`: ID of the group.
    - `name`: Name of the group.

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 2. Retrieve Group Information

### Endpoint: `GET /group/:groupId`

Retrieve information about a specific group based on the group ID.

#### Request:

- Method: `GET`
- URL: `/group/:groupId` (Replace `:groupId` with the ID of the desired group.)

#### Response:

- Status Code: `201 OK`
  - Content: Object containing:
    - `name`: Name of the group.
    - `description`: Description of the group.
    - `avatar_url`: URL of the group's avatar.

- Status Code: `404 Not Found`
  - Content: `{ "error": "Group not found" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 3. Retrieve Group Members' Basic Info

### Endpoint: `GET /group/members/:groupId`

Retrieve basic information about members of a specific group.

#### Request:

- Method: `GET`
- URL: `/group/members/:groupId` (Replace `:groupId` with the ID of the desired group.)

#### Response:

- Status Code: `201 OK`
  - Content: Array of member objects, each containing:
    - `id`: ID of the member.
    - `username`: Username of the member.
    - `avatar`: URL of the member's avatar.

- Status Code: `404 Not Found`
  - Content: `{ "error": "Group not found" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 4. Add Group

### Endpoint: `POST /group/add`

Create a new group.

#### Request:

- Method: `POST`
- URL: `/group/add`
- Body:
  - `gname`: Name of the new group.
  - `gdesc`: Description of the new group.
  - `gavatar`: URL of the new group's avatar.
  - `owner`: ID of the group owner.

#### Response:

- Status Code: `201 OK`
  - Content: Object containing:
    - `message`: "Group created successfully".
    - `result`: Object with the ID and name of the new group.

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 5. Delete Group

### Endpoint: `DELETE /group/delete/:groupId`

Delete a group based on the group ID.

#### Request:

- Method: `DELETE`
- URL: `/group/delete/:groupId` (Replace `:groupId` with the ID of the group to delete.)

#### Response:

- Status Code: `201 OK`
  - Content: Object containing:
    - `result`: null.
    - `message`: "Group deleted".

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 6. Add User to Group

### Endpoint: `POST /group/addmember`

Add a user to a group.

#### Request:

- Method: `POST`
- URL: `/group/addmember`
- Body:
  - `userid`: ID of the user to add.
  - `groupid`: ID of the group to which the user is added.

#### Response:

- Status Code: `201 OK`
  - Content: Object containing:
    - `result`: null.

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 7. Delete User from Group

### Endpoint: `DELETE /group/deletemember/:userId`

Remove a user from a group.

#### Request:

- Method: `DELETE`
- URL: `/group/deletemember/:userId` (Replace `:userId` with the ID of the user.)

#### Response:

- Status Code: `201 OK`
  - Content: Object containing:
    - `result`: null.

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`



## 1. Check if Member

### Endpoint: `GET /is-member/:userID/:groupID`

Check if a user is a member of a group.

#### Request:

- Method: `GET`
- URL: `/is-member/:userID/:groupID`

#### Response:

- Status Code: `200 OK`
  - Content: Boolean indicating whether the user is a member.

- Status Code: `400 Bad Request`
  - Content: `{ "error": "User ID and Group ID are required" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 2. Check if Owner

### Endpoint: `GET /is-owner/:userID/:groupID`

Check if a user is the owner of a group.

#### Request:

- Method: `GET`
- URL: `/is-owner/:userID/:groupID`

#### Response:

- Status Code: `200 OK`
  - Content: Boolean indicating whether the user is the owner.

- Status Code: `400 Bad Request`
  - Content: `{ "error": "User ID and Group ID are required" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 3. Retrieve Groups User Is Part Of

### Endpoint: `GET /groupsbyuser/:userId`

Retrieve the groups that a user is a part of.

#### Request:

- Method: `GET`
- URL: `/groupsbyuser/:userId`

#### Response:

- Status Code: `200 OK`
  - Content: Array of group objects, each containing:
    - `name`: Name of the group.
    - `description`: Description of the group.
    - `avatar_url`: URL of the group's avatar.

- Status Code: `204 No Content`
  - Content: `{ "error": "No Groups Found" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

# GROUP JOIN REQUESTS

Endpoints for managing join requests in the application.

## 1. Get Pending Requests

### Endpoint: `GET /grouprequests/:userId`

Retrieve pending join requests for groups owned by the user.

#### Request:

- Method: `GET`
- URL: `/grouprequests/:userId` (Replace `:userId` with the ID of the user.)

#### Response:

- Status Code: `200 OK`
  - Content: Array of objects, each containing:
    - `group_id`: ID of the group.
    - `requests`: Array of user IDs with pending requests for the group.

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 2. Add Group Join Request

### Endpoint: `POST /grouprequests/create`

Create a new join request for a group.

#### Request:

- Method: `POST`
- URL: `/grouprequests/create`
- Body:
  - `userid`: ID of the user creating the request.
  - `groupid`: ID of the group for which the user is requesting to join.

#### Response:

- Status Code: `201 Created`
  - Content: Object containing:
    - `message`: "Join request created successfully".

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 3. Request Response: Ignore or Add Member

### Endpoint: `DELETE /grouprequests/:userId/fromgroup/:groupId/choice/:choice`

Respond to a join request by either adding the user to the group or ignoring the request.

#### Request:

- Method: `DELETE`
- URL: `/grouprequests/:userId/fromgroup/:groupId/choice/:choice` (Replace `:userId` with the ID of the user, `:groupId` with the ID of the group, and `:choice` with 1 to add the user or 0 to ignore and delete the request.)

#### Response:

- Status Code: `200 OK`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`
