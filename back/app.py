import openai
from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from openai import OpenAI

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


@app.route('/get_quiz', methods=['POST'])
def get_quiz():
    movie_name = "Forrest Gump"
    plot = """In 1981, at a bus stop in Savannah, Georgia, a man named Forrest Gump recounts his life story to strangers who sit next to him on a bench.

In 1951, in Greenbow, Alabama, young Forrest is fitted with leg braces to correct a curved spine, and is unable to walk properly. He lives alone with his mother, who runs a boarding house out of their home that attracts many tenants, including a young Elvis Presley, who plays the guitar for Forrest and incorporates Forrest's jerky dance movements into his performances. On his first day of school, Forrest meets a girl named Jenny Curran, and the two become best friends.

Forrest is often bullied because of his physical disability and low intelligence. While fleeing from several bullies, his leg braces break off, revealing Forrest to be a very fast runner. This talent eventually allows him to receive a football scholarship at the University of Alabama in 1963, where he is coached by Bear Bryant, and witnesses Governor George Wallace's Stand in the Schoolhouse Door, during which he returns a dropped book to Vivian Malone Jones. Forrest becomes a top kick returner, is named on the All-American team, and meets President John F. Kennedy at the White House.

After graduating college in 1967, Forrest enlists into the U.S. Army. During basic training, he befriends a fellow soldier named Benjamin Buford Blue (nicknamed "Bubba"), who convinces Forrest to go into the shrimping business with him after their service. In 1968, they are sent to Vietnam, serving with the 9th Infantry Division in the Mekong Delta region. After months of routine operations, their platoon is ambushed while on patrol, and Bubba is killed in action. Forrest saves several wounded platoon mates – including his lieutenant, Dan Taylor, who loses both his legs – and is awarded the Medal of Honor for his heroism by President Lyndon B. Johnson.

At the anti-war March on the Pentagon rally, Forrest meets Abbie Hoffman and briefly reunites with Jenny, who has been living a hippie lifestyle. He also develops a talent for ping-pong, and becomes a sports celebrity as he competes against Chinese teams in ping-pong diplomacy, earning him an interview alongside John Lennon on The Dick Cavett Show, influencing the song "Imagine". He spends the 1972 New Year's Eve in New York City with Dan, who has become an embittered cripple. Forrest soon meets President Richard Nixon and is put up in the Watergate complex, where he unwittingly exposes the Watergate scandal.

Discharged from the army, Forrest returns to Greenbow and endorses a company that makes ping-pong paddles. He uses the earnings to buy a shrimping boat in Bayou La Batre, fulfilling his promise to Bubba. Dan joins Forrest in 1974, and they initially have little success. After their boat becomes the only one to survive Hurricane Carmen, they pull in huge amounts of shrimp and create the Bubba Gump Shrimp Company, after which Dan finally thanks Forrest for saving his life. Forrest returns home to his mother as she dies of cancer. Dan invests into what Forrest thinks is "some kind of fruit company" and the two become millionaires, but Forrest also shares their earnings with the community and Bubba's family.

In 1976, Jenny returns to stay with Forrest, recovering from years of child abuse, drugs, and prostitution. After a while, Forrest proposes to her. She tells Forrest she loves him and the two have sex, but she leaves the next morning. Heartbroken, Forrest goes running and spends the next three years in a relentless cross-country marathon, becoming famous again before returning to Greenbow.

In 1981, Forrest reveals that he is waiting at the bus stop because he received a letter from Jenny, who asked him to visit her. Forrest is finally reunited with Jenny, who introduces him to their son, Forrest Gump Jr. Jenny tells Forrest she is sick with an unknown incurable virus, and the three move back to Greenbow. Jenny and Forrest finally marry, but she dies a year later. The film ends with Forrest seeing his son off on his first day of school."""

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
    client = OpenAI(
        api_key=""
    )
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


if __name__ == '__main__':
    app.run(debug=True)
