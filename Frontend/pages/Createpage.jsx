import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { useColorModeValue } from '../src/components/ui/color-mode'
import { useProductStore } from '../src/store/product'
import { Toaster, toaster } from "../src/components/ui/toaster"

const Createpage = () => {
  const [ newProduct, setNewProduct ] = useState({
    name: "",
    price: "",
    image: ""
  })

  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct)
    if (success) {
      toaster.create({
        title: "Product Created Successfully",
        type: "success",
        action: {label: "X"},
        duration: 3000
      })
    }
    else {
      toaster.create({
        title: "Error Creating Product",
        type: "error",
        action: {label: "X"},
        duration: 3000
      })
    }
    
    setNewProduct({name: "", price: "", image: ""})
  }

  return (
    <Container maxW={"xl"}>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.600")}
          p={6} rounded={"lg"} boxShadow={"md"}
        >
          <VStack gap={4}>
            <Input
              placeholder={"Product Name"}
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder={"Price"}
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder={"Image URL"}
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorPalette={"blue"} variant={"subtle"} w={"full"} onClick={handleAddProduct}>Create Product</Button>
            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Createpage