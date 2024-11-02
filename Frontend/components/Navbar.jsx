import { Button, Container, Flex, HStack, Text} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useColorMode } from '../src/components/ui/color-mode';
import { LuPlusSquare } from 'react-icons/lu';
import { IoMoon, IoSunny } from 'react-icons/io5';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
        <Container maxW={"1140px"} p={4}>
            <Flex h={16} justifyContent={"space-between"} alignItems={"center"} flexDir={{base: "column", sm: "row"}} >
                <Text 
                bgGradient={"to-r"}
                bgClip={"text"}
                gradientFrom={'cyan.400'}
                gradientTo={'blue.500'}
                fontSize={{base: 22, sm: 28}}
                textTransform={"uppercase"}
                textAlign={"center"}
                fontWeight={"bold"}
                >
                    <Link to="/">Product Page 🛒</Link>
                </Text>

                <HStack alignItems={"center"} gap={2}>
                    <Link to={"/create"}>
                        <Button variant={"subtle"} colorPalette={"cyan"}>
                            <LuPlusSquare/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode} variant={"subtle"} colorPalette={"cyan"}>
                        {colorMode === "light"? <IoMoon /> : <IoSunny />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    </>
  )
}

export default Navbar