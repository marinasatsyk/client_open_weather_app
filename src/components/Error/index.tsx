import   {FC} from 'react';

interface ErrorProps{
    codeError: string
}

const  Error : FC<ErrorProps> = ({codeError}) =>  {
    return (
    <div>Error: {codeError}</div>
    );
}
export default Error;