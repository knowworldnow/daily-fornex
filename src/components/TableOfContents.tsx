'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([])

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3, h4')
    const tocItems: TOCItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }))
    setToc(tocItems)
  }, [])

  return (
    <nav className="toc">
      <h2>Table of Contents</h2>
      <ul>
        {toc.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 20}px` }}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
