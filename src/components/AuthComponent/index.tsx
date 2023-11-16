import {FC,  useState, ChangeEvent, useEffect} from 'react';
import { UseAppDispatch } from 'utils/hook';
import AuthService from 'services/AuthService';
import { login } from 'store/slice/auth';
import  { AxiosError } from 'axios';
import { manageToken } from 'utils/helpers';
import { Navigate, useNavigate } from 'react-router-dom';
import  "./index.scss";


const  AuthComponent: FC = () =>  {   
    // const {store} = useContext(Context);  
    const [isLogin, setIsLogin] = useState<Boolean>(true);
    const [errorAuth, setErrorAuth] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false)
    const [isAccountCreated, setIsAccountCreated] = useState(false);
   
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      isRemeberMe: false,
      firstName:'',
      lastName: '',
      confirmPassword: ''
    });

    const dispatch = UseAppDispatch();


    // const navigate = useNavigate();


    const { email, password, isRemeberMe } = formData;


    //@todo veirication form 
    const formRequest = { email,  password, isRemeberMe };

    // const userService = UserService();
    //function for get the input value

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setErrorAuth({});
      setIsAccountCreated(false)
      const { name, value, type, checked } = e.target;
      setFormData((prevFormData) => {
        console.log(prevFormData)
          return {
              ...prevFormData,
              [name]:type === 'checkbox' ? checked  : value,
          };
      });
    }

    const navigate = useNavigate();

    function handleChangeForm(): void{
      setIsLogin(!isLogin);
      setIsAccountCreated(false)
      setErrorAuth({});
    }
    console.log(formData)
    const handldeSubmit = async ( e: {preventDefault: () => void}) => {
      e.preventDefault();
      const {email, password, isRemeberMe, firstName, lastName} = formData;
     
      const promise = isLogin 
      ?  AuthService.login(email, password) 
      :  AuthService.registration(email, password,  firstName, lastName);

      promise
        .then( response => {
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
          setErrorAuth({})
          let  errorRes: any;
          if (error instanceof AxiosError) {
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
                
                console.error('Erreur de réponse Axios :', axiosError.response.data);
              }

          } else {
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

  }, [errorAuth])
  
  console.log("errorAuth", errorAuth)
 
 
  return (
      <section>
        <div className="auth-container"  >
          
          <div className="wrap-form-auth">
              <div className="title-wrap">
                <h2>{!isLogin ? "Register" :"Login" }</h2>
                <div className={ `error ${Object.keys(errorAuth).length >0 ? 'visible' : 'hidden'}`}>{errorAuth?.data?.message}</div>
                <div className={ `success ${isAccountCreated ? 'visible' : 'hidden'}`}>Your account was created successfully</div>
              </div>
              
              <div className="form">
                    {!isLogin &&
                    <>
                    <div className="wrapInput">
                      <label htmlFor="firstName" className=''>First Name</label>
                        <input 
                        value={formData.firstName}
                        onChange={(e) => handleChange(e)} 
                        type="text" 
                        placeholder='First Name'
                        id='firstName'
                        name='firstName'
                        />
                    </div>
                    
                    <div className="wrapInput">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                          value={formData.lastName}
                          onChange={(e) => handleChange(e)} 
                          type="text" 
                          placeholder='Last Name'
                          id='lastName'
                          name='lastName'
                        /> 
                    </div>

                    </>
                }
                    
                    <div className="wrapInput">
                      <label htmlFor="email" className=''>Email</label>
                      <input 
                        value={formData.email}
                        onChange={(e) => handleChange(e)} 
                        type="text" 
                        placeholder='Email'
                        id='email'
                        name='email'
                      />
                    </div>
                    
                    <div className="wrapInput">
                      <label htmlFor="password" className=''>Password</label>
                      <input 
                        value={formData.password}
                        onChange={(e) => handleChange(e)} 
                        type="password" 
                        placeholder='Password'
                        id='password'
                        name='password'
                      />
                    </div>


                    {
                      !isLogin &&
                      <div className="wrapInput">
                      
                      <label htmlFor="confirmPassword" className=''>Confirm password</label>
                      <input 
                          value={formData.confirmPassword}
                          onChange={(e) => handleChange(e)} 
                          type="password" 
                          placeholder='Confirm password'
                          id='confirmPassword'
                          name= 'confirmPassword'
                      /> 
                      </div>
                    }   
              </div>

              <div className="btn-wrap">
                <button type='submit' onClick={(e) =>  handldeSubmit(e)}>{!isLogin ? "Register" :"Login" }</button> 
                <div className="input-remember">
              
                <div id='checkbox-wrap' className={isLogin ? 'wrapInput' : 'hidden'} aria-disabled={isLogin ?  false : true}>
                    <input
                        type="checkbox"
                        id="isRemeberMe"
                        name="isRemeberMe"
                        checked={formData.isRemeberMe}
                        onChange={(e) => handleChange(e)}
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

