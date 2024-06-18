import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
from urllib.parse import quote
import os

app = Flask(__name__)
CORS(app)
load_dotenv()


@app.route('/get_plot', methods=['POST'])
def get_plot():
    data = request.get_json()
    if 'movie_title' not in data:
        return jsonify({"error": "Movie name is required"}), 400
    if 'movie_year' not in data:
        return jsonify({"error": "Movie year is required"}), 400

    movie_title = data['movie_title']
    movie_year = data['movie_year']
    plot = fetch_movie_plot(movie_title, movie_year)

    if plot:
        return jsonify({"movie_title": movie_title, "plot": plot})
    else:
        return jsonify({"error": "Movie not found or error fetching data"}), 404


def fetch_movie_plot(movie_title, movie_year):
    encoded_title = quote(movie_title)
    search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={encoded_title}%20{movie_year}%20film&format=json"
    response = requests.get(search_url)

    if response.status_code == 200:
        search_results = response.json()
        if search_results['query']['search']:
            page_title = search_results['query']['search'][0]['title']
            page_url = f"https://en.wikipedia.org/wiki/{quote(page_title)}"
            print(f"Fetching plot from: {page_url}")

            response = requests.get(page_url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')

                plot_section = soup.find(id='Plot') or soup.find(id='Synopsis')
                if plot_section:
                    plot_content = []
                    for sibling in plot_section.find_parent().find_next_siblings():
                        if sibling.name == 'h2':
                            break
                        if sibling.name == 'p':
                            plot_content.append(sibling.get_text())
                    plot_text = ' '.join(plot_content)

                    if plot_text.strip():
                        return plot_text.strip()
                    else:
                        print("Plot text is empty.")
                        return None
                else:
                    print("Plot section not found.")
                    return None
            else:
                print("Failed to retrieve the Wikipedia page.")
                return None
        else:
            print("No search results found on Wikipedia.")
            return None
    else:
        print("Failed to perform Wikipedia search.")
        return None


@app.route('/get_quiz', methods=['POST'])
def get_quiz():
    api_key = os.getenv("OPENAI_API_KEY")
    data = request.get_json()

    if 'movie_title' not in data:
        return jsonify({"error": "Movie name is required"}), 400
    if 'plot' not in data:
        return jsonify({"error": "Plot is required"}), 400

    movie_title = data['movie_title']
    plot = data['plot']

    prompt = f"""
    Generate a 10-question MCQ quiz on the movie {movie_title} with the correct answer.
    Your answer should be json with this format:

    [
    {{
        "question": "Where does Forrest Gump recount his life story?",
        "options": [
        {{"text": "At a train station in Atlanta, Georgia", "correct": false}},
        {{"text": "At a bus stop in Savannah, Georgia", "correct": true}},
        {{"text": "At a cafe in Greenbow, Alabama", "correct": false}},
        {{"text": "At a park in New York City", "correct": false}}
        ]
    }},
    ...
    ]

    Make sure that the correct answer is not always in the same position in the options array.
    Here's the plot of the film to help you: {plot}
    """
    client = OpenAI(api_key=api_key)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=1,
        max_tokens=1200,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    response_text = response.choices[0].message.content
    response_text = response_text.replace(
        "```json", "").replace("```", "").strip()

    return jsonify(response_text)


@app.route('/search_movies', methods=['POST'])
def search_movies():
    api_key = os.getenv("TMDB_API_KEY")
    data = request.get_json()

    if 'query' not in data:
        return jsonify({"error": "Query is required"}), 400

    query = data['query']
    url = f"https://api.themoviedb.org/3/search/movie?query={query}&include_adult=false&language=en-US&page=1"

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.get(url, headers=headers)
    return response.text


@app.route('/get_movie_details', methods=['POST'])
def get_movie_details():
    api_key = os.getenv("TMDB_API_KEY")
    data = request.get_json()

    if 'movie_id' not in data:
        return jsonify({"error": "Movie ID is required"}), 400

    movie_id = data['movie_id']
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?append_to_response=credits&language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch movie details"}), response.status_code

    movie_data = response.json()

    movie_title = movie_data.get('title')
    release_year = movie_data.get('release_date')[:4]
    poster_path = movie_data.get('poster_path')
    backdrop_path = movie_data.get('backdrop_path')

    poster_url = f"https://image.tmdb.org/t/p/original{poster_path}" if poster_path else "https://critics.io/img/movies/poster-placeholder.png"
    backdrop_url = f"https://image.tmdb.org/t/p/original{backdrop_path}" if backdrop_path else "https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png"

    directors = [member['name'] for member in movie_data['credits']
                 ['crew'] if member['job'] == 'Director']
    director = directors[0] if directors else None

    return jsonify({
        "movie_title": movie_title,
        "release_year": release_year,
        "poster_url": poster_url,
        "backdrop_url": backdrop_url,
        "director": director
    })


if __name__ == '__main__':
    app.run(debug=True)
