import React from "react"
import { Container } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    registerUser(data)
  }

  const history = useHistory()

  const registerUser = async (data) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/authors/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      if (response.ok) {
        // navigate to login
        history.push("/login")
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(watch("example"))

  return (
    <div>
      <Container className="new-blog-container">
        <h1 className="mt-5">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-3">
            <input name="name" {...register("name", { required: true })} />
          </div>

          <div className="mt-3">
            <input type="email" {...register("email", { required: true })} />
          </div>
          <div className="mt-3">
            <input
              type="password"
              {...register("password", { required: true })}
            />
          </div>

          {errors.exampleRequired && <span>This field is required</span>}

          <input className="mt-3" type="submit" />
        </form>
      </Container>
    </div>
  )
}

export default Register
