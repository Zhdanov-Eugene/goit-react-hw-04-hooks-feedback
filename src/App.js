import { useState } from 'react';
import Layout from './components/layout/Layout';
import Section from './components/section/Section';
import FeedbackOptions from './components/feedback/FeedbackOptions';
import Statistics from './components/statistics/Statistics';
import Notification from './components/statistics/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateStats = a => {
    switch (a) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const positiveFeedback = Math.floor((good * 100) / countTotalFeedback());
    return positiveFeedback;
  };

  const feedbacks = { good, neutral, bad };
  const options = Object.keys(feedbacks);

  return (
    <Layout>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={updateStats} />
      </Section>

      <Section title="Statistics">
        {good || neutral || bad ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification title="No feedbacks" />
        )}
      </Section>
    </Layout>
  );
}