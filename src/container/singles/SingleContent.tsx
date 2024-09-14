import React, { useRef, useEffect } from 'react';

interface SingleContentProps {
    content: string;
}

const SingleContent: React.FC<SingleContentProps> = ({ content }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const doc = new DOMParser().parseFromString(content, 'text/html');
            const firstParagraph = doc.querySelector('p');

            if (firstParagraph) {
                const tocElement = doc.createElement('div');
                tocElement.innerHTML = `<div class="toc">Your TOC Here</div>`; // Replace with your TOC generation logic
                firstParagraph.parentNode?.insertBefore(tocElement, firstParagraph.nextSibling);
            }

            contentRef.current.innerHTML = doc.body.innerHTML;
        }
    }, [content]);

    return (
        <div ref={contentRef}>
            {/* The content of the post with TOC after the first paragraph will be rendered here */}
        </div>
    );
};

export default SingleContent;
