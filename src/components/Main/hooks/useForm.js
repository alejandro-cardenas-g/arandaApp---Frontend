import { useState } from 'react';

export const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState(initialState);

    const handleInputChange = ({target}) =>{

        if(target.name === 'rol'){
            setValues({
                ...values,
                [ target.name ]: target.value
            })
            return;
        }

        setValues({
            ...values,
            [ target.name ]: target.value
        })

    };

    const reset = () =>{

        setValues(initialState);

    };

    return [ values, handleInputChange, setValues, reset ];

};