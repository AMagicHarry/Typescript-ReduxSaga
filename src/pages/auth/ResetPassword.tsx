import { Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// components
import {
  FormInput,
  VerticalForm,
  AuthLayout,
  PageBreadcrumb,
} from "../../components";
import { useState } from "react";
import { resetPassword } from "@/helpers/api/auth";

interface UserData {
  password: string;
}

const BottomLink = () => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-center">
      Back to
      <Link to="/auth/login" className="text-primary ms-1">
        <b>Log In</b>
      </Link>
    </p>
  );
};

const ResetPassword = () => {
  const schemaResolver = yupResolver<any>(
    yup.object().shape({
      password: yup.string().required("Please enter Password"),
      confirmPassword: yup
        .string()
        .required("Please confirm your Password")
        .oneOf([yup.ref('password'), ''], "Passwords must match"),
    })
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation()
  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    resetPassword(new URLSearchParams(location.search).get('token') || '', formData.password)
      .then((res) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };
  return (
    <>
      <PageBreadcrumb title="Recover Password" />

      <AuthLayout
        authTitle="Reset Password"
        bottomLinks={<BottomLink />}
      >
        {error && (
          <div className="text-red-500 bg-red-100 rounded px-2 py-1 mb-3">
            {error}
          </div>
        )}
         {success && (
          <div className="text-green-500 bg-green-100 rounded px-2 py-1 mb-3">
            Password changed successfully.
          </div>
        )}

        <VerticalForm<UserData> key={success ? 'true' : 'false'} onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label='Password'
            type='password'
            name='password'
            placeholder='Enter your password'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
            required
          />
          
          <FormInput
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            placeholder='Confirm your password'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
            required
          />

          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="btn w-full text-white bg-primary"
              disabled={loading}
            >
              Reset Password
            </button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
