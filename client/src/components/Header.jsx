import LanguageIcon from '../assets/icons/languages.svg'
import LogoutIcon from '../assets/icons/logout.svg'

export default function Header() {
    return (
        <header className="flex flex-row justify-between p-4 w-full">
            <h1 className="text-2xl w-5/6">Feed Me Now</h1>
            <div className="flex flex-row gap-4 w-1/6 justify-end">
                <img src={LanguageIcon} className="w-1/2 max-w-5" />
                {/* <img src={LogoutIcon} className="w-1/2 max-w-4" /> */}
            </div>
        </header>
    )
}
