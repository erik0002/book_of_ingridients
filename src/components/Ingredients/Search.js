import React, {useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from "../UI/ErrorModal";
import './Search.css';
import useHttp from "../../hooks/http";

const Search = React.memo(props => {
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();
    const { isLoading, data, error, sendRequest, clear } = useHttp();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const query = enteredFilter.length === 0
                    ? ''
                    : `?orderBy="title"&equalTo="${enteredFilter}"`;

                sendRequest(
                    'https://redux-toolkit-1111b-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + query,
                    'GET'
                )
            }
        }, 500);
        return () => {
        clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, sendRequest]);

    const EnteredFilterHandler = event => {
        setEnteredFilter(event.target.value);
    }

    useEffect(() => {
        if(!isLoading && !error && data) {
            const loadedIngredients = [];
            for (const key in data) {
                loadedIngredients.push({
                    id: key,
                    title: data[key].title,
                    amount: data[key].amount
                });
            }

            onLoadIngredients(loadedIngredients);
        }
    }, [data, isLoading, error, onLoadIngredients])

  return (
    <section className="search">
        {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
            {isLoading && <span>Loading...</span>}
          <input
              type="text"
              ref={inputRef}
              value={enteredFilter}
              onChange={EnteredFilterHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
