import React from 'react';
import styled from 'styled-components'
import {useForm} from 'react-hook-form'
import Logo from '../components/logo';
import { Link } from 'react-router-dom';
import Button from '../components/button'

const SignUp = () => {
    return (
        <Styles>
            <div className="left">
                <div className="sign-in">
                <Logo/>
                <div className="form">
                    <hgroup>
                        <h1>Sign-in</h1>
                        <h4>Sign in to start driving with SHMÜSH</h4>
                    </hgroup>

                    <form>
                        
                        <div className="inputs">
                            <input type="email" placeholder='Enter your email' />
                            <input type="password" placeholder='Enter your password' />
                            <div className='remember'>
                                <div>
                                    <input type="checkbox" id='forgot' />
                                    <label htmlFor="forgot">Remember me</label>
                                </div>
                                <Link>Forgotten details</Link>
                            </div>
                        </div>

                        <div className="buttons">
                            <Button>Sign in with Email</Button>
                            <Button primary={false}>
                                <img src="/google.png" alt="Google Logo" />
                                Sign in with Google
                            </Button>
                        </div>
                    </form>
                </div>
                <h4>No account? <Link to={'/list'}>Sign up</Link></h4>
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

    .left {
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        align-items: center;


        .sign-in {

            max-width: 400px;
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
                        gap: 10px;

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
                list-style: none;
                padding: 20px;

                border: 1px solid var(--light-grey);
                border-radius: 5px;
                box-shadow: 2px 2px 10px 2px #6e6e6e2f;
                
                display: flex;
                flex-direction:column;
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

export default SignUp;
