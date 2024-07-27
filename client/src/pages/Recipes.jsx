import { suggestRecipes } from '../lib/suggest'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Recipes() {
    const { state } = useLocation()
    const [recipes, setRecipes] = useState([])
    const [recipeFinalized, setRecipeFinalized] = useState(false)

    useEffect(() => {
        suggestRecipes(state, setRecipes, setRecipeFinalized)
    }, [])
    let status_field = <div>Waiting on Recipes to Load...</div>

    if (recipeFinalized) {
        status_field = (
            <div>
                {recipes?.map((recipe) => (
                    <div className="m-4 w-32 h-48">
                        {recipe['Recipe Name']}
                    </div>
                ))}
            </div>
        )
        console.log(recipes)
    }

    return <div className="recipes-cards m-4">{status_field}</div>
}

export default Recipes
