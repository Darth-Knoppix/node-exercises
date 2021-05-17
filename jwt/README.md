# Node JWT example

An example of how to use JWT in Node.js for authentication.

## Steps to test

### Create a user

Create a user which will be stored in memory, for the life of the server. (A real app would use a DB): [/user](http://localhost:8080/user)

```sh
curl --request POST \
  --url http://localhost:8080/user \
  --header 'Content-Type: application/json' \
  --cookie 'csrftoken=zjL9ItD6gOuQBTnQOIkzrKhTHP7bVgMlCiV1Jm5Ok53Hn7DUT4OMQGnUmSZbVycp; sid=5fce0b63-0bc6-4147-9e9e-7f9664079b1c' \
  --data '{
	"username": "a-user",
	"password": "test-password"
}'
```

### Login

Login and get the `accessToken`, use this for authenticated requests: [/login](http://localhost:8080/login)

```sh
curl --request POST \
  --url http://localhost:8080/login \
  --header 'Content-Type: application/json' \
  --cookie 'csrftoken=zjL9ItD6gOuQBTnQOIkzrKhTHP7bVgMlCiV1Jm5Ok53Hn7DUT4OMQGnUmSZbVycp; sid=5fce0b63-0bc6-4147-9e9e-7f9664079b1c' \
  --data '{
	"username": "a-user",
	"password": "test-password"
}'
```

### Visit a route that requires Auth

Use the bearer token to get an authenticated route: [/dashboard](http://localhost:8080/dashboard)

```sh
curl --request GET \
  --url http://localhost:8080/dashboard \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmVkNDIyNS1mOGJhLTQyMTEtOGRlOS02YThmOWRmMDlmZmYiLCJ1c2VybmFtZSI6ImEtdXNlciIsImlhdCI6MTYyMTI2OTUzNywiZXhwIjoxNjIxMjcxMzM3fQ.UG94tmdOWwUVssJS3ZwTVy05I8EvVoLqJsskTa5ePos' \
  --header 'Content-Type: application/json' \
  --cookie 'csrftoken=zjL9ItD6gOuQBTnQOIkzrKhTHP7bVgMlCiV1Jm5Ok53Hn7DUT4OMQGnUmSZbVycp; sid=5fce0b63-0bc6-4147-9e9e-7f9664079b1c' \
  --data '{
	"username": "a-user",
	"password": "test-password"
}'
```
