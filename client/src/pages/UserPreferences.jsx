import timeIcon from '../assets/icons/time.svg'
import worldIcon from '../assets/icons/world.svg'
import { useState } from 'react'

const tabs = [
    {
        name: 'Overview',
        href: '#',
        current: true,
        content: ['4 servings', '280 calories', '30 minutes', 'French'],
    },
    {
        name: 'Ingredients',
        href: '#',
        current: false,
        content: ['garlic', 'olive oil', 'salt', 'butter'],
    },
    {
        name: 'Directions',
        href: '#',
        current: false,
        content: ['do this', 'do that', 'do this next'],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RecipeDetails() {
    const [currentTab, setCurrentTab] = useState(tabs[0])
    const [isHovered, setIsHovered] = useState(false)

    return (
        <>
            <div className="text-green font-bold"></div>

            <img src={SampleImage} className="w-full" />
            <div className="flex flex-row m-4 justify-between">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl w-7/8 text-green">
                    Sample Recipe Name Lorem Ipsum
                </h1>
                {/* <img src={HeartIcon} className="w-1/8 w-12 cursor-pointer" /> */}
            </div>

            <div className="m-4">
                <nav
                    aria-label="Tabs"
                    className="-mb-px flex space-x-8 justify-between"
                >
                    {tabs.map((tab) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentTab(tab)
                            }}
                            aria-current={
                                tab === currentTab ? 'page' : undefined
                            }
                            className={classNames(
                                tab === currentTab
                                    ? 'border-green text-green font-bold'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 font-thin',
                                'whitespace-nowrap border-b-2 px-1 py-4 text-sm'
                            )}
                        >
                            {tab.name}
                        </a>
                    ))}
                </nav>
            </div>

            <div className="flex flex-col gap-4 m-4 font-thin">
                {currentTab.content.map((item, index) => (
                    <p
                        key={index}
                        className={`font-thin py-4 ${index !== currentTab.content.length - 1 ? 'border-b border-lightgreen' : ''}`}
                    >
                        {item}
                    </p>
                ))}
            </div>
        </>
    )
}
