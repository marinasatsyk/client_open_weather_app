import {FC,  useState,  useEffect} from 'react';
import { UseAppDispatch } from 'utils/hook';
import AuthService from 'services/AuthService';
import { login } from 'store/slice/auth';
import  { AxiosError } from 'axios';
import { Validator, manageToken } from 'utils/helpers';
import {  useNavigate } from 'react-router-dom';
import { ManagedInput } from 'components/ManageInput';
import  "./index.scss";


const  AuthComponent: FC = () =>  {   
    const [isLoading, setIsLoading] = useState(false);

    const [isLogin, setIsLogin] = useState<Boolean>(true);
    const [errorAuth, setErrorAuth] = useState<any>({});
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    
    

     //verification if checkbox "signIUp" is checked, use local state


     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [isRemeberMe, setIsRemeberMe] = useState(false);


    //**validation states front side */
    const [isEmailValidate, setIsEmailValidate] = useState(false);
    const [isPasswordValidate, setIsPasswordValidate] = useState(false);
    const [isConfirmPasswordValidate, setIsConfirmPasswordValidate] = useState(false);
    const [isFirstNameValidate, setIsFirstNameIsValidate] = useState(false);
    const [isLastNameValidate, setIsLastNameIsValidate] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    
    //hooks
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();


    function handleChangeForm(): void{
      setIsLogin(!isLogin);
      setIsAccountCreated(false)
      setErrorAuth({});
      setIsRemeberMe(false)
    }

    const handldeSubmit = async ( e: {preventDefault: () => void}) => {
      console.log("submit")
      e.preventDefault();
      console.log("1")
      const promise = isLogin 
      ?  AuthService.login(email, password) 
      :  AuthService.registration(email, password,  firstName, lastName);
      console.log("2")

      promise
        .then( response => {
          console.log("3")

          const dataUser = response?.data;
          setIsLoading(true)
          if(isLogin){
             dispatch(login(dataUser))
            manageToken(isRemeberMe, response.data.accessToken)
            navigate(`/user/${dataUser.user.id}/current`);
          }else{
            setIsAccountCreated(true)
            setIsLogin(true)
          }
        })
        .catch((error) => {
          console.log("4", error)

          setErrorAuth({})
          let  errorRes: any;
          if (error instanceof AxiosError) {
            console.log("axios", error)
            // La promesse a été rejetée avec une erreur Axios
            const axiosError = error as AxiosError;
            
              if(axiosError?.response){
                
                const {data, status, statusText} = axiosError?.response;
                errorRes = {
                  data, 
                  status,
                  statusText,
                  typeErr: 'axios'
                }
              }
  
          } else {
            console.log("pas axios")
            const errorResponse = error as Error;
            if(errorResponse.cause){
              const {cause, message, name, stack} = errorResponse;
              errorRes = {
                cause,
                message,
                name,
                stack,
                typeErr: 'any'
              }
            }
          }
          console.log("errorRes", errorRes)
          setErrorAuth(errorRes)
        })
     }


  useEffect(() =>{
    setIsEmailValidate(Validator.email(email));
    setIsFirstNameIsValidate(Validator.name(firstName));
    setIsLastNameIsValidate(Validator.name(lastName));
    setIsPasswordValidate(Validator.password(password));
    setIsConfirmPasswordValidate(Validator.confirmPassword(password, confirmPassword));

    if(isLogin) {
      isEmailValidate  
        ? setIsSubmitEnabled(true) 
        : setIsSubmitEnabled(false)
        console.log("isEmailValidate", isEmailValidate, "isPasswordValidate",  isPasswordValidate)
    }else{
      isEmailValidate &&   isPasswordValidate &&   isFirstNameValidate &&   isLastNameValidate && isConfirmPasswordValidate
      ? setIsSubmitEnabled(true) 
      : setIsSubmitEnabled(false)
    }
  }, [
    isFirstNameValidate,
    isLastNameValidate,
    isEmailValidate,
    isPasswordValidate,
    isConfirmPasswordValidate,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    isSubmitEnabled,
    isRemeberMe,
    errorAuth])
  
  console.log("errorAuth", errorAuth)
  console.log("setIsSubmitEnabled", isSubmitEnabled)
 
 
  return (
      <section>
        <div className="auth-container"  >
          
          <div className="wrap-form-auth">
              <div className="title-wrap">
                <h2>{!isLogin ? "Register" :"Login" }</h2>
                <div className={ `error ${errorAuth&&Object.keys(errorAuth).length >0 ? 'visible' : 'hidden'}`}>{errorAuth?.data?.message}</div>
                <div className={ `success ${isAccountCreated ? 'visible' : 'hidden'}`}>Your account was created successfully</div>
              </div>
              
              <div className="form">
                    {!isLogin &&
                    <>
                   
                    <ManagedInput 
                        id='firstName' 
                        type="text" 
                        name='firstName' 
                        value={firstName}
                        setValue = {setFirstName}
                        errorMessage="Make sure to enter correct  name"
                        validateField={Validator.name}
                      />
                    
                    <ManagedInput 
                        id='lastName' 
                        type="text" 
                        name='lastName' 
                        value={lastName}
                        setValue = {setLastName}
                        errorMessage="Make sure to enter correct last name"
                        validateField={Validator.name}
                        
                      />
                    </>
                }
                    
                    <ManagedInput 
                        id='email' 
                        type='email'  
                        name='email' 
                        value={email}
                        setValue = {setEmail}
                        errorMessage="Make sure to enter correct mail"
                        validateField={Validator.email}
                        
                      />
                    <ManagedInput 
                        id='password' 
                        type='password' 
                        name='password' 
                        value={password}
                        setValue = {setPassword}
                        errorMessage="Make sure to use at least 1 letter, 1 number, 6 characters"
                        validateField={isLogin ? () => true  : Validator.password}
                        
                      />

                    {
                      !isLogin &&
                      <ManagedInput 
                        id='confirmPassword' 
                        type='password' 
                        name='password' 
                        value={confirmPassword}
                        setValue = {setConfirmPassword}
                        errorMessage="Passwords are not the same"
                        validateField={Validator.confirmPassword}
                        secondValue={password}
                        
                      />
                    }   
              </div>

              <div className="btn-wrap">
                <button type='submit' onClick={(e) =>  handldeSubmit(e)} disabled={isSubmitEnabled ? false : true}>{!isLogin ? "Register" :"Login" }</button> 
                <div className="input-remember">
              
                <div id='checkbox-wrap' className={isLogin ? 'wrapInput' : 'hidden'} aria-disabled={isLogin ?  false : true}>
                    <input
                        type="checkbox"
                        id="isRemeberMe"
                        name="isRemeberMe"
                        checked={isRemeberMe}
                        onChange={() => setIsRemeberMe(!isRemeberMe)}
                    />
                    <label htmlFor="isRemeberMe" className=''>Remember me</label>
                </div>
              
                </div>
              </div>
          </div>
          <button className='change-status' onClick={() => handleChangeForm()}>{isLogin ? "Register" :"Login" }</button>
        </div>
      </section>
  )
}
export default AuthComponent;

