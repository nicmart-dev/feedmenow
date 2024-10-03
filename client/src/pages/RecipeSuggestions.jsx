import { FormattedMessage, useIntl } from 'react-intl'
import {useEffect, useState} from "react";

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
                    12 Recipes
                </h1>
                <p className="text-lg leading-8 font-thin">
                    with your 8 ingredients
                </p>
            </div>
            <div className="m-4 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                    userRecipes && userRecipes.map((recipe) => (
                        <div
                            key={++userRecipeId}
                            className="group relative rounded-md border p-2 border-green"
                        >
                            <div className="flex flex-col justify-between [&>*]:mb-3">
                                    <h3 className="text-2xl text-gray-700 mb-10 font-bold text-green">
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                        />
                                        {recipe.dish}
                                    </h3>
                                    <p className="font-normal">Cooking Time: <span className="text-green">{recipe.cooking_time}</span></p>
                                    <p className="font-normal">Cooking Guide: <span className="text-green">{
                                        recipe.instructions.map((instruction, i) => (
                                            <p className="font-semibold" key={i}>{i+1}. {instruction}</p>
                                        ))
                                    }</span>
                                    </p>
                                    <p className="font-normal">Cuisine: <span className="font-semibold text-green">{recipe.cousine}</span></p>
                                    <p className="font-normal">Ingredients: <span className="font-semibold text-green">{recipe.ingredients_measure.map((ingredient, i) =>
                                        <p>{String.fromCharCode(i+97)}. {ingredient}</p>
                                    )}</span>
                                    </p>
                                    <p className="font-normal">Serving Size: <span className="font-semibold text-green">{recipe.size}</span>
                                    </p>
                                    <p className="font-normal">Calories: <span className="font-semibold text-green">{recipe.calories}</span>
                                    </p>

                            </div>
                        </div>
                    ))
                }


            </div>
        </>
    )
}
