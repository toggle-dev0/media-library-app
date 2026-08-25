import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [sign, setSign] = useState(false);

  const { login } = useContext(AuthContext);

  const submitFn = () => {
    setEmail(email);
    login(email);
    navigate("/");
  };
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(submitFn)}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@example.com"
        />
        {errors.email && (
          <ErrorMessage errMessage={String(errors.email.message)} />
        )}
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          id="password"
        />
        {errors.password && (
          <ErrorMessage errMessage={String(errors.password.message)} />
        )}
        <br />
        {sign ? (
          <button type="submit">Log In</button>
        ) : (
          <button type="submit">Sign Up</button>
        )}
        {sign ? (
          <span style={{ textAlign: "center", display: "block" }}>
            Don't have an account?{" "}
            <span onClick={() => setSign(!sign)} className="sign-up">
              Sign Up
            </span>
          </span>
        ) : (
          <span style={{ textAlign: "center", display: "block" }}>
            Have an account?{" "}
            <span onClick={() => setSign(!sign)} className="sign-up">
              Login
            </span>
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;

interface LoginProps {
  errMessage: string;
}

const ErrorMessage = ({ errMessage }: LoginProps) => {
  return <span style={{ color: "red" }}>{errMessage}</span>;
};
