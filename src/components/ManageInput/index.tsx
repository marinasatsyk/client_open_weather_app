import { IManageInputProps } from 'common/interfaces/auth';
import {FC,  useState, ChangeEvent, useEffect} from 'react';

export const ManagedInput = (props: IManageInputProps) => {
    const {
        id,
        type, 
        name, 
        value, 
        setValue,
        errorMessage,
        validateField,
        secondValue,
    } = props;


    const [isValid, setValid] = useState(true);
    
    const f = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setValid(validateField(e.target.value, secondValue && secondValue));
    };


    return (
        <div className="wrapInput">
            <label htmlFor={id}>{name}</label>
            <input
                value={value}
                type={type ?? 'text'}
                id={id}
                required
                name={name}
                onChange={(e) => f(e)}
                className="text-control"
            />
            {!isValid ? (
                <div style={{ color: 'red', fontSize: '12px' }}>
                    {errorMessage}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

 