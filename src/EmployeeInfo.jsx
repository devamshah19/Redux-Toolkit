import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  StackDivider,
  Stack,
  Box,
  Text,
  Container,
  Avatar,
  HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as jose from 'jose'
import { prKey } from "./Keys";

const EmployeeInfo = () => {

    const [state, setState] = useState()
    const navigateTo = useNavigate()
    
    async function checkUser() {
        const { payload } = await jose.jwtVerify(localStorage.getItem('tokenRedux'), prKey, {
            issuer: 'issure:god',
            audience: 'example:noaud'
        })

        return payload
    }
    
    useEffect(()=>{
        checkUser()
         .then(data => setState(data))
         .catch(()=>navigateTo("/"))
    }, [navigateTo])

  return (
    <Container marginTop={'5%'}>
        <Card contentEditable={false}>
        <HStack marginLeft={'5'}>
            <Avatar src={state?.avatar} size={'lg'} />
            <CardHeader>
                <Heading size="md">{state?.name}</Heading>
            </CardHeader>
        </HStack>

        <CardBody marginLeft={5}>
            <Stack divider={<StackDivider />} spacing="4">
            <Box>
                <Heading size="xs" textTransform="uppercase">
                Email
                </Heading>
                <Text pt="2" fontSize="sm">
                    { state?.email }
                </Text>
            </Box>
            <Box>
                <Heading size={"sm"} textTransform="uppercase">
                Salary
                </Heading>
                <Text pt="2" fontSize="sm">
                    $ {state?.salary}
                </Text>
            </Box>
            <Box>
                <Heading size="xs" textTransform="uppercase">
                Address
                </Heading>
                <Text pt="2" fontSize="sm">
                    { state?.address }
                </Text>
            </Box>
            <Box>
                <Heading size="xs" textTransform="uppercase">
                Designation
                </Heading>
                <Text pt="2" fontSize="sm">
                    { state?.designation }
                </Text>
            </Box>
            <Box>
                <Heading size="xs" textTransform="uppercase">
                Description
                </Heading>
                <Text pt="2" fontSize="sm">
                    { state?.description }
                </Text>
            </Box>
            </Stack>
        </CardBody>
        </Card>
    </Container>
  );
};

export default EmployeeInfo;
