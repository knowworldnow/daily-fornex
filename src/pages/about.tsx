// src/pages/about.tsx

import React from 'react';
import PageLayout from '@/components/PageLayout'; // Assuming you have a layout component
import SEO from '@/components/SEO/SEO'; // Import the SEO component
import Heading from '@/components/Heading/Heading';

const AboutPage = () => {
  return (
    <PageLayout>
      <SEO
        title="About Us - Daily Fornex"
        description="Learn more about Daily Fornex, our mission, and our team. We are dedicated to providing you with the latest news and information on a variety of topics."
        url="https://dailyfornex.com/about/"
      />
      <div className="container mx-auto py-12">
        <Heading>About Us</Heading>
        <p className="mb-4">
          Welcome to Daily Fornex! We are committed to bringing you the latest news and information from around the world. Our team of dedicated writers and editors work around the clock to ensure that you have access to accurate and up-to-date information on a wide range of topics.
        </p>
        <p>
          Our mission is to inform, educate, and entertain our readers. We strive to provide content that is not only informative but also engaging and thought-provoking. Thank you for choosing Daily Fornex as your trusted source for news and information.
        </p>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
