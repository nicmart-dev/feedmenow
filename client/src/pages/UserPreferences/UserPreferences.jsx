import timeIcon from '../../assets/icons/time.svg'
import worldIcon from '../../assets/icons/world.svg'

import React, { useState, useEffect, useContext } from 'react'
import axios, { options } from 'axios'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

/* Import icons from Font Awesome library
Following instructions from https://docs.fontawesome.com/web/use-with/react/add-icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCarrot } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from 'react-intl'
import { LanguageContext } from '../../i18n/LanguageProvider'

const UserPreferences = () => {
    const [cookTimeOptions, setCookTimeOptions] = useState( []);

    /*
    Predefined list of diets supported by popular API Spoonacular
    https://spoonacular.com/food-api/docs#Diets
    */
    const [dietOptions, setDietOptions] = useState( [] );

    /* 
    Predefined list of intolerances/allergens supported by popular API Spoonacular
    https://spoonacular.com/food-api/docs#Intolerances
    */
    const [intoleranceOptions, setIntoleranceOptions] = useState( [] );

    const [hungryHippos, setHungryHippos] = useState("1");
    const [cookTime, setCookTime] = useState(cookTimeOptions[0]);
    const [cuisine, setCuisine] = useState([]);
    const [diet, setDiet] = useState([]);
    const [notEating, setNotEating] = useState([]);

    /* Cuisine options stored from popular web service API */
    const [cuisineOptions, setCuisineOptions] = useState([]);
    const [userPreferences, setUserPreferences] = useState(null);

    const { locale } = useContext(LanguageContext);

    useEffect(() => {
        const getLocalSettings = async () => {
            try {
                const localStorageSettings = JSON.parse(localStorage.getItem("userSettings"));
                setHungryHippos(localStorageSettings.people);
                setCookTime(localStorageSettings.cookTime);
                setCuisine(localStorageSettings.cuisine);
                setDiet(localStorageSettings.diet);
                setNotEating(localStorageSettings.notEating);
            } catch(error) {
                console.error(error);
            }
        }

        const fetchCuisines = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/recipes/cuisines/`
                );
                const cuisines = Object.values(response.data).map(
                    (cuisine) => ({
                        value: cuisine,
                        label: cuisine,
                    })
                );

                setCuisineOptions(cuisines);
            } catch (error) {
                console.error(error)
            }
        }

        const fetchUserPreferences = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/recipes/userpreferences/`
                );

                setCookTimeOptions(response.data.cookingTime.map(item => ({value: item.value, label: item[locale]})));
                setDietOptions(response.data.diet.map(item => ({value: item.value, label: item[locale]})));
                setIntoleranceOptions(response.data.intolerance.map(item => ({value: item.value, label: item[locale]})));

                setUserPreferences(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getLocalSettings();
        fetchCuisines();
        fetchUserPreferences();
    }, []);

    useEffect(() => {
        if(userPreferences) {
            //change locale of selectable options
            setCookTimeOptions(userPreferences.cookingTime.map(item => ({value: item.value, label: item[locale]})));
            setDietOptions(userPreferences.diet.map(item => ({value: item.value, label: item[locale]})));
            setIntoleranceOptions(userPreferences.intolerance.map(item => ({value: item.value, label: item[locale]})));

            //change locale of selected options
            setCookTime({value: cookTime.value, label: userPreferences.cookingTime.find(item => (item.value === cookTime.value))[locale]});
            // setCuisine(cuisine.map((item) => (
            //     {value: item.value, label: userPreferences.cuisine.find(item => (item.value === cookTime.value))[locale]}
            // )));

            setDiet(diet.map(selectedDiet => (
                {value: selectedDiet.value, label: userPreferences.diet.find(item => (item.value === selectedDiet.value))[locale]}
            )));

            setNotEating(notEating.map(selectedNotEating => {
                const label = userPreferences.intolerance.find(item => (item.value === selectedNotEating.value));

                if(label) {
                    return {value: selectedNotEating.value, label: label[locale]};
                } else {
                    return {value: selectedNotEating.value, label: selectedNotEating.label};
                }
            }
            ));
        }

    }, [locale]);

    useEffect(() => {
        const userSettings = JSON.parse(localStorage.getItem("userSettings"));

        userSettings.people = hungryHippos;
        userSettings.cookTime = cookTime;
        userSettings.cuisine = cuisine;
        userSettings.diet = diet;
        userSettings.notEating = notEating;

        localStorage.setItem("userSettings", JSON.stringify(userSettings));
    }, [hungryHippos, cookTime, cuisine, diet, notEating, cuisineOptions, userPreferences]);
    

    // Used to style react-select UI controls
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'green' : provided.borderColor,
            boxShadow: state.isFocused ? '0 0 0 1px green' : provided.boxShadow,
            '&:hover': {
                borderColor: 'green',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(0, 128, 0, 0.1)', // Light green background
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'green',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'green',
            '&:hover': {
                backgroundColor: 'green',
                color: 'white',
            },
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'green',
        }),
        clearIndicator: (provided) => ({
            ...provided,
            color: 'green',
            '&:hover': {
                color: 'darkgreen',
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'green',
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
                        <FormattedMessage id="settings.question.people" defaultMessage="How many hungry hippos?"/>
                    </label>
                    
                    <select
                        id="hungryHippos"
                        value={hungryHippos}
                        onChange={
                            (e) => {setHungryHippos(e.target.value)}
                        }
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div>
                    <div className="flex items-center mb-2">
                        <img src={timeIcon} alt="Icon" width={20} height={20} />
                        <label
                            htmlFor="cookTime"
                            className="text-green font-bold ml-2"
                        >
                            <FormattedMessage id="settings.question.cookTime" defaultMessage="Recipe cook time"/>
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
                            <FormattedMessage id="settings.question.cuisine" defaultMessage="What food do you like?" />
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
                        <FontAwesomeIcon icon={faCarrot} />
                        <label
                            htmlFor="diet"
                            className="text-green font-bold ml-2"
                        >
                            <FormattedMessage id="settings.question.dietOptions" defaultMessage="I'm on a diet..."/>
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
                        <FontAwesomeIcon icon={faBan} />
                        <label
                            htmlFor="notEating"
                            className="text-green font-bold ml-2"
                        >
                            <FormattedMessage id="settings.question.notEating" defaultMessage="and not eating." />
                        </label>
                    </div>
                    <CreatableSelect
                        isMulti
                        closeMenuOnSelect={false}
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

export default UserPreferences;
