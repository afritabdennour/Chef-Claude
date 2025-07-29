import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe
they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, 
but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page and you are an intelligent assistant that receives a list of ingredients the user has on hand, and suggests a recipe they could make using some or all of those ingredients. 
- You do **not** need to use every ingredient listed.
- You may include **a few reasonable extra ingredients** to make the recipe complete.
- If the ingredients are **not appropriate for food** (e.g., weapons, dangerous objects, fictional items), respond politely that you cannot generate a recipe based on them.
- Always respond in **markdown format** with clear sections: recipe name, ingredients, and instructions.
- Keep the tone friendly and helpful, like a creative but practical chef.`

const hf = new HfInference(VITE_HF_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}