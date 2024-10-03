import React from 'react';
import { FAQItem } from '../types';

interface FAQProps {
  faqItems: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqItems }) => {
  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  const sanitizeAndFormatAnswer = (answer: string) => {
    // Remove the u00a0 artifacts and replace with actual spaces
    const cleanedAnswer = answer.replace(/u00a0/g, ' ');
    // Decode any HTML entities
    const decodedAnswer = decodeHtmlEntities(cleanedAnswer);
    // Split the answer into sentences for better formatting
    return decodedAnswer.split('. ').map((sentence, index, array) => (
      <React.Fragment key={index}>
        {sentence}{index < array.length - 1 ? '. ' : ''}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const decodeHtmlEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  return (
    <section className="faq-section my-8">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqItems.map((item, index) => (
        <details key={index} className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <summary className="font-semibold cursor-pointer">{item.question}</summary>
          <div className="mt-2">{sanitizeAndFormatAnswer(item.answer)}</div>
        </details>
      ))}
    </section>
  );
};

export default FAQ;
