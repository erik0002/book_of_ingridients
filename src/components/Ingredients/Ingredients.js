import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {

    const [userIngredients, setUserIngredients] = useState([]);

    const addIngredientHandler = ingredient => {
        fetch('https://redux-toolkit-1111b-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevIngredients => [
                ...prevIngredients,
                {id: responseData.name, ...ingredient}
            ]);
        })
    };

    const removeIngredientHandler = ingredientId => {
        setUserIngredients(prevIngredients => prevIngredients.filter((i) => i.id !== ingredientId)
        );
    }

    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler}/>

            <section>
                <Search/>
                <IngredientList
                    ingredients={userIngredients}
                    onRemoveItem={removeIngredientHandler}/>
                {/* Need to add list here! */}
            </section>
        </div>
    );
}

export default Ingredients;
