import { FormattedMessage, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import { defaultUserSettings } from '../../lib/defaults';

export default function Home({setIsRecipeRequest}) {
    const [ingredients, setIngredients] = useState("");
    const [displayRecipes, setDisplayRecipes] = useState(null);
    const [settings, setSettings] = useState(defaultUserSettings);

    const [canSubmit, setCanSubmit] = useState(false);

    const modSettings = useMemo(() => {
        settings.cuisine = settings.cuisine.flatMap((name) => name.label);
        settings.diet = settings.diet.flatMap((name) => name.label);
        settings.notEating = settings.notEating.flatMap((name) => name.label);
        return settings;
    }, [settings]);

    useEffect(() => {
        setSettings(JSON.parse(localStorage.getItem("userSettings")));
    }, []);

    useEffect(() => {

        const getRecipes = async () => {
            if(modSettings) {
                try {   
                    setCanSubmit(false);
                    setIsRecipeRequest(true);
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/recipes/suggest`, 
                        {ingredients: ingredients, settings: modSettings});

                    const existingRecipes = JSON.parse(localStorage.getItem('recipes'));
                    existingRecipes.unshift(...response.data);
                    localStorage.setItem("recipes", JSON.stringify(existingRecipes));
                    setDisplayRecipes(existingRecipes.sort(() => 0.5 - Math.random()).splice(0, 4));

                    navigate("/recipes");
                
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsRecipeRequest(false);
                    setCanSubmit(true);
                    setIngredients("");
                }
            }
        }

        if(ingredients && settings) {
            getRecipes();
        } else if(localStorage.getItem('recipes')) {
            setDisplayRecipes(JSON.parse(localStorage.getItem('recipes')).sort(
                () => 0.5 - Math.random()).splice(0, 4)
            );
        }

    }, [ingredients, settings]);

    const intl = useIntl();
    const navigate = useNavigate();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if(canSubmit) setIngredients(e.target.ingredientsField.value);
    }

    return (
        <>
            <div className="m-4 max-w-full py-8 bg-beige rounded-md p-2">
                <div className="text-left text-green">
                    <p className="mt-6 text-lg leading-8">
                        <FormattedMessage id="home.hero"/>
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        <FormattedMessage id="username"/>
                    </h1>
                </div>
            </div>
            <form
                className="border rounded-md p-2 m-4"
                onSubmit={handleSubmitForm}
            >
                <div className="space-y-12">
                    <div className="border-gray-900/10">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="ingredientsField"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <FormattedMessage id="home.ingredientTitle"/>
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="ingredientsField"
                                        name="ingredientsField"
                                        rows="3"
                                        onChange={(event) => {
                                            if(event.target.value.trim().length === 0 || event.target.value.trim() == ingredients) {
                                                setCanSubmit(false);
                                            } else {
                                                setCanSubmit(true);
                                            }
                                        }}
                                        className="
                                            block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                            ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6
                                        "
                                        placeholder={intl.formatMessage({
                                            id: 'home.placeholder',
                                        })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className={`
                        ${canSubmit ? "bg-green hover:bg-green" : "bg-gray-400 cursor-auto"} 
                        rounded-md px-3 py-2 my-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full`
                    }
                >
                    <FormattedMessage id="home.ctaBtn"/>
                </button>
            </form>

            <article className="border rounded-md p-2 m-4">
                <div className="space-y-12">
                    <div className="border-gray-900/10">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <h2
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <FormattedMessage id="home.recipesTitle"/>
                                </h2>
                                <div className="m-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 border rounded-md p-2 mb-32">
                                    {displayRecipes && displayRecipes.length > 0 && displayRecipes.map((recipe, i) => (
                                        <div key={i} className="group relative">
                                            <div className="flex justify-center flex-col">
                                                <h3 className="text-sm text-gray-700">
                                                    {recipe.name}
                                                </h3>
                                                <h4 className="text-sm text-gray-700">
                                                    {recipe.cuisine}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/*<div*/}
            {/*    className="m-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 border rounded-md p-2 mb-32">*/}
            {/*    {recipes.map((recipe) => (*/}
            {/*        <div key={recipe.id} className="group relative">*/}
            {/*            <div*/}
            {/*                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">*/}
            {/*                <img*/}
            {/*                    alt={recipe.imageAlt}*/}
            {/*                    src={recipe.imageSrc}*/}
            {/*                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="mt-4 flex justify-between">*/}
            {/*                <div>*/}
            {/*                    <h3 className="text-sm text-gray-700">*/}
            {/*                        <a href={recipe.href}>*/}
            {/*                            <span*/}
            {/*                                aria-hidden="true"*/}
            {/*                                className="absolute inset-0"*/}
            {/*                            />*/}
            {/*                            {recipe.name}*/}
            {/*                        </a>*/}
            {/*                    </h3>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </>
    )
}
