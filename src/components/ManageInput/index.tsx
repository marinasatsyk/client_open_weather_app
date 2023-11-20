import { IManageInputProps } from 'common/interfaces/auth';
import {  useState, ChangeEvent} from 'react';
import { clearError } from 'store/slice/auth';
import { UseAppDispatch, UseAppSelector } from 'utils/hook';

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

    const { error  } = UseAppSelector((state) => state.auth);
    const dispatch = UseAppDispatch();

    const [isValid, setValid] = useState(true);
     let clearErrorObject = "";

    const f = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setValid(validateField(e.target.value, secondValue && secondValue));
    };
    const onHandleFocus = () => {
        dispatch(clearError(clearErrorObject))
    }


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
                onFocus={() => onHandleFocus()}
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

 