import axios from 'axios'

//suggest recipes call to server
export const suggestRecipes = (prompt, setRecipes, setFinalized) => {
    const connectSuggest = async () => {
        try {
            const data = {
                recipe: prompt,
            }
            const headers = {
                'Content-Type': 'application/json',
            }
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/recipes/suggest`,
                data,
                { headers }
            )

            setRecipes(response.data["Recipes"] || [response.data]);
            setFinalized(true);
        } catch (error) {
            console.error(error)
            setFinalized(true);
        }
    }
    connectSuggest()
}
