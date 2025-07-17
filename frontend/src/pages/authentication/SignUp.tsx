/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { registerApi } from "../../services/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import * as yup from 'yup';
import { useFormik } from "formik";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);


  const validationSchema = yup.object({
    fname: yup.string()
      .required('First name is required')
      .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
    lname: yup.string()
      .required('Last name is required')
      .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
    email: yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    mobile: yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
        'Password must contain at least one letter, one number, and one special character'
      ),
    cpassword: yup.string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      password: "",
      cpassword: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const body = {
          f_name: values.fname,
          l_name: values.lname,
          password: values.password,
          email: values.email,
          mobile: values.mobile,
          cpass: values.cpassword
        };

        const response = await registerApi(body);
        if (response) {
          toast.success('Registration successful!');
          formik.resetForm();
          navigate('/sign-in');
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="border m-2 rounded-lg dark:border-gray-600">
      <div className="relative bg-linear-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
            <div data-aos="fade-left" >
              <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">
                Welcome to the Store App
              </p>

              <div className="mt-4 md:mb-12 max-w-2xl">
                <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-gray-200">
                  Join Us Today!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign up now and streamline your document, file, and book management experience!
                </p>
              </div>

              <blockquote className="hidden md:block relative max-w-sm">
                <svg className="absolute top-0 start-0 transform -translate-x-6 -translate-y-8 size-16 text-gray-200 dark:text-gray-800" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                </svg>

                <div className="relative z-10">
                  <p className="text-xl italic text-gray-800 dark:text-white">
                    Amazing people to work with. Very fast and professional partner.
                  </p>
                </div>

                <footer className="mt-3">
                  <div className="flex items-center gap-x-4">
                    <div className="shrink-0">
                      <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                    </div>
                    <div className="grow">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">Josh Grazioso</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">Director Payments & Risk | Airbnb</div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div data-aos="fade-right">
              <form onSubmit={formik.handleSubmit}>
                <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                  <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-gray-900">
                    <div className="text-center">
                      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up here</h1>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?
                        <Link className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 ml-1" to="/sign-in">
                          Sign in here
                        </Link>
                      </p>
                    </div>

                    <div className="mt-5">
                      <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800">
                        {/* Google icon SVG */}
                        Sign up with Google
                      </button>

                      <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-300 before:me-6 after:flex-1 after:border-t after:border-gray-300 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700">Or</div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                          <div className="relative">
                            <label htmlFor="fname" className="block text-sm mb-2 dark:text-white">
                              First name <span className="text-lg text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              id="fname"
                              name="fname"
                              value={formik.values.fname}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 border
                                 ${formik.touched.fname && formik.errors.fname ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                                focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                                dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                            {formik.touched.fname && formik.errors.fname && (
                              <p className="mt-1 text-xs text-red-600">{formik.errors.fname}</p>
                            )}
                          </div>
                        </div>

                        {/* Last Name */}
                        <div>
                          <div className="relative">
                            <label htmlFor="lname" className="block text-sm mb-2 dark:text-white">
                              Last name <span className="text-lg text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              id="lname"
                              name="lname"
                              value={formik.values.lname}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400
                                border ${formik.touched.lname && formik.errors.lname ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                                focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                                dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                            {formik.touched.lname && formik.errors.lname && (
                              <p className="mt-1 text-xs text-red-600">{formik.errors.lname}</p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <div className="relative">
                            <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                              Email <span className="text-lg text-red-600">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400
                                border ${formik.touched.email && formik.errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                                focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                                dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                            {formik.touched.email && formik.errors.email && (
                              <p className="mt-1 text-xs text-red-600">{formik.errors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Mobile */}
                        <div>
                          <div className="relative">
                            <label htmlFor="mobile" className="block text-sm mb-2 dark:text-white">
                              Mobile number <span className="text-lg text-red-600">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile"
                              name="mobile"
                              value={formik.values.mobile}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400
                                border ${formik.touched.mobile && formik.errors.mobile ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                                focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                                dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                              <p className="mt-1 text-xs text-red-600">{formik.errors.mobile}</p>
                            )}
                          </div>
                        </div>

                        {/* Password */}
                        <div className="relative col-span-full">
                          <div className="relative">
                            <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                              Password <span className="text-lg text-red-600">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="off"
                                className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400
                                  border ${formik.touched.password && formik.errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                                  focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                              />
                              <button
                                type="button"
                                onClick={handleShowPass}
                                className="absolute inset-y-0 right-3 flex items-center text-blue-600"
                              >
                                {showPass ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                              </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                              <p className="mt-1 text-xs text-red-600">{formik.errors.password}</p>
                            )}
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="col-span-full">
                          <div className="relative">
                            <label htmlFor="cpassword" className="block text-sm mb-2 dark:text-white">
                              Confirm password <span className="text-lg text-red-600">*</span>
                            </label>
                            <input
                              type={showPass ? "text" : "password"}
                              id="cpassword"
                              name="cpassword"
                              value={formik.values.cpassword}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              autoComplete="off"
                              className={`bg-slate-100 dark:bg-gray-800 p-3 sm:p-4 h-12 block w-full rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 border
                                 ${formik.touched.cpassword && formik.errors.cpassword ?
                                  'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                                focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500
                                dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            />
                            {formik.touched.cpassword && formik.errors.cpassword && (
                              <p className="mt-1 text-xs text-red-600">{formik.errors.cpassword}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center">
                        <div className="flex">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="shrink-0 mt-0.5 border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ms-3">
                          <label htmlFor="terms" className="text-sm dark:text-white">
                            I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">Terms and Conditions</a>
                          </label>
                        </div>
                      </div>

                      <div className="mt-5">
                        <button
                          type="submit"
                          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                          disabled={loading}
                        >
                          {loading ? 'Registering...' : 'Register'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp