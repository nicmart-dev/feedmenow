import timeIcon from '../../assets/icons/time.svg'
import worldIcon from '../../assets/icons/world.svg'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

/* Import icons from Font Awesome library
Following instructions from https://docs.fontawesome.com/web/use-with/react/add-icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCarrot } from '@fortawesome/free-solid-svg-icons'

const UserPreferences = () => {
    const [hungryHippos, setHungryHippos] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [cuisine, setCuisine] = useState([])
    const [diet, setDiet] = useState([])
    const [notEating, setNotEating] = useState([])

    /* Cuisine options stored from popular web service API */
    const [cuisineOptions, setCuisineOptions] = useState([])

    useEffect(() => {
        const fetchCuisines = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/food/cuisines/`
                )
                const cuisines = Object.values(response.data).map(
                    (cuisine) => ({
                        value: cuisine,
                        label: cuisine,
                    })
                )
                setCuisineOptions(cuisines)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCuisines()
    }, [])

    /* 
Predefined list of diets supported by popular API Spoonacular
https://spoonacular.com/food-api/docs#Diets
*/
    const dietOptions = [
        { value: 'gluten free', label: 'Gluten Free' },
        { value: 'ketogenic', label: 'Ketogenic' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'lacto-vegetarian', label: 'Lacto-Vegetarian' },
        { value: 'ovo-vegetarian', label: 'Ovo-Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'pescetarian', label: 'Pescetarian' },
        { value: 'paleo', label: 'Paleo' },
        { value: 'primal', label: 'Primal' },
        { value: 'low fodmap', label: 'Low FODMAP' },
        { value: 'whole30', label: 'Whole30' },
    ]

    /* 
Predefined list of intolerances/allergens supported by popular API Spoonacular
https://spoonacular.com/food-api/docs#Intolerances
*/
    const intoleranceOptions = [
        { value: 'Dairy', label: 'Dairy' },
        { value: 'Egg', label: 'Egg' },
        { value: 'Gluten', label: 'Gluten' },
        { value: 'Grain', label: 'Grain' },
        { value: 'Peanut', label: 'Peanut' },
        { value: 'Seafood', label: 'Seafood' },
        { value: 'Sesame', label: 'Sesame' },
        { value: 'Shellfish', label: 'Shellfish' },
        { value: 'Soy', label: 'Soy' },
        { value: 'Sulfite', label: 'Sulfite' },
        { value: 'Tree Nut', label: 'Tree Nut' },
        { value: 'Wheat', label: 'Wheat' },
    ]

    const cookTimeOptions = [
        { value: '5', label: '5 minutes' },
        { value: '15', label: '15 minutes' },
        { value: '30', label: '30 minutes' },
        { value: '45', label: '45 minutes' },
        { value: '60', label: '1 hour' },
        { value: '120', label: '1-2 hours' },
        { value: '120+', label: '2 hours +' },
    ]

    // Used to style react-select UI controls
    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderColor: 'green',
            '&:hover': {
                borderColor: 'green',
            },
        }),
    }

    return (
        <section className="m-4">
            <div className="space-y-6">
                {' '}
                {/* Added space-y-6 for vertical spacing */}
                <div>
                    <label
                        htmlFor="hungryHippos"
                        className="text-green font-bold mr-2"
                    >
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
                </div>
                <div>
                    <div className="flex items-center mb-2">
                        {' '}
                        {/* Added mb-2 for margin bottom */}
                        <img src={timeIcon} alt="Icon" width={20} height={20} />
                        <label
                            htmlFor="cookTime"
                            className="text-green font-bold ml-2"
                        >
                            Recipe cook time
                        </label>
                    </div>
                    <Select
                        value={cookTime}
                        onChange={setCookTime}
                        options={cookTimeOptions}
                    />
                </div>
                <div>
                    <div className="flex items-center mb-2">
                        {' '}
                        {/* Added mb-2 for margin bottom */}
                        <img
                            src={worldIcon}
                            alt="Icon"
                            width={20}
                            height={20}
                        />
                        <label
                            htmlFor="cuisine"
                            className="text-green font-bold ml-2"
                        >
                            What food do you like?
                        </label>
                    </div>
                    <CreatableSelect
                        isMulti
                        name="cuisine"
                        options={cuisineOptions}
                        value={cuisine}
                        onChange={setCuisine}
                    />
                </div>
                <div>
                    <div className="flex items-center mb-2">
                        {' '}
                        {/* Added mb-2 for margin bottom */}
                        <FontAwesomeIcon icon={faCarrot} />
                        <label
                            htmlFor="diet"
                            className="text-green font-bold ml-2"
                        >
                            I'm on a diet...
                        </label>
                    </div>
                    <Select
                        isMulti
                        name="diet"
                        options={dietOptions}
                        value={diet}
                        onChange={setDiet}
                    />
                </div>
                <div>
                    <div className="flex items-center mb-2">
                        {' '}
                        {/* Added mb-2 for margin bottom */}
                        <FontAwesomeIcon icon={faBan} />
                        <label
                            htmlFor="notEating"
                            className="text-green font-bold ml-2"
                        >
                            and not eating.
                        </label>
                    </div>
                    <CreatableSelect
                        isMulti
                        name="notEating"
                        options={intoleranceOptions}
                        value={notEating}
                        onChange={setNotEating}
                        styles={customStyles}
                    />
                </div>
            </div>
        </section>
    )
}

export default UserPreferences
