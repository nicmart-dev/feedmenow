import SampleImage from '../assets/images/sample-food.jpg'
import HeartIcon from '../assets/icons/heart.svg'
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
    return (
        <>
            <img src={SampleImage} />
            <div className="flex flex-row">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Sample Recipe Name Lorem Ipsum
                </h1>
                {/* Put Heart Icon */}
            </div>

            <div className="border-b border-gray-200">
                <nav aria-label="Tabs" className="-mb-px flex space-x-8">
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
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                            )}
                        >
                            {tab.name}
                        </a>
                    ))}
                </nav>
            </div>

            <div>
                {currentTab.content.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </>
    )
}
