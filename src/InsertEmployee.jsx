import { useToast, FormControl, Input, FormLabel, Button, HStack, Container } from "@chakra-ui/react";
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { addEmployee } from "./redux-toolkit/ReducerMain";
import { Link, useNavigate } from "react-router-dom";
import * as jose from 'jose';
import { useEffect } from "react";
import { prKey } from "./Keys";

export const InsertEmployee = () => {

    const navigateTo = useNavigate()
    async function checkAdmin() {
        const { payload } = await jose.jwtVerify(localStorage.getItem('tokenRedux'), prKey, {
            issuer: 'issure:god',
            audience: 'example:noaud'
        })

        return payload
    }
    
    useEffect(()=>{
        checkAdmin()
         .then((data) => {
            if(data.designation !== "admin") throw new Error('invalid user')
         })
         .catch(()=>navigateTo("/"))
    }, [navigateTo])

    const dispatch = useDispatch()
    const toast = useToast()
    const formik = useFormik({
        initialValues: {
            name: "",
            salary: 0,
            designation: "",
            address: "",
            file: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            salary: Yup.number().required(),
            designation: Yup.string().required(),
            address: Yup.string().required()
        }),
        onSubmit: (values) => {
            dispatch(addEmployee(values))
            toast({
                title: 'Employee Inserted',
                description: `${values.name} is registered`,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            formik.resetForm()
        }
    })

    function inputFileProcessing(e) {
        formik.setFieldValue("file", e.currentTarget.files[0]);
    }

    return (
        <Container>
            <form id="myform" name="myform" onSubmit={formik.handleSubmit}>
                <h2>Add Employee</h2>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input isInvalid={formik.touched.name && formik.errors.name ? true : false} onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} id="name" type='name' />
                    {formik.touched.name && formik.errors.name ? (
                        <p className="text-danger">{formik.errors.name}</p>
                    ) : null}
                </FormControl>
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
                <FormControl>
                    <FormLabel>Salary</FormLabel>
                    <Input isInvalid={formik.touched.salary && formik.errors.salary ? true : false} onBlur={formik.handleBlur} value={formik.values.salary} onChange={formik.handleChange} id="salary" type='number' />
                    {formik.touched.salary && formik.errors.salary ? (
                        <p className="text-danger">{formik.errors.salary}</p>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Designation</FormLabel>
                    <Input isInvalid={formik.touched.designation && formik.errors.designation ? true : false} onBlur={formik.handleBlur} value={formik.values.designation} onChange={formik.handleChange} id="designation" type='text' />
                    {formik.touched.designation && formik.errors.designation ? (
                        <p className="text-danger">{formik.errors.designation}</p>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input isInvalid={formik.touched.address && formik.errors.address ? true : false} onBlur={formik.handleBlur} value={formik.values.address} onChange={formik.handleChange} id="address" type='text' />
                    {formik.touched.address && formik.errors.address ? (
                        <p className="text-danger">{formik.errors.address}</p>
                    ) : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Document</FormLabel>
                    <input id="file" name="file" type="file" onChange={(e)=>inputFileProcessing(e)} onBlur={formik.handleBlur} />
                    {formik.touched.file && formik.errors.file ? (
                        <p className="text-danger">{}</p>
                    ) : null}


                </FormControl>
                
                <HStack marginTop={5} spacing={'64%'} verticalAlign={'center'} justifyContent={'space-around'}>
                    <Button type="submit" colorScheme='teal' size='md'>
                        Submit
                    </Button>
                    <Link to='/displayemployees'>
                        <Button variant={'link'}>
                            See List &rarr;
                        </Button>
                    </Link>
                </HStack>

                
            </form>
        </Container>
    )
}
