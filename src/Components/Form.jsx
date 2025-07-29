import React, { useEffect } from "react"
import Recipe from "./Recipe"
import Ingredients from "./Ingredients"
import { getRecipeFromMistral } from '../ai'

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeshown, setRecipeShown] = React.useState("")
    const [shown, setShown] = React.useState(false)
    const[text, setText] = React.useState("")
    const fullText = "Wait Generate Recipe..."

    useEffect(() => {
        if (!shown) return;
        let index = -1;
        let isMounted = true;
        const typeChar = () => {
        if (index < fullText.length && isMounted) {
            setText(prev => prev + fullText.charAt(index));
            index++;
            setTimeout(typeChar, 50);
        }
        };
        typeChar();
        return () => {
        isMounted = false; // cancel typing if component unmounts or shown becomes false
        };
    }, [shown]);


    async function getRecipe() {
        setText("")             // 1. Clear first
        setShown(false)         // 2. Reset shown
        await new Promise(r => setTimeout(r, 10)) // 3. Wait a moment (to trigger useEffect again)
        setShown(true)          // 4. Trigger typing animation
        const generateRecipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipeShown(generateRecipeMarkdown)
    }


    function addIngrediants(fromData) {
        const newIngredient = fromData.get("ingredient")
        setIngredients(prevIngredient => [...prevIngredient ,newIngredient])
    }

    function removeIngredient(indexToRemove) {
    setIngredients(ingredients.filter((_, i) => i !== indexToRemove))
}

    return (
        <main>
            <form className="main-form" action={addIngrediants}>
                <input type="text" placeholder="e.g oregano" className="form-input" name="ingredient"/>
                <button className="form-btn">Add Ingredient</button>
            </form>
            <br />
            {shown && <div className="alerto"><span>{text}</span></div>}
            <section className="all-generate">
            <Ingredients getRecipe={getRecipe} ingredients={ingredients} removeIngredient={removeIngredient} />
                <br />
            </section> 
            { recipeshown && <Recipe recipeshown={recipeshown} /> }
        </main>
    )
}