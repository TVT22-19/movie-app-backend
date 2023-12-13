### Table of Contents

<details>
<summary><strong>1. movie-app-backend</strong></summary>

   - [REST API documentation](#rest-api-documentation)

</details>

<details>
<summary><strong>2. GROUPS</strong></summary>

   - [1. Get All Groups](#1-get-list-of-all-groups)
   - [2. Retrieve Group Information](#2-retrieve-group-information)
   - [3. Retrieve Group Members](#3-retrieve-group-members-basic-info)
   - [4. Add Group](#4-add-group)
   - [5. Delete Group](#5-delete-group)
   - [6. Add User to Group](#6-add-user-to-group)
   - [7. Delete User from Group](#7-delete-user-from-group)
   - [8. Check if Member](#8-check-if-member)
   - [9. Check if Owner](#9-check-if-owner)
   - [10. Retrieve User's Groups](#10-retrieve-groups-user-is-part-of)

</details>

<details>
<summary><strong>3. GROUP JOIN REQUESTS</strong></summary>

   - [1. Get Pending Requests](#1-get-pending-requests)
   - [2. Add Join Request](#2-add-group-join-request)
   - [3. Respond to Request](#3-request-response-ignore-or-add-member)

</details>

<details>
<summary><strong>4. USER</strong></summary>

   - [1. Get All Users](#1-get-list-of-all-users)
   - [2. Get User by ID](#2-get-user-by-id)
   - [3. Update User Information](#3-update-user-information)
   - [4. Delete User](#4-delete-user)

</details>

<details>
<summary><strong>5. REVIEW</strong></summary>

   - [1. Get All Reviews](#1-get-all-reviews)
   - [2. Get Review by ID](#2-get-review-by-id)
   - [3. Get Reviews by Movie ID](#3-get-reviews-by-movie-id)
   - [4. Add Review](#4-add-review)
   - [5. Delete Review](#5-delete-review)
   - [6. Get Reviews by User ID](#6-get-reviews-by-user-id)

</details>

<details>
<summary><strong>6. MOVIEDB</strong></summary>

   - [1. Get Genres](#1-get-genres)
   - [2. Get Movie Details by ID](#2-get-movie-details-with-id)
   - [3. Search Movies](#3-search-movies)
   - [4. Search TV Series](#4-search-tv-series)
   - [5. Generate Poster URL](#5-generate-full-url-for-movie-posters)

</details>

<details>
<summary><strong>7. AUTH</strong></summary>

   - [1. Login](#1-login)
   - [2. Register](#2-register)

</details>




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



## 8. Check if Member

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

## 9. Check if Owner

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

## 10. Retrieve Groups User Is Part Of

### Endpoint: `GET /groupsbyuser/:userId`

Retrieve the groups that a user is a part of.

#### Request:

- Method: `GET`
- URL: `/groupsbyuser/:userId`

#### Response:

- Status Code: `200 OK`
  - Content: Array of group-user connections, each containing:
    - `group_id`: Group ID.
    - `user_id`: Group ID.

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

# USER

Endpoints to manage user data

## 1. Get List of All Users

### Endpoint: `GET /users`

Retrieve a list of all users

### Request:

- Method: `GET`
- URL: `/users`

### Response:

- Status Code: `200 OK`
  - Content: Array of group objects, each containing:
    - `id`: ID of the user
    - `username`: Username of the user
    - `registration_date`: Registration date of the user
    - `age`: Age of the user
    - `firstname`: Firstname of the user
    - `lastname`: Lastname of the user
    - `avatar_url`: Avatar URL of the user

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error"}`

## 2. Get user by ID

### Endpoint: `GET /users/:id`

Retrieve specific user information based on the user ID

### Request:

  - Method: `GET`
  - URL: `/users/:id`

### Response:

- Status Code: `200 OK`
  - Content: Object containing:
    - `id`: ID of the user
    - `username`: Username of the user
    - `registration_date`: Registration date of the user
    - `age`: Age of the user
    - `firstname`: Firstname of the user
    - `lastname`: Lastname of the user
    - `avatar_url`: Avatar URL of the user

- Status Code: `404 Not Found`
  - Content: `{ "error": "User not found" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 3. Update user information

### Endpoint: `POST /users/update`

Update user information

### Request:

- Method: `POST`
- URL: `/users/update`
- Body:
  - `id`: ID of the user
  - `username`: New username of the user
  - `password`: New password of the user
  - `registration_date`: Registration date of the user
  - `age`: New age of the user
  - `firstname`: New firstname of the user
  - `lastname`: New lastname of the user
  - `avatar_url`: New avatar URL of the user

### Response

- Status Code: `200 OK`
  - Content: Object containing:
    - `message`: "Update successful"
    - `username`: New username
    - `token`: Newly generated token

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 4. Delete user

### Endpoint: `/users/delete/:id`

Removes user from database

### Request:

- Method: `DELETE`
- URL: `/users/delete/:id`

### Response

- Status Code `200 OK`
  - Content: 
    - `message`: "User deleted successfully"
    - `database`: Database response

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

# REVIEW

Endpoints for managing review data

## 1. Get all reviews

### Endpoint: `/review`

Retrieves all reviews

### Request:

- Method: `GET`
- URL: `/review`

### Response

- Status Code `200 OK`
  - Content: Array of review objects, each containing:
    - `id`: ID of the review
    - `timestamp`: Timestamp of the review
    - `user_id`: User ID of the review owner
    - `movie_id`: Movie ID of the movie which the review were written
    - `content`: Review content
    - `rating`: Review rating

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 2. Get review by ID

### Endpoint: `/review/:id`

Retrieve specific review information

### Request:

- Method: `GET`
- URL: `/review/:id`

### Response

- Status Code `200 OK`
  - Content: Object of the review, containing:
    - `id`: ID of the review
    - `timestamp`: Timestamp of the review
    - `user_id`: User ID of the review owner
    - `movie_id`: Movie ID of the movie which the review were written
    - `content`: Review content
    - `rating`: Review rating

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 3. Get reviews by movie ID

### Endpoint: `/review/movieid/:id`

Retrieve specific movies reviews

### Request:

- Method: `GET`
- URL: `/review/movieid/:id`

### Response

- Status Code `200 OK`
  - Content: Array of review objects, each containing:
    - `id`: ID of the review
    - `timestamp`: Timestamp of the review
    - `user_id`: User ID of the review owner
    - `movie_id`: Movie ID of the movie which the review were written
    - `content`: Review content
    - `rating`: Review rating

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 4. Add review

### Endpoint: `/review`

Create new review

### Request:

- Method: `POST`
- URL: `/review`
- Body:
  - `userID`: ID of the user who created the review
  - `movieID`: ID of the movie which this review was written
  - `content`: Content of the review
  - `rating`: Rating of the review

### Response

- Status Code `200 OK`
  - Content: 
    - `message`: "Review added successfully"
    - `database`: database response

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 5. Delete review

### Endpoint: `/review/:reviewID`

Removes the review with ID

### Request:

- Method: `DELETE`
- URL: `/review/:reviewID`

### Response

- Status Code `200 OK`
  - Content: 
    - `message`: "Review deleted successfully"
    - `database`: Database response

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 6. Get reviews by user ID

### Endpoint: `/review/userid/:userID`

Retrieve list of users reviews

### Request:

- Method: `GET`
- URL: `/review/userid/:userID`

### Response

- Status Code `200 OK`
  - Content: Array of review objects, each containing:
    - `id`: ID of the review
    - `timestamp`: Timestamp of the review
    - `user_id`: User ID of the review owner
    - `movie_id`: Movie ID of the movie which the review were written
    - `content`: Review content
    - `rating`: Review rating

- Status Code `404 Not found`
  - Content: `{ "error": "Reviews not found" }`

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

# MOVIEDB

Endpoints for managing the movie database data

## 1. Get genres

### Endpoint: `/moviedb/genres`

Retrieve genres and their IDs

### Request:

- Method: `GET`
- URL: `/moviedb/genres`

### Response

- Status Code `200 OK`
  - Content: Array of genre object, containing:
    - `id`: ID of the genre
    - `genre`: Genre name

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 2. Get movie details with ID

### Endpoint: `/moviedb/:movieID`

Retrieve information about the movie with ID

### Request:

- Method: `GET`
- URL: `/moviedb/:movieID`

### Response

- Status Code `200 OK`
  - Content: Movie object from the movie database

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 3. Search movies

### Endpoint: `/moviedb/search/movie/:query`

Retrieves movie details that apply to search query

### Request:

- Method: `GET`
- URL: `/moviedb/search/movie/:query`

### Response

- Status Code `200 OK`
  - Content: Array of movie objects from the movie databse

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 4. Search TV series

### Endpoint: `/moviedb/search/tv/:query`

Retrieves TV series details that apply to search query

### Request:

- Method: `GET`
- URL: `/moviedb/search/tv/:query`

### Response

- Status Code `200 OK`
  - Content: Array of TV series objects from the movie database

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

## 5. Generate full URL for movie posters

### Endpoint: `/moviedb/pic/:picID`

Generates full URL for movie posters

### Request:

- Method: `GET`
- URL: `/moviedb/pic/:picID`

### Response

- Status Code `200 OK`
  - Content: 
    - `picture_url`: Full URL for the picture

- Status Code `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error" }`

# AUTH

Endpoints to manage authorizations

## 1. Login

### Endpoint: `/auth/login`

Endpoint for login

### Request:

- Method: `POST`
- URL: `/auth/login`
- Body:
  - `username`: Username of the user
  - `password`: Password of the user

### Response:

- Status Code: `200 OK`
  - Content: 
    - `message`: "Login successful"
    - `user`: User object
    - `token`: Generated JWT-token

- Status Code: `401 Unauthorized`
  - Content: `{ "error": "Invalid username or password" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error"}`

## 2. Register

### Endpoint: `/auth/registration`

Endpoint for registration

### Request:

- Method: `POST`
- URL: `/auth/registration`
- Body:
  - `username`: Username of the user
  - `password`: Password of the user

### Response:

- Status Code: `201 CREATED`
  - Content: 
    - `message`: "User created successfully"
    - `user`: User object

- Status Code: `400 Bad Request`
  - Content: `{ "error": "Username already exists" }`

- Status Code: `500 Internal Server Error`
  - Content: `{ "error": "Internal Server Error"}`
