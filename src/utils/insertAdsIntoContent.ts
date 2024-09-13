export function insertAdsIntoContent(content: string): string {
  const paragraphs = content.split('</p>'); // Split the content by paragraph end tags
  const adCode = `
    <div class="adsense-widget">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7892867039237421"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-7892867039237421"
     data-ad-slot="7560629194"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
    </div>`;

  const insertPositions = [4, 14, 24, 34, 44, 54, 64]; // Paragraph positions to insert ads (0-indexed)
  let newContent = '';

  paragraphs.forEach((para, index) => {
    newContent += para + '</p>'; // Re-add the paragraph end tag
    if (insertPositions.includes(index + 1)) { // Insert ad after the nth paragraph
      newContent += adCode;
    }
  });

  return newContent;
}
