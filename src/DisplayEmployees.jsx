import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { dropEmployee, fetchEmployee, editEmployee, StoreEmp, StoreStatus, StoreError } from "./redux-toolkit/ReducerMain";
import { MdDelete, MdDownload, MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr, Th, Td,
  ButtonGroup,
  TableContainer,
  Input, Spinner, Text, HStack, Center, useDisclosure,
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, AlertDialogFooter
} from "@chakra-ui/react";
import { IoPersonAdd } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';
import * as jose from 'jose';
import { prKey } from './Keys';


export const DisplayEmployees = () => {

    const dispatch = useDispatch()
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

    useEffect(()=>{
      if(StoreStatus==='idle') dispatch(fetchEmployee())
    },[])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ editableId, setEditableId ] = useState(-1)
  const [ isEditable, setIsEditable ] = useState(false)
  const [ editValue, setEditValue ] = useState({
    name: "",
    email: "",
    password: "",
    salary: 0,
    designation: "",
    address: "",
    file: "",
    fileName: "",
    role: ""
  })

  const curStore = useSelector(StoreEmp)
  const status = useSelector(StoreStatus)
  const error = useSelector(StoreError)

  function setOldValues(old) {
    setEditValue(old)
    setEditableId(old.id)  
    setIsEditable(true)
  }

  const url = 'https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee/'
  async function syncToDatabaseManually() {
    const getRes=await axios.get(url)
    console.log(getRes.data)
    getRes.data.map(async (i) => {
      await axios.delete(url+i.id)
    })
    
    curStore.map( async (i)=>{
      axios.post(url,i)
    })

    
  }

  return (
    <div>
      <HStack  margin={10}>
        <Link to='/'>
          <IoMdArrowRoundBack size={35} />
        </Link>
        <h2>Employee Records</h2>
        <Link to='/insertemployee'><Button><IoPersonAdd /></Button></Link>
      </HStack>

      {status === 'failed' && <p className="alert alert-danger">{error}</p>}
      <TableContainer border={1}>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign={'center'} fontSize={'20px'}>Name</Th>
              <Th textAlign={'center'} fontSize={'20px'}>Email</Th>
              <Th textAlign={'center'} fontSize={'20px'}>Password</Th>
              <Th textAlign={'center'} fontSize={'20px'}>Salary</Th>
              <Th textAlign={'center'} fontSize={'20px'}>Designation</Th>
              <Th textAlign={'center'} fontSize={'20px'}>Address</Th>
              <Th textAlign={'center'} fontSize={'20px'}>File</Th>
              <Th textAlign={'center'} fontSize={'20px'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {curStore.map(function (item) {
              return (
                <Tr key={item.id}>
                  { isEditable && item.id === editableId ? <Td textAlign={'center'}><Input type='text' value={editValue.name} onChange={(e)=>{setEditValue({...editValue,name: e.target.value})  }}></Input></Td> : <Td textAlign={'center'}>{item.name}</Td> }
                  { isEditable && item.id === editableId ? <Td textAlign={'center'}><Input type='email' value={editValue.email} onChange={(e)=>{setEditValue({...editValue,email: e.target.value})  }}></Input></Td> : <Td textAlign={'center'}>{item.email}</Td> }
                  { isEditable && item.id === editableId ? <Td textAlign={'center'}><Input type='text' value={editValue.password} onChange={(e)=>{setEditValue({...editValue,password: e.target.value})  }}></Input></Td> : <Td textAlign={'center'}>{item.password}</Td> }
                  { isEditable && item.id === editableId ? <Td textAlign={'center'}><Input type='number' value={editValue.salary} onChange={(e)=>{setEditValue({...editValue,salary: e.target.value})}}></Input></Td> : <Td textAlign={'center'}>{item.salary}</Td> }
                  { isEditable && item.id === editableId ? <Td textAlign={'center'}><Input type='text' value={editValue.designation} onChange={(e)=>{setEditValue({...editValue,designation: e.target.value})}}></Input></Td> : <Td textAlign={'center'}>{item.designation}</Td> }
                  { isEditable && item.id === editableId ? <Td textAlign={'center'}><Input type='text' value={editValue.address} onChange={(e)=>{setEditValue({...editValue,address: e.target.value})}}></Input></Td> : <Td textAlign={'center'}> {item.address}</Td> }                  
                  { isEditable && item.id === editableId ? <Td textAlign={'center'}>{editValue.fileName}<label style={{marginLeft:'10px'}} htmlFor='changeFile' className="btn btn-outline-primary"><FiUpload /></label><input style={{zIndex:'-1',opacity:'0',position:'absolute'}} id='changeFile' type='file' onChange={(e)=>{setEditValue({...editValue, fileName: e.currentTarget.files[0].name, file: URL.createObjectURL(e.currentTarget.files[0])})}}/></Td> : <Td textAlign={'center'}> {item.fileName || `none`}</Td> }
                  
                  <Td textAlign={'center'}>
                  {/* save and edit & delete button group */}
                  {
                    isEditable && editableId === item.id?
                      <Button
                      colorScheme="green"
                      variant={"outline"}
                      onClick={() => {  
                        setIsEditable(false)
                        dispatch(editEmployee(editValue))
                      }}>Save
                    </Button>
                    : <ButtonGroup size="sm" isAttached variant="outline">
                        <Button
                          colorScheme="green"
                          onClick={() => { 
                            setOldValues(item)
                          }}>
                          <MdEdit size={20} />
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={()=>{
                            dispatch(dropEmployee(item.id))
                          }}>
                          {" "}
                          <MdDelete size={20} />
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={()=>{
                            
                          }}>
                          {" "}
                          <a href={item.file} download>
                            <MdDownload size={20} />
                          </a>
                        </Button>
                      </ButtonGroup>
                  }
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Text textAlign={'center'}>{status === 'loading' && <Spinner margin={5} color='red.500' />}</Text>
        <Center><HStack spacing={10} alignContent={'centre'}>
        <Button onClick={onOpen}>Fetch</Button>
        <Button onClick={syncToDatabaseManually}>Sync</Button>
        </HStack></Center>
      </TableContainer>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Fetch from database ?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? Your may loose your local store. Sync to save current state.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{dispatch(fetchEmployee()); onClose()}} ml={3}>
                Fetch
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};
