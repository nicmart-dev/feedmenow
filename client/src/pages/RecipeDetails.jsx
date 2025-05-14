import SampleImage from '../assets/images/sample-food.jpg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl} from 'react-intl';

const tabs = [
    {
        name: 'Overview',
        href: '#',
        current: true,
        content: [],
    },
    {
        name: 'Ingredients',
        href: '#',
        current: false,
        content: [],
    },
    {
        name: 'Directions',
        href: '#',
        current: false,
        content: [],
    },
];

const overviewFormatIdLabels = [
    "recipe.servingSize.label",
    "recipe.caloriesUnits.label",
    "recipe.cookingTime.label",
    "recipe.cuisine.label",
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RecipeDetails() {
    const [currentTab, setCurrentTab] = useState({tab: tabs[0], index: 0});
    const [isHovered, setIsHovered] = useState(false);
    const [recipe, setRecipe] = useState(null);

    const params = useParams();
    const intl = useIntl();

    useEffect(() => {
        const localRecipes = JSON.parse(localStorage.getItem("recipes"));
        const findit = localRecipes.flatMap(objset => objset.dishes).find(dish => dish.id === params.id);

        if(findit) {
            tabs[0].content = [
                findit.size,
                findit.calories,
                findit.cooking_time,
                findit.cuisine
            ];
            tabs[1].content = [...findit.ingredients_measure];
            tabs[2].content = [...findit.instructions];

            setRecipe(findit);
        }
    }, []);

    return (
        <>
        {recipe && (<>
            <div className="flex flex-col lg:flex-row lg:items-center">
                <img src={SampleImage} className="w-full lg:w-1/2"/>
                <div className="flex flex-row m-4 justify-between lg:w-1/2">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl w-7/8 text-green">
                        {recipe.name}
                    </h1>

                </div>
            </div>
            <div className="m-4">
                <nav
                    aria-label="Tabs"
                    className="-mb-px flex space-x-8 justify-between md:justify-start"
                >
                    {tabs.map((tab, index) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentTab({tab: tab, index: index})
                            }}
                            aria-current={
                                tab === currentTab.tab ? 'page' : undefined
                            }
                            className={classNames(
                                tab === currentTab.tab
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
            <div className="flex flex-col m-4 mb-32  font-thin">
                {currentTab.tab.content.map((item, index) => (
                    <p
                        key={index}
                        className={`font-thin py-4 ${index !== currentTab.tab.content.length - 1 ? 'border-b border-lightgreen' : ''}`}
                    >
                        {currentTab.index === 0 ?
                            (
                                <span>
                                    {intl.formatMessage({id: overviewFormatIdLabels[index]}, {input: item})}
                                </span>
                            ) : (
                                <span>{item}</span>
                        )}
                    </p>
                ))}
            </div>
        </>)}</>

    )
}
