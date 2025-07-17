import { useState } from "react";
import { LoginApi } from "../../services/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../feature/auth/authSlice";
import { IoEyeOff, IoEye } from "react-icons/io5";
import * as yup from 'yup';
import { useFormik } from "formik";

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string()
      .required('Email is required')
      .email('Email format is invalid'),
    password: yup.string()
      .required('Password is required')
      .min(6, 'Password must have at least 6 charachter')
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await LoginApi({
          email: values.email,
          password: values.password
        });
        if (response) {
          dispatch(login({ data: response }));
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="border m-2 rounded-lg dark:border-gray-600" data-aos="zoom-out">
      <div className="h-screen  w-full max-w-md mx-auto p-6 ">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-gray-900 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account yet?
                <Link
                  className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 ml-1"
                  to='/sign-up'
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              >
                <svg
                  className="w-4 h-auto"
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="none"
                >
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign in with Google
              </button>

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                      Email <span className="text-red-600 text-xl">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 border
                          ${formik.touched.email && formik.errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                         focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                         dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        aria-describedby="email-error"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                        Password <span className="text-red-600 text-xl">*</span>
                      </label>
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 border
                          ${formik.touched.password && formik.errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                         focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                         dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      />
                      <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                        <button
                          type="button"
                          onClick={handleShowPass}
                          className="text-sm text-blue-700 dark:text-gray-300 hover:underline focus:outline-hidden"
                        >
                          {showPass ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                        </button>
                      </div>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ms-3">
                      <label htmlFor="remember-me" className="text-sm dark:text-white">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;