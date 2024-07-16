import SampleImage from '../assets/images/sample-food.jpg'
import HeartIcon from '../assets/icons/heart.svg'

const tabs = [
    { name: 'Overview', href: '#', current: true },
    { name: 'Ingredients', href: '#', current: false },
    { name: 'Directions', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RecipeDetails() {
    return (
        <>
            <img src={SampleImage} />
            <div className="flex flex-row">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Sample Recipe Name Lorem Ipsum
                </h1>
                {/* Put Heart Icon */}
            </div>
            <div>
                <div>
                    <div className="border-b border-gray-200">
                        <nav
                            aria-label="Tabs"
                            className="-mb-px flex space-x-8"
                        >
                            {tabs.map((tab) => (
                                <a
                                    key={tab.name}
                                    href={tab.href}
                                    aria-current={
                                        tab.current ? 'page' : undefined
                                    }
                                    className={classNames(
                                        tab.current
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
                </div>
            </div>
        </>
    )
}
