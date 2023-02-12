import React from 'react';
import styled from 'styled-components'
import {useForm} from 'react-hook-form'
import Logo from '../logo';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../button'
import { registerUser } from '../../network/requests';
import { useDispatch } from 'react-redux';
import { accessTokenUpdated } from '../../state/slices/app.slice';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const submit = async (formData)=> {
        const accessToken = await registerUser(formData)
        dispatch(accessTokenUpdated(accessToken))
        navigate('/list')
    }
    return (
        <Styles>
            <div className="left">
                <div className="sign-in">
                <Logo/>
                <div className="form">
                    <hgroup>
                        <h1>Login</h1>
                        <h4>Login to start driving with SHMÜSH</h4>
                    </hgroup>

                    <form onSubmit={handleSubmit(submit)}>
                        
                        <div className="inputs">
                            <div className="email">
                                <input type="text" placeholder='Enter your email' {... register('email', {pattern: {value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message:"Email not valid"}})}/>
                                <span className="error">{errors?.email?.message}</span>
                            </div>
                            <div className="password">
                                <input type="password" placeholder='Enter your password' {... register('password', {minLength: {value:8, message:'8 Characters Required'}})} />
                                <span className="error">{errors?.password?.message}</span>
                            </div>
                            <div className='remember'>
                                <div>
                                    <input type="checkbox" id='forgot' />
                                    <label htmlFor="forgot">Remember me</label>
                                </div>
                                <Link>Forgotten details</Link>
                            </div>
                        </div>

                        <div className="buttons">
                            <Button type='submit'>Login with Email</Button>
                            <Button primary={false}>
                                <img src="/google.png" alt="Google Logo" />
                                Login with Google
                            </Button>
                        </div>
                    </form>
                </div>
                <h4>Don't have an account? <Link to={'/auth/register'}>Register</Link></h4>
            </div>
                </div>
            <div className="right">
                <div className="marketing">
                    <ul>
                        <li>100% Free</li>
                        <li>Share your progress</li>
                        <li>Accelerate your learning</li>
                        <li>Share practice lessons and test routes</li>
                    </ul>
                    <img src="/car.png" alt="" />
                </div>
            </div>
            
        </Styles>
    );
}


const Styles = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: stretch;

    .error {
        color: red;
        font-size: 12px;
        white-space: nowrap;
    }

    .left {
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        align-items: center;


        .sign-in {
            min-width: 350px;
            max-width: 600px;
            height: 60%;

            display: flex; 
            flex-direction: column;
            justify-content: space-between;
            

            h1 {
                font-weight: 500;
            }
            h4 {
                font-weight: 300;
            }

            .form {
                min-height: 50%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 40px;

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;

                    input, textarea, input[type=date] {
                        padding: 7px 10px;
                        border: 2px solid var(--very-light-grey);
                        border-radius: 5px;
                        font-size: 14px;
                        font-weight: 300;

                        &:focus {
                            outline: none;
                            border: 2px solid var(--purple);;
                        }
                    }
                    .inputs {
                        display: flex; 
                        flex-direction: column;

                        .email, .password {
                            display: flex; 
                            flex-direction: column;
                            gap: 3px;

                            span {
                                display: block;
                                height: 15px;
                            }
                        }

                        .remember {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            font-weight: 300;
                        }
                    }

                    .buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    

                }
            }

        }

        

    }

    .right {

        flex-basis: 100%;
        background-color: var(--light-purple);
        display: flex;
        justify-content: center;
        align-items: center;

        .marketing {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 50px;


            ul {
                list-style-type: none;
                padding: 20px;


                li {
                    padding-left: 2rem;
                    background-image: url('/favicon.png');
                    background-position: 0 0;
                    background-size: 1.3rem 1.3rem;
                    background-repeat: no-repeat;
                }



                

                border: 1px solid var(--light-grey);
                border-radius: 5px;
                box-shadow: 2px 2px 10px 2px #6e6e6e2f;
                
                display: flex;
                flex-direction:column;
                /* align-items: center; */
                justify-content: center;
                gap: 5px;

                transform: rotate(-5deg);

                background-color: white;


            }

            

        }
    }

    @media only screen and (max-width: 600px) {

    .right {
        display: none;
    }
 }
`

export default Login;
