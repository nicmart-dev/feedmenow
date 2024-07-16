import LanguageIcon from '../assets/icons/languages.svg'
import LogoutIcon from '../assets/icons/logout.svg'

export default function Header() {
    return (
        <header className="flex flex-row justify-between py-6">
            <h1 className="text-2xl">Feed Me Now</h1>
            <div className="flex flex-row gap-4">
                <img src={LanguageIcon} />
                <img src={LogoutIcon} />
            </div>
        </header>
    )
}
