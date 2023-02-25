import React from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import Button from "../button"
import Logo from "../logo"
import MarketingPanel from "./marketing-panel"

import { useDispatch } from "react-redux"
import { registerUser } from "../../network/auth.requests"
import { accessTokenUpdated } from "../../state/slices/app.slice"

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm()
  const submit = async formData => {
    try {
      const { data, success } = await registerUser(formData)
      if (success) {
        dispatch(accessTokenUpdated(data?.accessToken))
        navigate("/list")
      } else {
        console.log({ data, success })
        setError("root.registrationError", {
          type: 400,
          message: "User already exists",
        })
      }
    } catch (error) {
      console.log({ error })
      setError("root.serverError", { type: 500, message: "Server error" })
    }
  }

  return (
    <Styles>
      <div className="left">
        <div className="form-wrapper">
          <Logo />
          <div className="form">
            <hgroup>
              <h1>Ready?</h1>
              <h4>Register to start driving with SHMÜSH</h4>
            </hgroup>

            <form
              onSubmit={handleSubmit(submit)}
              onInput={event => clearErrors()}
            >
              <div className="inputs">
                <div className="email">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    onChange={clearErrors}
                    {...register("email", {
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Email not valid",
                      },
                    })}
                  />
                  <span className="error">{errors?.email?.message}</span>
                </div>
                <div className="password">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      minLength: { value: 8, message: "8 Characters Required" },
                    })}
                  />
                  <span className="error">{errors?.password?.message}</span>
                </div>
              </div>

              <div className="buttons">
                <Button type="submit">Register with Email</Button>
                <Button primary={false}>
                  <img src="/google.png" alt="Google Logo" />
                  Register with Google
                </Button>
                <div className="form-errors">
                  {errors?.root?.serverError && (
                    <span className="error">
                      {errors?.root?.serverError?.message}
                    </span>
                  )}
                  {errors?.root?.registrationError && (
                    <span className="error">
                      {errors?.root?.registrationError?.message}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
          <h4>
            Already have an account? <Link to={"/auth/login"}>Login</Link>
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
              gap: 5px;

              span {
                display: block;
                height: 15px;
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

export default SignUp
