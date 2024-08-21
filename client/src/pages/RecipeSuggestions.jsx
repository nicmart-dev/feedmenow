import { FormattedMessage, useIntl } from 'react-intl'
import {useEffect, useState} from "react";

export default function RecipeSuggestions() {

    const [userRecipes, setUserRecipes] = useState([]);
    let userRecipeId = 0;

    const recipes = [
        {
            id: 1,
            imageAlt: 'recipe image',
            imageSrc:
                'https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            href: 'www.fakeurl.com',
            name: <FormattedMessage id="recipes.name" />,
            time: '30 min',
            ingredient: '5 ingredients',
            cuisine: 'French',
        },
        {
            id: 2,
            imageAlt: 'recipe image',
            imageSrc:
                'https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            href: 'www.fakeurl.com',
            name: <FormattedMessage id="recipes.name" />,
            time: '30 min',
            ingredient: '5 ingredients',
            cuisine: 'French',
        },
    ]

    useEffect(() => {
            const localJSON = JSON.parse(localStorage.getItem('recipes'));
            if(localJSON["Recipes"]) {
                setUserRecipes(localJSON["Recipes"]);
            } else {
                setUserRecipes([localJSON]);
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

                { localStorage.getItem('recipes') !== null ||
                recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="group relative rounded-md border p-2 border-green"
                    >
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                alt={recipe.imageAlt}
                                src={recipe.imageSrc}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-sm"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-xl text-gray-700 font-thin">
                                    <a href={recipe.href}>
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                        />
                                        {recipe.name}
                                    </a>
                                </h3>
                                <p className="font-thin">{recipe.time}</p>
                                <p className="font-thin">{recipe.ingredient}</p>
                                <p className="font-thin">{recipe.cuisine}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {
                    userRecipes.length > 0 && userRecipes.map((recipe) => (
                        <div
                            key={++userRecipeId}
                            className="group relative rounded-md border p-2 border-green"
                        >
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-xl text-gray-700 font-thin">
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                        />
                                        {recipe["Recipe Name"]}
                                    </h3>
                                    <p className="font-thin">Cooking Time: {recipe["cooking time"]} min</p>
                                    <p className="font-thin">Cooking Guide: {recipe["cooking_guide"].map((guide) => (
                                        <span className="p-2"><br></br>{guide}</span>
                                    ))}</p>
                                    <p className="font-thin">Cuisine: <span className="font-thin">{recipe.cuisine}</span></p>
                                    <p className="font-thin">Ingredients: {recipe.ingredients.map((ingredient) => (
                                        <span className="underline p-2 font-thin"><br></br>{ingredient}</span>
                                    ))}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }


            </div>
        </>
    )
}
