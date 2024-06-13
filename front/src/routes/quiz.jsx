import { useLocation } from 'react-router-dom';
import QuizOption from '../components/QuizOption';

export default function Quiz() {
  const location = useLocation();
  // console.warn('state', location.state);
  const { movie, questions } = location.state;
  // for test purposes:
  // const movie = {
  //   title: 'Barbie',
  //   date: '2023-07-19',
  //   poster:
  //     'https://image.tmdb.org/t/p/original/8qQmKfcowF34ZLKilPGJGsNd4FW.jpg', // use backdrop instead
  //   director: 'Greta Gerwig',
  // };

  return (
    <div className='Quiz'>
      <img
        // src={movie.backdrop}
        src={
          'https://image.tmdb.org/t/p/original/8qQmKfcowF34ZLKilPGJGsNd4FW.jpg'
        }
        alt={`Movie backdrop for ${movie.title}`}
      />
      <h2>
        Movie: <span className='italics'>{movie.title}</span> (
        {movie.date.slice(0, 4)})
      </h2>
      <div className='question-block-container'>
        {questions?.map((question, i) => (
          <>
            <p>
              Q{i + 1}: {question.question}
            </p>
            <div
              className='question-block'
              key={i}
            >
              {question.options.map((option, j) => (
                <QuizOption
                  text={option.text}
                  correct={option.correct}
                  key={`${i}-${j}`}
                />
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

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
