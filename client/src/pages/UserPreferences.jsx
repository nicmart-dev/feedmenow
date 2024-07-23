import timeIcon from '../assets/icons/time.svg'
import worldIcon from '../assets/icons/world.svg'

import React, { useState } from 'react'
import Select from 'react-select'

const UserPreferences = () => {
    const [hungryHippos, setHungryHippos] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [cuisine, setCuisine] = useState([])
    const [diet, setDiet] = useState([])
    const [notEating, setNotEating] = useState([])

    const cuisineOptions = [
        // Your cuisine options here
        { value: 'italian', label: 'Italian' },
        { value: 'mexican', label: 'Mexican' },
        // ...
    ]

    const dietOptions = [
        'Vegan',
        'Ketogenic',
        'Vegetarian',
        'Plant-based',
        'Gluten-Free',
        'Paleo',
        'Low-carb',
    ]

    const handleNotEatingChange = (value) => {
        setNotEating(value)
    }

    return (
        <div>
            <label htmlFor="hungryHippos" className="text-green font-bold">
                How many hungry hippos?
            </label>
            <select
                id="hungryHippos"
                value={hungryHippos}
                onChange={(e) => setHungryHippos(e.target.value)}
            >
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
            </select>

            <label htmlFor="cookTime" className="text-green font-bold">
                Recipe cook time
            </label>
            {/* Replace with your preferred time selection component */}
            <input
                type="time"
                id="cookTime"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
            />

            <label htmlFor="cuisine" className="text-green font-bold">
                What food do you like?
            </label>
            <Select
                isMulti
                name="cuisine"
                options={cuisineOptions}
                value={cuisine}
                onChange={setCuisine}
            />

            <label htmlFor="diet" className="text-green font-bold">
                I'm on a diet...
            </label>
            <Select
                isMulti
                name="diet"
                options={dietOptions}
                value={diet}
                onChange={setDiet}
            />

            <label htmlFor="notEating" className="text-green font-bold">
                and not eating.
            </label>
            {/* Use a suitable multi-value input component */}
            <input
                type="text"
                id="notEating"
                value={notEating}
                onChange={(e) => handleNotEatingChange(e.target.value)}
            />
        </div>
    )
}

export default UserPreferences
