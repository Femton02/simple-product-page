import React, { useEffect, useState } from 'react'
import { Container, VStack, Text, SimpleGrid, Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../src/store/product'
import Productcard from '../components/Productcard'

const Homepage = () => {

  const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

  if (!products) {
    return <Spinner size="xl" color="blue.500" padding={20} />;
}
  
  return (
    <Container maxW={"max"} py={12}>
      <VStack gap={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={10}
          w={"full"}
          justifyItems={"center"}
        >
          {
            products.map((product) => (
              <Productcard key={product._id} product={product} />
            )
          )}
        </SimpleGrid>

        { products.length === 0 && (
          <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          color={"gray.500"}
          textAlign={"center"}
        >
          No Products Found ! {" "}
          <Link to="/create">
            <Text as="span" color={"blue.500"} _hover={{textDecoration: "underline"}}>
              Create a new Product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage