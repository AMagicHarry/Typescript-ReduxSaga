import { Link } from "react-router-dom";
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
import { forgotPassword } from "@/helpers/api/auth";

interface UserData {
  email: string;
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

const RecoverPassword = () => {
  const schemaResolver = yupResolver<any>(
    yup.object().shape({
      email: yup
        .string()
        .required("Please enter Email")
        .email("Please enter valid Email"),
    })
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    setError(false);
    forgotPassword(formData.email)
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
        authTitle="Recover Password"
        helpText={
          !success
            ? "Enter your email address and we'll send you an email with instructions to reset your password."
            : "We have sent email. Please check your email inbox."
        }
        bottomLinks={<BottomLink />}
      >
        {error && (
          <div className="text-red-500 bg-red-100 rounded px-2 py-1 mb-3">
            {error}
          </div>
        )}
        <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            containerClass="mb-4"
            className="form-input"
            labelClassName="block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2"
          />

          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="btn w-full text-white bg-primary"
              disabled={loading}
            >
              {!success ? "Send" : "Resend"}
            </button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default RecoverPassword;
