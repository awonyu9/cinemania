<h1 align="center">🎬 Cinemania 🎬</h1>

<p align="center">
  Cinemania is a web application that uses generative AI to create a quiz on a movie of the user's choice.

![image](https://github.com/awonyu9/cinemania/assets/71611172/391328f2-0383-4a7a-9143-e21daf1fa129)

</p>

## Technologies used

- **Front-end**: React, React Router
- **Back-end**: Flask
- **APIs**: OpenAI API, The Movie Database (TMDB) API, Wikipedia API
- **LLM**: GPT-3.5 Turbo
- **UI/UX prototyping**: Penpot

## Getting Started

1. Clone this repository

```sh
git clone https://github.com/awonyu9/cinemania.git
cd cinemania
```

2. Get your API keys from [OpenAI](https://platform.openai.com/docs/overview) and [The Movie Database (TMDB)](https://developer.themoviedb.org/docs/getting-started)

a. In the `back` directory, make a copy of the file named `.env.example` and name it `.env`.

b. In `.env`, update the values of `OPENAI_API_KEY` and `TMDB_API_KEY` with your API keys.

3. Run the application locally

In one terminal, start the back-end:

\*_Make sure to have Python and `pip` installed on your machine._

```sh
cd back

# activate virtual environment
.venv\Scripts\activate # Windows
source .venv/Scripts/activate # Linux/macOS

# install required back-end dependencies
pip install -r requirements.txt

# start local server
py app.py
```

In another terminal, start the front-end:

```sh
cd front

# install required front-end dependencies
npm install

# start local server
npm run dev
```

4. Access the application in your browser at: <a href="http://127.0.0.1:5173/" alt="Link to locally running app" target="_blank">http://127.0.0.1:5173/</a>

![image](https://github.com/awonyu9/cinemania/assets/71611172/49320f2c-60e6-44c2-83a5-af2c389a9e18)
