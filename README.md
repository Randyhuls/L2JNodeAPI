# L2J Node API
### A simple NodeJS based RESTful API for your private L2Java server
This RESTful API was created as a simple way to pull L2J server data to your website or mobile app.  
It's currently **under development** with more features on its way.

![image info](./public/images/logo_l2j_node_api_02.png)

> **Note**: This API has currently only been tested with L2J's `MASTER` branch (Lineage II High Five).  
>  Checkout the [L2J website](https://www.l2jserver.com/) for more info on setting up your own private Lineage II server.

## Table of Contents

- [Installation](#installation)
- [API endpoints](#api-endpoints)
- [Example](#example)

## Installation

- Install [NodeJS](https://nodejs.org/en/download/) for your environment
- On the command line, run `npm install` in the root folder
- Rename the `.env.example` to `.env` and adjust the values to match your L2J environment
- On the command line, run `npm run start` to run the project
- By default, the server will run on port `1337`

## API endpoints

#### Authentication

> **NOTE:** All *user* and *character* requests require the user to be authenticated with [JSON webtokens](https://jwt.io/introduction/) OR have admin rights set in the L2J SQL database (`accessLevel = 8`)

> `/auth/register` and `/auth/sign-in` each return an object with a JWT inside. You'll have to store this token locally and pass it along with each request as a Bearer Authorization header.


| Method | API Endpoint       | Description                                                 | Parameters                                                            |
| :----- | :----------------- |:------------------------------------------------------------| :---------------------------------------------------------------------|
| POST   | `/auth/register`   | Register an account on the L2J server                       | `username[string]`, `password[string]`, `passwordConfirmation[string` |
| POST   | `/auth/sign-in`    | Sign in to the webserver with your L2J account              | `username[string]`, `password[string]`|                                          

#### User and player details (requires [authentication](#authentication))

| Method | API Endpoint                 | Description                                         | Parameters         |
| :----- | :--------------------------- |:----------------------------------------------------| :------------------|
| GET   | `/user/account/<username>`    | Get your L2J server account details                 | `username[string]` | 
| GET   | `/user/character/<charId>`    | Returns basic info on your account's character      | `charId[string]`   |  
| GET   | `/user/characters/<username>` | Returns basic info on all your account's characters | `username[string]` |  
| GET   | `/user/inventory/<charId>`    | Returns the characters inventory items              | `charId[string]`   |  

#### Server details

| Method | API Endpoint                   | Description                                           | Parameters |
| :----- | :----------------------------- |:------------------------------------------------------| :----------|
| GET   | `/server/status/`               | Get online status of server                           | `None`     | 
| GET   | `/server/announcements/`        | Get announcements                                     | `None`     |  
| GET   | `/server/top-players/`          | Get top 10 highest level players                      | `None`     | 
| GET   | `/server/top-pkers/`            | Get top 10 highest PKers                              | `None`     | 
| GET   | `/server/top-pvpers/`           | Get top 10 highest PvPers                             | `None`     |  
| GET   | `/server/top-playtime-players/` | Get top 10 players that played the most               | `None`     | 
| GET   | `/server/online-players/`       | Get number of players currently online                | `None`     | 
| GET   | `/server/online-pkers/`         | Get players that are currently PK and online          | `None`     | 
| GET   | `/server/top-playtime-players/` | Returns GMs, including whether they are online or not | `None`     | 

## Example

#### Authentication
In order to do any request, you must be authenticated using JSON webtokens. You'll have to save this token locally; `LocalStorage` or `SessionStorage` are good options here.

> Client-side authentication example with JavaScript

```js
async function signIn() {
    // Make a request to sign in with your L2J account credentials 
    let request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    // Both /auth/sign-in and /auth/register endpoints return a JWT
    let response = await fetch('http://localhost:1337/auth/sign-in', request)

    try {
        let json = await response.json()
        let token = json.data.token
        // Now you can do additional requests with the token
        console.log('My JSON webtoken: ', token)
        // Example token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        ...  
    } catch(err) {
        console.log('Oops, something went wrong: ', err)  
        ...
    }
}
```

#### User account data

> Get user account data

```js
...
let token = response.data.token // JWT from earlier auth request

async function getUserByUsername(username) {
    // Make a request for account data with the JWT passed as Bearer Authorization header
    let request = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    }

    let response = await fetch(`http://localhost:1337/user/account/${username}`, request)

    try {
        let user = await response.json()
        // Do something with 'user'
        console.log('My user data: ', user)
        ...  
    } catch(err) {
        console.log('Oops, something went wrong: ', err)  
        ...
    }
}
```

> Get character by characer id

```js
...
let token = response.data.token // JWT from earlier auth request

// Only characters that belong to the authenticated account can be retrieved, 
// unless the account doing requests is an admin (accessLevel = 8)
async function getPlayerByUsername(charId) {
    // Make a request for player data with the JWT passed as Bearer Authorization header
    let request = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    }

    let response = await fetch(`http://localhost:1337/user/character/${charId}`, request)

    try {
        let character = await response.json()
        // Do something with 'character'
        console.log('My character\'s data: ', character)
        ...  
    } catch(err) {
        console.log('Oops, something went wrong: ', err)  
        ...
    }
}
```

> Get all characters by username

```js
...
let token = response.data.token // JWT from earlier auth request

// Only characters that belong to the authenticated account can be retrieved, 
// unless the account doing requests is an admin (accessLevel = 8)
async function getCharactersByUsername(username) {
    // Make a request for player data with the JWT passed as Bearer Authorization header
    let request = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    }

    let response = await fetch(`http://localhost:1337/user/characters/${username}`, request)

    try {
        let characters = await response.json()
        // Do something with 'characters'
        console.log('My characters: ', characters)
        ...  
    } catch(err) {
        console.log('Oops, something went wrong: ', err)  
        ...
    }
}
```
