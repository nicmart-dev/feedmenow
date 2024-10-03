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
        <div className="h-[96px] mt-20">
        <footer className="flex flex-row w-full bg-green p-6 justify-between fixed bottom-0 h-[96px]">
            <Link to="/" className="flex flex-col items-center w-1/3">
                <img src={SearchIcon} alt="Search Icon" />
                <p className="text-lightgreen">
                    <FormattedMessage id="footer.search" />
                </p>
            </Link>
            <Link to="/recipes" className="flex flex-col items-center w-1/3">
                <img src={RecipesIcon} alt="Recipes Icon" />
                <p className="text-lightgreen">
                    <FormattedMessage id="footer.myRecipes" />
                </p>
            </Link>
            <Link to="/settings" className="flex flex-col items-center w-1/3">
                <img src={SettingsIcon} alt="Settings Icon" />
                <p className="text-lightgreen">
                    <FormattedMessage id="footer.settings" />
                </p>
            </Link>
        </footer>
        </div>
)

export default Footer
