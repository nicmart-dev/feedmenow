import { FormattedMessage, useIntl } from 'react-intl'
import {useEffect, useState} from "react";

import clockIcon from "../assets/icons/clock.svg";
import ingredientsIcon from "../assets/icons/clipboard.svg";
import globeIcon from "../assets/icons/globe.svg";
import caloriesIcon from "../assets/icons/energy.png";
import threedotsIcon from "../assets/icons/three-dots.svg";

export default function RecipeSuggestions() {

    const [userRecipes, setUserRecipes] = useState([]);
    const [showPromptMenu, setShowPromptMenu] = useState(-1);

    const mouseClickFunction = (promptitem) => {
        if(document.querySelector(`#nav-${promptitem}`)) document.querySelector(`#nav-${promptitem}`).classList.add("hidden");
        setShowPromptMenu(-1);
    };
    document.addEventListener("click", ()=> {mouseClickFunction(showPromptMenu)});

    useEffect(() => {
        try {
            const localJSON = JSON.parse(localStorage.getItem('recipes'));
            if(localJSON.length > 0) {
                setUserRecipes(localJSON);
            }
        } catch (err) {
            console.error(err);
        }

        return(() => {
            document.removeEventListener("mouseclick", mouseClickFunction);
        });

    }, []);

    const backgroundImg = {
        backgroundImage: `url(${threedotsIcon})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

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
                            <div className="relative">
                                <h2 className="text-2xl/8 text-gray-700 text-green break-all relative inline-flex items-start">
                                    <button className="bg-white rounded-sm hover:drop-shadow-lg mt-1 mr-2 h-[24px] w-[18px]" style={backgroundImg}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            if(showPromptMenu !== i) {
                                                if(document.querySelector(`#nav-${showPromptMenu}`)) document.querySelector(`#nav-${showPromptMenu}`).classList.add("hidden");
                                                document.querySelector(`#nav-${i}`).classList.remove("hidden");
                                                setShowPromptMenu(i);
                                            }
                                        }}
                                    /> {item.prompt}
                                </h2>
                                <nav id={`nav-${i}`} className={`hidden absolute z-10 rounded-md border p-2 border-green bg-pink-50 text-2xl/6  text-emerald-600`}>
                                    <ul>
                                        <li><button onClick={
                                            () => {
                                                const tempUserRecipes = userRecipes;
                                                tempUserRecipes.splice(i, 1);
                                                localStorage.setItem("recipes", JSON.stringify(tempUserRecipes));
                                                setUserRecipes(tempUserRecipes);
                                            }
                                        }><FormattedMessage id="suggest.delete" /></button></li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="mt-4 mb-8 px-2 grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-4 xl:gap-x-8 w-full md:w-fit">
                                {item.dishes.map((recipe, j) => (
                                    <>
                                    <a href={`/recipes/${recipe.id}`}>
                                    <div
                                        key={j}
                                        className="group relative rounded-xl border p-2 border-green max-w-[290px] md:max-w-full md:w-[clamp(190px,22vw,350px)] h-[clamp(320px,28vw,450px)]
                                        m-auto bg-white hover:shadow-xl hover:scale-110 hover:z-10 hover:bg-red-50 duration-300 transition-all"
                                    >
                                        <div className="[&>*:not(.list-heading)]:mb-3">
                                            <div className="flex flex-row justify-between gap-4">
                                                <h3 className="text-2xl text-gray-700 mb-2 font-medium text-green w-full break-words">
                                                    {recipe.name.slice(0, 30)}
                                                    {recipe.name[30] && '...'}
                                                </h3>
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
                                    </a>
                                    </>
                                ))}
                            </div>
                        </section>
                    ))}
            </div>
        </>
    )
}
