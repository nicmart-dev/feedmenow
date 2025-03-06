import { FormattedMessage, useIntl } from 'react-intl'
import {useEffect, useState} from "react";

import linkIcon from "../assets/icons/recipe.svg";
import clockIcon from "../assets/icons/clock.svg";
import ingredientsIcon from "../assets/icons/clipboard.svg";
import globeIcon from "../assets/icons/globe.svg";
import caloriesIcon from "../assets/icons/energy.png";

export default function RecipeSuggestions() {

    const [userRecipes, setUserRecipes] = useState([]);
    let userRecipeId = 0;

    useEffect(() => {
        try {
            const localJSON = JSON.parse(localStorage.getItem('recipes'));
            if(localJSON.length > 0) {
                setUserRecipes(localJSON);
            }
        } catch (err) {
            console.error(err);
        }

    }, []);

    return (
        <>
            <div className="border rounded-md p-2 m-4 border-green">
                <p className="text-lg leading-8 font-thin">You can make</p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-green">
                    Many Known Recipes
                </h1>
                <p className="text-lg leading-8 font-thin">
                    with your ingredients
                </p>
            </div>
            <div className="m-4">
                {userRecipes &&
                    userRecipes.map((item, i) => (
                        <section key={i}>
                            <h2 className="text-2xl text-gray-700 font-bold text-green relative rounded-md border p-2 border-green">
                                Prompt: {item.prompt}
                            </h2>

                            <div className="my-4 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 lg:grid-cols-4 xl:gap-x-8">
                                {item.dishes.map((recipe) => (
                                    <div
                                        key={userRecipeId++}
                                        className="group relative rounded-xl border p-2 border-green w-[clamp(171px,22vw,350px)] h-[clamp(300px,30vw,500px)] m-auto"
                                    >
                                        <div className="[&>*:not(.list-heading)]:mb-3">
                                            <div className="flex flex-row justify-between gap-4">
                                                <h3 className="text-2xl text-gray-700 mb-2 font-medium text-green w-3/5">
                                                    {recipe.name.slice(0, 30)}
                                                    {recipe.name[30] && '...'}
                                                </h3>
                                                <a
                                                    href={`/recipes/${recipe.id}`}
                                                    className="flex-shrink-0 w-[48px] h-[48px] border border-green rounded-sm"
                                                >
                                                    <img
                                                        src={linkIcon}
                                                        className="w-[40px] h-[40px] m-[3px] align-bottom"
                                                    />
                                                </a>
                                            </div>
                                            <div className="grid grid-cols-[auto_1fr] gap-2 font-normal">
                                                <img
                                                    src={clockIcon}
                                                    width={30}
                                                    alt="clock"
                                                />
                                                <p>{recipe.cooking_time}</p>
                                                <img
                                                    src={ingredientsIcon}
                                                    width={30}
                                                    alt="clock"
                                                />
                                                <p>{recipe.ingredients_measure.length} ingredients</p>
                                                <img
                                                    src={globeIcon}
                                                    width={30}
                                                    alt="clock"
                                                />
                                                <p>{recipe.cuisine}</p>
                                                <img
                                                    src={caloriesIcon}
                                                    width={30}
                                                    alt="clock"
                                                />
                                                <p>{recipe.calories}</p>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
            </div>
        </>
    )
}
