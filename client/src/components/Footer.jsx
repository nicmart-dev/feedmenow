import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom' // Add this line for using Link
import SearchIcon from '../assets/icons/search.svg'
import RecipesIcon from '../assets/icons/recipes.svg'
import SettingsIcon from '../assets/icons/settings.svg'

/* TODO example footer with externalized text strings
Can replace by other Tailwind UI components
<FormattedMessage id="footer.privacyTitle" />
*/

const Footer = () => (
    <footer className="flex flex-row w-full bg-green p-6 justify-between fixed bottom-0">
        <Link to="/" className="flex flex-col items-center">
            <img src={SearchIcon} alt="Search Icon" />
            <p className="text-lightgreen">Search</p>
        </Link>
        <Link to="/recipes" className="flex flex-col items-center">
            <img src={RecipesIcon} alt="Recipes Icon" />
            <p className="text-lightgreen">My Recipes</p>
        </Link>
        <Link to="/settings" className="flex flex-col items-center">
            <img src={SettingsIcon} alt="Settings Icon" />
            <p className="text-lightgreen">Settings</p>
        </Link>
    </footer>
)

export default Footer
