const defaultUserSettings = {
    people:"1",
    cookTime: {value:"0", label:"Any time"},
    cuisine: [],
    diet: [],
    notEating: []
};

const setDefaultSettings = () => {
    if(!localStorage.getItem("userSettings")) {
        localStorage.setItem("userSettings", JSON.stringify(defaultUserSettings));
    }
}

const setDefaultRecipes = () => {
    if(!localStorage.getItem("recipes")) {
        localStorage.setItem("recipes", JSON.stringify([]));
    }
}

export {
    setDefaultSettings,
    setDefaultRecipes,
    
    defaultUserSettings
}