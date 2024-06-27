import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as yup from "yup"
// import { object, string, number, date, InferType } from "yup"; // validation with lib

// Formik => init
// Form   => like a html form
// Fied   => like a html input
// ErrorMessage => to show

// there are 2 way form validate
// validate => custom validate
// validationSchema => validation with lib

const App = () => {
  let initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
  email : yup.string().email("Invalid email format").matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be from the @gmail.com domain').required('Email is required'),
  password: yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  
  .required('Password is required'),

  })

  const handleSubmit = (value) => {
    console.log(value);
  };

  return (
    <div>
      <Formik 
      validateOnChange={false}
      validateOnBlur={false}
      
            // custom validation
        // validate={(values) => {             
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = "Required email";
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }

        //   if (!values.password) {
        //     errors.password = "Required password";
        //   }
        //   return errors;
        // }}

        // validation with lib
        validationSchema={validationSchema}


        onSubmit={handleSubmit}
        initialValues={initialValue}
      >
        {({isSubmitting}) => (       // isSubmitting can watch submitting or not
          <>
            <Form className=" flex flex-col w-[500px] gap-3">
              <label htmlFor="email">Email</label>
              <Field
                className=" border border-black "
                type="email"
                name="email"
                id="email"
              />
              <ErrorMessage
                component={"p"}
                className=" text-red-600"
                name="email"
              />
              <label htmlFor="password">password</label>
              <Field
                className=" border border-black "
                type="password"
                name="password"
                id="password"
              />
              <ErrorMessage
                component={"p"}
                className=" text-red-600"
                name="password"
              />
              <button disabled={isSubmitting} className=" bg-slate-800 text-white" type="submit">
                submit
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default App;
