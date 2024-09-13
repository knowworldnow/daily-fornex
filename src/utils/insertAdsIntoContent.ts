import React from 'react';
import parse from 'html-react-parser';
import AdSenseAd from '@/components/AdSenseAd';

export function insertAdsIntoContent(content: string): React.ReactNode[] {
  // Split the content by paragraph end tags
  const paragraphs = content.split(/<\/p>/i).filter((para) => para.trim());

  // Paragraph positions to insert ads (1-indexed)
  const insertPositions = [4, 14, 24, 34, 44, 54, 64];

  const contentElements: React.ReactNode[] = [];

  paragraphs.forEach((para, index) => {
    // Re-add the closing </p> tag if it was present
    const paraWithP = para.endsWith('</p>') ? para : `${para}</p>`;

    // Parse the paragraph HTML into React elements
    contentElements.push(parse(paraWithP));

    // Insert AdSense ad after specified paragraphs
    if (insertPositions.includes(index + 1)) {
      contentElements.push(<AdSenseAd key={`ad-${index}`} />);
    }
  });

  return contentElements;
}
