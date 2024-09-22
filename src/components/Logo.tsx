'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoSrc = resolvedTheme === 'dark' ? '/logo-light.png' : '/logo.png';

  return (
    <Link href="/" className="flex items-center">
      <Image
        src={logoSrc}
        alt="Daily Fornex Logo"
        width={150}
        height={50}
        className="w-auto h-8 md:h-10"
        priority
      />
    </Link>
  );
};

export default Logo;
