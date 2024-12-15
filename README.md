<h1 align="center" style="font-weight: bold;">Poll Backend 🎯</h1>

<p align="center">
 <a href="#technologies">Technologies</a> •
 <a href="#dependencies">Dependencies</a> •
 <a href="#started">Getting Started</a> • 
<a href="#routes">API Endpoints</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>A backend system for managing polls, enabling users to create, vote, and view polls dynamically with secure APIs.</b>
</p>


<h2 id="technologies">💻 Backend Technologies</h2>

<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB</li>
</ul>

<h2 id="dependencies">📦 Dependencies</h2>

<ul>
    <li>bcrypt</li>
    <li>cors</li>
    <li>dotenv</li>
    <li>express</li>
    <li>jsonwebtoken</li>
    <li>mongoose</li>
</ul>


<h2 id="started">🚀 Getting Started</h2>

<p>Follow the steps below to run the project locally:</p>

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/Sharifa26/Poll_backend.git
```

<h3>Config .env Variables</h3>

<p>Use the <code>.env.example</code> as a reference to create your <code>.env</code> file with your project configuration.</p>

```bash
MONGO_URL = YOUR_MONGODB_URL
PORT = YOUR_PORT
JWT_SECRET = YOUR_JWT_SECRET
FRONT_URL = YOUR_FRONT_URL
```

<h3>Starting</h3>

install dependencies

```bash
npm install
```

run the project

```bash
npm start
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /register</kbd>     | register user into the api see [request details](#post-register-detail)
| <kbd>POST /login</kbd>     | authenticate user into the api see [request details](#post-login-detail)
| <kbd>GET /user</kbd>     | get user by token see [request details](#get-user-detail)

<h3 id="post-register-detail">POST /register</h3>

**CURL**
```bash
curl --location 'https://localhost:2500/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "sharifa",
    "password": "sharifa26",
    "age": 23,
    "gender": "female",
    "location": "mumbai"
}'

```

<h3 id="post-login-detail">POST /login</h3>

**CURL**
```bash
curl --location 'https://localhost:2500/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "sharifa",
    "password": "sharifa26"
}
```
<h3 id="get-user-detail">GET /user</h3>

```bash
curl --location 'https://localhost:2500/user' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
```


| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /polls</kbd>     | create poll see [request details](#post-polls-detail)
| <kbd>GET /polls</kbd>     | get polls by user see [request details](#get-polls-detail)
| <kbd>PUT /polls/:id/vote</kbd>     | vote on poll see [request details](#post-polls-id-vote-detail)

<h3 id="post-polls-detail">POST /polls</h3>

```bash
curl --location 'https://localhost:2500/polls' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "question": "what is your favourite color?",
    "options": ["red", "blue", "green", "yellow"]
}
```

<h3 id="get-polls-detail">GET /polls</h3>

```bash
curl --location 'https://localhost:2500/polls' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
```

<h3 id="post-polls-id-vote-detail">PUT /polls/:id/vote</h3>

```bash
curl --location 'https://localhost:2500/polls/:id/vote' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "option": "red"
}
```


<h2 id="contribute">📫 Contribute</h2>

<p>Contributions are always welcome!</p>

<p>If you'd like to contribute to this project, follow these steps:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a new branch for your feature or bug fix: <code>git checkout -b feature/YourFeatureName</code>.</li>
    <li>Make your changes and commit them: <code>git commit -m "Add your message here"</code>.</li>
    <li>Push your branch to your forked repository: <code>git push origin feature/YourFeatureName</code>.</li>
    <li>Open a pull request with a clear description of your changes.</li>
</ol>

<p>For major changes, please open an issue first to discuss what you'd like to change.</p>

<p>Thank you for your contributions! 🙌</p>


