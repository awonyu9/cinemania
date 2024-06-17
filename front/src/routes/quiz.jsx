import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import Question from '../components/Question.jsx';
import MoviePoster from '../components/MoviePoster.jsx';

export default function Quiz() {
  const location = useLocation();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  console.warn('state', location.state);
  const { movie, questions } = location.state;

  // for test purposes:
  // const movie = {
  //   title: 'Barbie',
  //   year: '2023',
  //   poster:
  //     'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
  //   backdrop:
  //     'https://image.tmdb.org/t/p/original/8qQmKfcowF34ZLKilPGJGsNd4FW.jpg',
  //   director: 'Greta Gerwig',
  //   plot,
  // };

  return (
    <div className='Quiz'>
      <MoviePoster
        year={movie.year}
        poster={movie.backdrop}
        isBackdrop
      />
      <h2>
        Movie: <span className='italics'>{movie.title}</span> ({movie.year})
      </h2>

      <Question
        movie={movie}
        movieId={id}
        score={score}
        setScore={setScore}
        // questions={questions.slice(0, 3)} // test purposes
        questions={questions}
        n={currentQuestion}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
}

// for test purposes
const plot = `Barbie ("Stereotypical Barbie") and fellow dolls reside in Barbieland, a matriarchal society populated by different versions of Barbies, Kens, and a group of discontinued models who are treated like outcasts due to their unconventional traits. While the Kens spend their days playing at the beach, considering it their profession, the Barbies hold prestigious jobs in law, science, politics, and so on. Ken ("Beach Ken") is only happy when he is with Barbie, and seeks a closer relationship with her, but she rebuffs him in favor of other activities and female friendships.

One evening at a dance party, Barbie is suddenly stricken with worries about mortality. Overnight, she develops bad breath, cellulite, and flat feet, disrupting her usual routines and impairing the aura of classic perfection experienced by the Barbies. Weird Barbie, a disfigured doll, tells Barbie to find the child playing with her in the real world to cure her afflictions. Barbie decides to follow the advice and travel to the real world, with Ken joining Barbie by stowing away in her convertible.

After arriving in Venice Beach, Barbie punches a man after he gropes her. Barbie and Ken are briefly arrested. Alarmed by the dolls' presence in the real world, the CEO of Mattel orders their recapture. Barbie tracks down her owner, a teenage girl named Sasha, who criticizes Barbie for encouraging unrealistic beauty standards. Distraught, Barbie discovers that Gloria, a Mattel employee and Sasha's mother, inadvertently caused Barbie's existential crisis after Gloria began playing with Sasha's old Barbies. Mattel attempts to put Barbie in a toy box for remanufacturing, but she escapes with Gloria and Sasha's help, and the three travel to Barbieland with Mattel executives in pursuit.

Meanwhile, Ken learns about patriarchy and feels respected for the first time. He returns to Barbieland to persuade the other Kens to take over. The Kens indoctrinate the Barbies into submissive roles, such as agreeable girlfriends, housewives, and maids. Barbie arrives and attempts to convince the Barbies to be independent again. When her attempts fail, she becomes depressed. Gloria expresses her frustration with the conflicting standards women are forced to follow in the real world. Gloria's speech restores Barbie's confidence.

With the assistance of Sasha, Weird Barbie, Allan, and the discontinued dolls, Gloria uses her knowledge from the real world to deprogram the Barbies from their indoctrination. The Barbies then manipulate the Kens into fighting among themselves, which distracts them from enshrining male superiority into Barbieland's constitution, allowing the Barbies to regain power. Having now experienced systemic oppression for themselves, the Barbies resolve to rectify the faults of their previous society, emphasizing better treatment of the Kens and all outcasts.

Barbie and Ken apologize to each other, acknowledging their past mistakes. When Ken bemoans his lack of purpose without Barbie, she encourages him to find an autonomous identity. Barbie, who remains unsure of her own identity, meets with the spirit of Ruth Handler, Mattel co-founder and creator of the Barbie doll, who explains that Barbie's story has no set ending and her ever-evolving history surpasses her roots.

After sharing goodbyes with the Barbies, Kens, and Mattel executives, Barbie decides to become human and return to the real world. Sometime later, Gloria, her husband, and Sasha take Barbie, now going by the name "Barbara Handler", to her first gynecologist appointment.`;

const questions = [
  {
    question:
      'What causes Barbie to develop bad breath, cellulite, and flat feet, disrupting her aura of perfection?',
    options: [
      {
        text: 'A dance party',
        correct: false,
      },
      {
        text: 'Groping by a man on Venice Beach',
        correct: false,
      },
      {
        text: 'Worries about mortality',
        correct: true,
      },
      {
        text: 'Becoming friends with Weird Barbie',
        correct: false,
      },
    ],
  },
  {
    question:
      'Where does Barbie travel to in order to find the child playing with her in the real world?',
    options: [
      {
        text: 'Hollywood',
        correct: false,
      },
      {
        text: 'Venice Beach',
        correct: true,
      },
      {
        text: 'Las Vegas',
        correct: false,
      },
      {
        text: 'New York City',
        correct: false,
      },
    ],
  },
  {
    question:
      'Who accompanies Barbie to the real world by stowing away in her convertible?',
    options: [
      {
        text: 'Beach Ken',
        correct: true,
      },
      {
        text: 'Weird Barbie',
        correct: false,
      },
      {
        text: 'Gloria',
        correct: false,
      },
      {
        text: 'Sasha',
        correct: false,
      },
    ],
  },
  {
    question: "What precipitates Barbie's existential crisis?",
    options: [
      {
        text: 'Becoming friends with Gloria',
        correct: false,
      },
      {
        text: 'A dance party at Barbieland',
        correct: false,
      },
      {
        text: 'A visit to Venice Beach',
        correct: true,
      },
      {
        text: 'A meeting with Ruth Handler',
        correct: false,
      },
    ],
  },
  {
    question:
      "Who is revealed to have inadvertently caused Barbie's existential crisis?",
    options: [
      {
        text: 'Ken',
        correct: false,
      },
      {
        text: 'Sasha',
        correct: false,
      },
      {
        text: 'Gloria',
        correct: true,
      },
      {
        text: 'Allan',
        correct: false,
      },
    ],
  },
  {
    question:
      'What do the Kens do when they return to Barbieland after learning about patriarchy?',
    options: [
      {
        text: 'Encourage independence among the Barbies',
        correct: false,
      },
      {
        text: 'Indoctrinate the Barbies into submissive roles',
        correct: true,
      },
      {
        text: 'Leave Barbieland for good',
        correct: false,
      },
      {
        text: 'Start their own society',
        correct: false,
      },
    ],
  },
  {
    question: 'Who helps deprogram the Barbies from their indoctrination?',
    options: [
      {
        text: 'Sasha and Weird Barbie',
        correct: false,
      },
      {
        text: 'Gloria and Allan',
        correct: false,
      },
      {
        text: 'Gloria, Sasha, Weird Barbie, and the discontinued dolls',
        correct: true,
      },
      {
        text: 'Mattel executives',
        correct: false,
      },
    ],
  },
  {
    question: "What does Gloria's speech help restore in Barbie?",
    options: [
      {
        text: 'Confidence',
        correct: true,
      },
      {
        text: 'Indoctrination',
        correct: false,
      },
      {
        text: 'Depression',
        correct: false,
      },
      {
        text: 'Physical beauty',
        correct: false,
      },
    ],
  },
  {
    question:
      'How do the Barbies regain power in Barbieland after deprogramming the Kens?',
    options: [
      {
        text: 'By manipulating the Kens into fighting among themselves',
        correct: true,
      },
      {
        text: 'By fleeing to the real world',
        correct: false,
      },
      {
        text: 'By seeking help from Mattel',
        correct: false,
      },
      {
        text: 'By surrendering to the Kens',
        correct: false,
      },
    ],
  },
  {
    question:
      'Who does Barbie meet with to learn that her story has no set ending?',
    options: [
      {
        text: 'Beach Ken',
        correct: false,
      },
      {
        text: 'Weird Barbie',
        correct: false,
      },
      {
        text: 'Ruth Handler',
        correct: true,
      },
      {
        text: 'Gloria',
        correct: false,
      },
    ],
  },
];
