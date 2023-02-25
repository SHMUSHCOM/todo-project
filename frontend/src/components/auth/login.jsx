import React from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import { accessTokenUpdated } from "../../state/slices/app.slice"
import { useDispatch } from "react-redux"
import { loginUser } from "../../network/auth.requests.js"

import Logo from "../logo"
import Button from "../button"
import MarketingPanel from "./marketing-panel"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // REGISTER FORM
  const {register,handleSubmit,formState: { errors }, setError, clearErrors} = useForm()
  const submit = async formData => {
    const { data, success } = await loginUser(formData)
    if (success) {
      dispatch(accessTokenUpdated(data?.accessToken))
      navigate("/list")
    } else {
        console.log({data, success})
        setError("root.loginError", {
            type: 400,
            message: "Oops, authentication failed. Try again?"
        })
    }
  }

  return (
    <Styles>
      <div className="left">
        <div className="form-wrapper">
          <Logo />
          <div className="form">
            <hgroup>
              <h1>Login</h1>
              <h4>Login to start driving with SHMÜSH</h4>
            </hgroup>

            {/* LOGIN FORM */}
            <form 
                onSubmit={handleSubmit(submit)}
                onInput={event => clearErrors()}
            >
              <div className="inputs">

                {/* EMAIL FIELD */}
                <div className="email">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    {...register("email", { pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,message: "Email not valid",},})}
                  />
                  
                </div>
                <div className="error">{errors?.email?.message}</div>
                
                {/* PASSWORD FIELD */}
                <div className="password">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {minLength: { value: 8, message: "8 Characters Required" },})}
                  /> 
                </div>

                <div className="password-details">
                    <Link className="forgotten">Forgotten password</Link>
                    <div className="error">{errors?.password?.message}</div>
                </div>

              </div>
            
            {/* BUTTONS */}
              <div className="buttons">
                <Button type="submit">Login with Email</Button>
                <Button primary={false}>
                  <img src="/google.png" alt="Google Logo" />
                  Login with Google
                </Button>

                {/* SERVER ERRORS */}
                <div className="form-errors">
                  {errors?.root?.loginError && (
                    <span className="error">
                      {errors?.root?.loginError?.message}
                    </span>
                  )}
                </div>


              </div>
            </form>
          </div>
          <h4>
            Don't have an account? <Link to={"/auth/register"}>Register</Link>
          </h4>
        </div>
      </div>
      <div className="right">
        <MarketingPanel />
      </div>
    </Styles>
  )
}

const Styles = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: stretch;

  .error {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: red;
    font-size: 12px;
    white-space: nowrap;
    min-height: 20px;
    text-align: end;
  }

  .form-errors {
    min-height: 40px;
    display: flex;
    flex-direction: column;
  }

  .left {
    flex-basis: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .form-wrapper {
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

          input,
          textarea,
          input[type="date"] {
            padding: 7px 10px;
            border: 2px solid var(--very-light-grey);
            border-radius: 5px;
            font-size: 14px;
            font-weight: 300;

            &:focus {
              outline: none;
              border: 2px solid var(--purple);
            }
          }
          .inputs {
            display: flex;
            flex-direction: column;

            .email,
            .password {
              display: flex;
              flex-direction: column;
              gap: 3px;

              span {
                display: block;
                height: 15px;
              }
            }

            .password-details {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .forgotten {
                  font-weight: 500;
                font-size: 12px;
              }
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
    
  }
  @media only screen and (max-width: 600px) {
    height: -webkit-fill-available;
    height: fill-available;

    .left {
      height: 100%;
      height: -webkit-fill-available;
      height: fill-available;
    }

    .right {
      display: none;
    }
  }
`

export default Login
