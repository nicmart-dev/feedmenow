import LanguageIcon from '../assets/icons/languages.svg'
import LogoutIcon from '../assets/icons/logout.svg'
import { FormattedMessage } from 'react-intl'
import { LanguageContext } from '../i18n/LanguageProvider'
import React, { useContext, useState } from 'react'

export default function Header() {
    const { switchLanguage } = useContext(LanguageContext) // Access switchLanguage function from context
    const [langOpen, setLangOpen] = useState(false) // track if language toggle is open or not

    return (
        <header className="flex flex-col pb-4">
            <div className="flex flex-row justify-between p-4 pb-0 w-full">
                <h1 className="text-2xl w-5/6">
                    <FormattedMessage id="appName" />
                </h1>
                <div className="flex flex-row gap-4 w-1/6 justify-end">
                    <img
                        src={LanguageIcon}
                        className="w-1/2 max-w-5"
                        onClick={() => setLangOpen(!langOpen)}
                    />

                    {/* <img src={LogoutIcon} className="w-1/2 max-w-4" /> */}
                </div>
            </div>
            {/* Language selection menu displayed only when clicking on language toggle button */}
            <div
                className={`order-3 w-full px-4 ${langOpen ? 'block' : 'hidden'}`}
                id="lang-menu"
            >
                <nav>
                    <ul className="flex flex-col items-end text-base text-gray-700 pt-4">
                        <li>
                            <button
                                onClick={() => {
                                    switchLanguage('en')
                                    setLangOpen(false)
                                }}
                            >
                                <FormattedMessage id="english" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    switchLanguage('fr')
                                    setLangOpen(false)
                                }}
                            >
                                <FormattedMessage id="french" />
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    switchLanguage('zh-cn')
                                    setLangOpen(false)
                                }}
                            >
                                <FormattedMessage id="simplifiedChinese" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
