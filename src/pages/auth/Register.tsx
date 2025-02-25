import { useEffect } from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

// components
import { FormInput, VerticalForm, AuthLayout, PageBreadcrumb } from '../../components'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { resetAuth, signupUser } from '../../redux/actions';

export interface UserData {
  name: string;
  email: string;
  phone: string | undefined;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-center">Already have account ?
      <Link to="/auth/login" className="text-primary ms-1">
        <b>Log In</b>
      </Link>
    </p>
  );
};

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
    error: state.Auth.registerError,
    success: state.Auth.registerSuccess,
  }));


  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      navigate('/auth/login')
    }
  }, [success])

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Please enter Name"),
      email: yup
        .string()
        .required("Please enter Email")
        .email("Please enter valid Email"),
      phone: yup
        .string()
        .matches(/^[0-9]{10,15}$/, "Phone number must be between 10-15 digits"),
      password: yup.string().required("Please enter Password"),
      confirmPassword: yup
        .string()
        .required("Please confirm your Password")
        .oneOf([yup.ref('password'), ''], "Passwords must match"),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    dispatch(
      signupUser(formData)
    );
  };

  return (
    <>
      <PageBreadcrumb title='Register' />
      <AuthLayout
        authTitle='Sign Up'
        helpText="Don't have an account? Create your account, it takes less than a minute"
        bottomLinks={<BottomLink />}
      >
        {error && 
          <div className='text-red-500 bg-red-100 rounded px-2 py-1 mb-3'>{error}</div>
        }
        <VerticalForm<UserData & { confirmPassword: string }>
          onSubmit={onSubmit}
          resolver={schemaResolver as any}
        >
          <FormInput
            label='Full Name'
            type='text'
            name='name'
            placeholder='Enter Full Name'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
            required
          />

          <FormInput
            label='Email Address'
            type='email'
            name='email'
            placeholder='Enter your Email'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
            required
          />

          <FormInput
            label='Phone Number'
            type='text'
            name='phone'
            placeholder='Enter your phone number'
            containerClass='mb-4'
            className='form-input'
            labelClassName='block text-sm font-medium text-gray-600 dark:text-gray-200 mb-2'
          />

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
            <button type='submit' className="btn w-full text-white bg-primary" disabled={loading}> Register </button>
          </div>

        </VerticalForm>
      </AuthLayout>
    </>
  )
}

export default Register
