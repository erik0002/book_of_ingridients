import React, {useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';

const Ingredients = () => {

    const [userIngredients, setUserIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        console.log('Render ingredients', userIngredients);
    }, [userIngredients]);

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        setUserIngredients(filteredIngredients);
    }, []);

    const addIngredientHandler = ingredient => {
        setIsLoading(true);
        fetch('https://redux-toolkit-1111b-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            setIsLoading(false);
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevIngredients => [
                ...prevIngredients,
                {id: responseData.name, ...ingredient}
            ]);
        })
    };

    const removeIngredientHandler = ingredientId => {
        setIsLoading(true);
        fetch(`https://redux-toolkit-1111b-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`, {
            method: 'DELETE',
        }).then(response => {
            setIsLoading(false);
            setUserIngredients(prevIngredients => prevIngredients.filter((i) => i.id !== ingredientId)
            );
        }).catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    };

    const clearError = () => {
        setError(null);
    }

    return (
        <div className="App">
            { error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

            <IngredientForm
                onAddIngredient={addIngredientHandler}
                loading={isLoading}
            />

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler}/>
                <IngredientList
                    ingredients={userIngredients}
                    onRemoveItem={removeIngredientHandler}/>
                {/* Need to add list here! */}
            </section>
        </div>
    );
}

export default Ingredients;
