import { useEffect, useState } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";

// form validation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { loginUser, resetAuth } from "../../redux/actions";

// components
import { VerticalForm, FormInput, AuthLayout, PageBreadcrumb } from "../../components";

interface UserData {
  email: string;
  password: string;
  remember: boolean;
}

/* bottom links */
const BottomLink = () => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-center">Don't have an account ?
      <Link to="/auth/register" className="text-primary ms-1">
        <b>
          Register
        </b>
      </Link>
    </p>
  );
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [remember, setRemember] = useState<boolean>(false); // State for remember me checkbox

  const { user, userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.loginError,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup
        .string()
        .required("Please enter Email")
        .email("Please enter valid Email"),
      password: yup.string().required("Please enter Password"),
      remember: yup.boolean(),
    })
  );

  /*
  handle form submissionnewTask
  */
  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData.email, formData.password, remember));
  };

  const location = useLocation();

  // redirection back to where user got redirected from
  const redirectUrl = location?.search?.slice(6) || "/";

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl} />}
      <PageBreadcrumb title="Login" />
      <AuthLayout
        authTitle="Sign In"
        helpText="Enter your email address and password to access admin panel."
        bottomLinks={<BottomLink />}
      >
         {error && 
          <div className='text-red-500 bg-red-100 rounded px-2 py-1 mb-3'>{error}</div>
        }
        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver as any}
          defaultValues={{ email: "", password: "", remember: false }}
        >
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            containerClass="mb-4"
            className="form-input"
            labelClassName="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            containerClass="mb-4"
            className="form-input"
            labelClassName="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
            required
          />

          <div className="flex items-center justify-between mb-4">
            <FormInput
              label="Remember me"
              type="checkbox"
              name="remember"
              containerClass="flex items-center"
              labelClassName="ms-2"
              className="form-checkbox rounded"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <Link to="/auth/recover-password" className="text-sm text-primary border-b border-dashed border-primary">Forget Password ?</Link>
          </div>

          <div className="flex justify-center mb-6">
            <button
              className="btn w-full text-white bg-primary"
              type="submit"
              disabled={loading}
            >
              Log In
            </button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  )
}

export default Login