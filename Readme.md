## Sample HTTP REST API on HapiJS

HTTP Server application with 3 sample endpoints.

Technologies / libs used:
- TypeScript
- NodeJS
- HapiJS
- JWT Auth
- Mocha
- Winston

### Requirements

Node installed (tested and developed on v12.16.1).


### Endpoints


`POST /api/sign-in`

Registers new user in memory database.

```
Example payload
{
	"email": "test@test.com",
	"password": "secret"
}

Example response
{
	"email": "test@test.com",
}
```
----
`POST /api/generate-key-pair`

Generates a pair of private / public keys for encryption.

```
No payload.

Example response
{
    "privKey": "-----BEGIN RSA PRIVATE KEY-----\nsecret-magic\n-----END RSA PRIVATE KEY-----",
    "pubKey": "-----BEGIN PUBLIC KEY-----\nsecret-magic\n-----END PUBLIC KEY-----"
}
```
----
`POST /api/encrypt`

Encrypts sample pdf file contents with previously generated public key.

```
No payload.

Base64 encoded file contents in response.
```

### Running in development mode

1. First of all - copy `.env.example` file and rename it to `.env`, put it on base level of the project.
2. Install project dependencies `npm install`
3. Run `npm start`

Application should be operational, everything is in app logs.

### Running tests

2. Install project dependencies if you didn't done that before `npm install`
3. Run `npm test`

### TODOs

- docker
- git hooks for pre-commit
- CI/CD