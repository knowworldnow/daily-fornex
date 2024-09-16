import { FC } from 'react'
import Navigation from '@/components/Navigation/Navigation'
import MenuBar from '@/components/MenuBar/MenuBar'
import Logo from '@/components/Logo/Logo'
import { SearchIconBtn } from './HeaderSearch'
import ThemeToggle from './ThemeToggle'

export interface MainNav1Props {
  menuItems: any[]  // Replace 'any' with your actual menu item type
}

const MainNav1: FC<MainNav1Props> = ({ menuItems }) => {
  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <MenuBar menuItems={menuItems} className="lg:hidden" />
            <SearchIconBtn className="lg:hidden" />
          </div>
          <Navigation menuItems={menuItems} className="hidden lg:flex" />
          <Logo /> {/* This will now switch between light and dark mode logos */}
          <div className="flex items-center">
            <ThemeToggle />
            <SearchIconBtn className="hidden lg:flex" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainNav1
