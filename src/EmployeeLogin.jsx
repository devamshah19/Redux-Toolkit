import { useState } from 'react'
import { useToast, FormControl, Input, FormLabel, Button } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as jose from "jose";
import { prKey } from './Keys';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from './redux-toolkit/ReducerMain';

export const EmployeeLogin = () => {

    const url="https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee"
    const [ error, setError ] = useState("")
    const navigate = useNavigate()

    async function generateJwtToken(data) {

        const alg = 'HS256'
          
        const jwt = await new jose.SignJWT(data)
        .setProtectedHeader({ alg }) // algorithm
        .setIssuedAt()
        .setIssuer('issure:god')
        .setAudience('example:noaud')
        .setExpirationTime('2m')
        .sign(prKey)

        return jwt
    }

    const dispatch = useDispatch()
    const toast = useToast()
    const formik = useFormik({
        initialValues: {
            email: "admin@admin.com",
            password: "calculating"
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        }),
        onSubmit: async (val) => {
            axios.get(url)
                .then((res)=>res.data)
                .then((data)=>{
                    const cur = data.find((i)=>{return i.email.toLowerCase() === val.email.toLowerCase()})
                    if(cur===undefined) {
                        setError('User not found')
                        toast({
                            title: 'Error',
                            description: `${error}`,
                            status: 'error',
                            duration: 4000,
                            isClosable: true,
                        })
                    } else {
                        if(cur.password === val.password && cur.email.toLowerCase() === val.email.toLowerCase()) {
                            dispatch(setLoggedIn(true))

                            //set token to local storage
                            generateJwtToken(cur).then(data=>{
                                localStorage.setItem('tokenRedux', data)
                            })
                            
                            if(cur.designation.toLowerCase()==='admin') {
                                navigate("/displayemployees")
                            } else {
                                navigate("/employeeinfo")
                            }
                        } else {
                            toast({
                                title: 'credential Error',
                                description: `Credentials not matched`,
                                status: 'error',
                                duration: 4000,
                                isClosable: true,
                            })
                        }
                    }
                })
                .catch((e)=>setError(e.message))
              
                
                
        
            formik.resetForm()
        }
    })

  return (
    <div>
    <form id="myform" name="myform" onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input isInvalid={formik.touched.email && formik.errors.email ? true : false} onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" type='email' />
            {formik.touched.email && formik.errors.email ? (
                <p className="text-danger">{formik.errors.email}</p>
            ) : null}
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input isInvalid={formik.touched.password && formik.errors.password ? true : false} onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} id="password" type='password' />
            {formik.touched.password && formik.errors.password ? (
                <p className="text-danger">{formik.errors.password}</p>
            ) : null}
        </FormControl>
        
        <Button marginTop={5} type="submit" colorScheme='teal' size='md'>
            Login
        </Button>

        
    </form>
</div>
  )
}
