from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/get_plot', methods=['POST'])
def get_plot():
    data = request.get_json()
    if 'movie_name' not in data:
        return jsonify({"error": "Movie name is required"}), 400
    
    movie_name = data['movie_name']
    plot = fetch_movie_plot(movie_name)
    
    if plot:
        return jsonify({"movie_name": movie_name, "plot": plot})
    else:
        return jsonify({"error": "Movie not found or error fetching data"}), 404

def fetch_movie_plot(movie_name):
    search_url = f"https://en.wikipedia.org/wiki/{movie_name.replace(' ', '_')}_(film)"
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

if __name__ == '__main__':
    app.run(debug=True)
