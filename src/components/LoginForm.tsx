import {FC, useContext, useState, ChangeEvent, useEffect} from 'react'
// import { Context } from '..';
import {observer} from 'mobx-react-lite';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const  LoginForm: FC = () =>  {   
    // const {store} = useContext(Context);  
    const [isLogin, setIsLogin] = useState<Boolean>(true);

    const [formData, setFormData] = useState({
      email: '',
      password: '',
      isRemeberMe: false,
      firstName:'',
      lastName: '',
      confirmPassword: ''
    });


    // const navigate = useNavigate();


    const { email, password, isRemeberMe } = formData;
    const formRequest = { email,  password, isRemeberMe };


    //function for get the input value
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const { name, value, type, checked } = e.target;
      setFormData((prevFormData) => {
          return {
              ...prevFormData,
              [name]: type === 'checkbox' ? checked : value,
          };
      });
    }

    const habldeSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      try{
        // const res = await store.login(formRequest.email, formRequest.password, formRequest.isRemeberMe);
        
        // const user = res;
        
      }catch(error){
        console.log("error from handle submit")
      }
      
    }

  //decommenter pour faire la redirection 
  // function openDashboard() {
  //     return <Navigate to="/user/profile" replace />;
  // }

  return (
    <main>
      <section>
        <h2>Weather Forecast & history</h2>
        <div className="image-wrap">
          <img src="" alt="application-logo" />
        </div>

        <div className="wrap-form-auth">

            {!isLogin &&
            <>
              <input 
              value={formData.firstName}
              onChange={handleChange} 
              type="text" 
              placeholder='First Name'
              />
              <input 
              value={formData.lastName}
              onChange={handleChange} 
              type="text" 
              placeholder='Last Name'
              /> 
            </>
        }

            <input 
              value={formData.email}
              onChange={handleChange} 
              type="text" 
              placeholder='Email'
            />
            <input 
              value={formData.password}
              onChange={handleChange} 
              type="password" 
              placeholder='Password'
            />
            {
              !isLogin &&
              <input 
                  value={formData.confirmPassword}
                  onChange={handleChange} 
                  type="password" 
                  placeholder='Confirm password'
              /> 
            }
            <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                                name="isRemember"
                                checked={formData.isRemeberMe}
                                onChange={handleChange}
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

            {/* <button onClick={() =>  store.login(email, password)}>{!isLogin ? "Register" : "Login"}</button> */}
          
        </div>

        <button onClick={() =>  setIsLogin(!isLogin)}>{isLogin ? "Login" : "Register" }</button>
      </section>
        {/* <button onClick={() =>  store.registration(email, password, firstName, lastName)}>Register</button> */}
    </main>
  )
}

export default observer(LoginForm)