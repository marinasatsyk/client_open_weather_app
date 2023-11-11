import {FC, useContext, useState, ChangeEvent, useEffect} from 'react'
// import { Context } from '..';
import {observer} from 'mobx-react-lite';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./index.scss";


const  AuthComponent: FC = () =>  {   
    // const {store} = useContext(Context);  
    const [isLogin, setIsLogin] = useState<Boolean>(true);
    console.log(isLogin)
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

    const handldeSubmit = async (event: ChangeEvent<HTMLInputElement>) => {
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
      <section>
        <div className="wrap-form-auth">
            <h2>{!isLogin ? "Register" :"Login" }</h2>
            <div className="form">
                  {!isLogin &&
                  <>
                  <div className="wrapInput">
                    <label htmlFor="firstName" className=''>First Name</label>
                      <input 
                      value={formData.firstName}
                      onChange={handleChange} 
                      type="text" 
                      placeholder='First Name'
                      id='firstName'
                      />
                  </div>
                  
                  <div className="wrapInput">
                      <label htmlFor="firstName" className=''>First Name</label>
                      <input 
                      value={formData.lastName}
                      onChange={handleChange} 
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
                      onChange={handleChange} 
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
                      onChange={handleChange} 
                      type="password" 
                      placeholder='Password'
                      id='password'
                      name='password'
                    />
                  </div>


                  {
                    !isLogin &&
                    <div className="wrapInput">
                    
                    <label htmlFor="consfirmpassword" className=''>Confirm password</label>
                    <input 
                        value={formData.confirmPassword}
                        onChange={handleChange} 
                        type="password" 
                        placeholder='Confirm password'
                        id='consfirmpassword'
                    /> 
                    </div>
                  }   
            </div>
            {/* <button onClick={() =>  store.login(email, password)}>{!isLogin ? "Register" : "Login"}</button> */}

            <div className="btn-wrap">
              <button type='submit' onClick={() => {} }>{!isLogin ? "Register" :"Login" }</button> 
              <div className="input-remember">
                  
              <div className="wrapInput">
                  <label htmlFor="remember-me" className=''>Remember me</label>
                  <input
                      type="checkbox"
                      id="remember-me"
                      name="isRemember"
                      checked={formData.isRemeberMe}
                      onChange={handleChange}
                  />
              </div>
              </div>
            </div>
        </div>
        <button className='change-status' onClick={() =>  setIsLogin(!isLogin)}>{isLogin ? "Register" :"Login" }</button>
      </section>
  )
}
export default AuthComponent

        {/* <button onClick={() =>  store.registration(email, password, firstName, lastName)}>Register</button> */}
