export default function Ingredients(props) {
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <div key={index} className="div-ingredient">
            <div className="div-lists"><li className="x">{ingredient}</li></div>
            <div className="div-btns"><button className="remove-ingredient" onClick={() => props.removeIngredient(index)}>Remove Ingredient</button></div>
        <br /><br />
        </div>
    ))
        
    return (
        
            <>
            { props.ingredients.length > 0 &&
            <div>
            <br /><br />
            <h2 className="generate-header">Ingredients on hand:</h2>
            <br />
            <ul>
                {ingredientsListItems}
            </ul>
        </div> }
        <br /><br />
    { props.ingredients.length > 3 &&
    <div className="generate-box">
        <div className="generate-text">
            <br />
            <span className="context-generate">Ready for a recipe?</span>
            <p className="generate-paragraph">Generate your recipe from your list of ingredients</p>
        </div>
        <div className="generate-button">
            <button className="btn-generate" onClick={props.getRecipe}>Get a recipe</button>
        </div>
    </div> }
    </>
    )
}