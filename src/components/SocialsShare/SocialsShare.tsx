import { FC } from 'react'

export interface SocialsShareProps {
  className?: string
  link: string
}

const SocialsShare: FC<SocialsShareProps> = ({ className = '', link = '' }) => {
  const actions = [
    {
      id: 'Facebook',
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      className: 'facebook',
    },
    {
      id: 'Twitter',
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?url=${link}`,
      className: 'twitter',
    },
    {
      id: 'Linkedin',
      name: 'LinkedIn',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${link}`,
      className: 'linkedin',
    },
    {
      id: 'Instagram',
      name: 'Instagram',
      href: `https://www.instagram.com/`,
      className: 'instagram',
    },
    {
      id: 'Pinterest',
      name: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${link}`,
      className: 'pinterest',
    },
  ]

  return (
    <div className={`nc-SocialsShare ${className}`}>
      <span className="share-text">Feel free to share:</span>
      {actions.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`nc-SocialsShare__item ${item.className}`}
          title={`Share on ${item.name}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </a>
      ))}
    </div>
  )
}

export default SocialsShare

