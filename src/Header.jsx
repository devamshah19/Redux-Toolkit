import { Link } from 'react-router-dom';
import { Text, Spacer, HStack, Box } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { LoggedInStatus } from './redux-toolkit/ReducerMain';

const Header = () => {

    
    const loginstatus = useSelector(LoggedInStatus)
    return(
        <Box>
            <HStack>
                <Link to='/employeeinfo'><Text fontSize='50px' ml='20px'>Employee Portal</Text></Link>
                <Spacer />
                { 
                    loginstatus && <Link id='Logout' to='/employeelogout'>
                        <Text fontSize='20px' mr='20px' ml='20px'>Logout</Text>
                    </Link>
                }
            </HStack>
        </Box>
    );
}

export default Header;