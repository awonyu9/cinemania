import openai
from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

@app.route('/get_plot', methods=['POST'])
def get_plot():
    data = request.get_json()
    if 'movie_name' not in data:
        return jsonify({"error": "Movie name is required"}), 400
    if 'movie_year' not in data:
        return jsonify({"error": "Movie year is required"}), 400

    movie_name = data['movie_name']
    movie_year = data['movie_year']
    plot = fetch_movie_plot(movie_name, movie_year)

    if plot:
        return jsonify({"movie_name": movie_name, "plot": plot})
    else:
        return jsonify({"error": "Movie not found or error fetching data"}), 404

def fetch_movie_plot(movie_name, movie_year):
    search_url = f"https://en.wikipedia.org/wiki/{movie_name.replace(' ', '_')}_({movie_year}_film)"
    response = requests.get(search_url)
    print(f"Response Status Code: {response.status_code}")
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the plot section
        plot_section = soup.find(id='Plot')
        if not plot_section:
            plot_section = soup.find(id='Synopsis')
        print(f"Plot Section Found: {bool(plot_section)}")

        if plot_section:
            plot_content = []
            for sibling in plot_section.find_parent().find_next_siblings():
                print(f"Sibling: {sibling}")
                if sibling.name == 'h2':
                    break
                if sibling.name == 'p':
                    plot_content.append(sibling.get_text())
            plot_text = ' '.join(plot_content)
            print(f"Plot Text: {plot_text.strip()}")

            # Check if plot_text is not empty
            if plot_text.strip():
                return plot_text.strip()
            else:
                print("Plot text is empty.")
                return None
        else:
            print("Plot section not found.")
            return None
    else:
        return None


@app.route('/get_quiz', methods=['POST'])
def get_quiz():
    api_key = os.getenv("OPENAI_API_KEY")
    print(api_key)
    data = request.get_json()

    if 'movie_name' not in data:
        return jsonify({"error": "Movie name is required"}), 400
    if 'movie_year' not in data:
        return jsonify({"error": "Movie year is required"}), 400
    
    
    movie_name = data['movie_name']
    movie_year = data['movie_year']


    plot = fetch_movie_plot(movie_name, movie_year)
    if not plot:
        return jsonify({"error": "Movie not found or error fetching data"}), 404
    

    prompt = f"""
Generate a 10 questions MCQ quiz on the movie {movie_name} with the correct answer. Your answer should be a json with this format :

[
{{
    "question": "Where does Forrest Gump recount his life story?",
    "options": [
    {{"text": "At a bus stop in Savannah, Georgia", "correct": true}},
    {{"text": "At a train station in Atlanta, Georgia", "correct": false}},
    {{"text": "At a cafe in Greenbow, Alabama", "correct": false}},
    {{"text": "At a park in New York City", "correct": false}}
    ]
}},
...
]

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
    return response.choices[0].message.content


@app.route('/get_movies', methods=['POST'])
def get_movies():
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


@app.route('/get_movie_detail', methods=['POST'])
def get_movie_detail():
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
    
    movie_name = movie_data.get('title')
    release_year = movie_data.get('release_date', '')[:4]
    poster_path = movie_data.get('poster_path')
    poster_url = f"https://image.tmdb.org/t/p/original{poster_path}" if poster_path else None

    directors = [member['name'] for member in movie_data['credits']['crew'] if member['job'] == 'Director']
    print(directors)
    director = directors[0] if directors else None

    return jsonify({
        "movie_name": movie_name,
        "release_year": release_year,
        "poster_url": poster_url,
        "director": director
    })

if __name__ == '__main__':
    app.run(debug=True)