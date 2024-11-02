import { Box, Heading, HStack, IconButton, Image, Text, Button, VStack, Input, Spinner } from '@chakra-ui/react'
import { Toaster, toaster } from "../src/components/ui/toaster"
import { useColorModeValue } from '../src/components/ui/color-mode'
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogRoot,
    DialogTrigger,
  } from "../src/components/ui/dialog"
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import React, { useState } from 'react'
import { useProductStore } from '../src/store/product'

const Productcard = ({ product }) => {
    const textcolor = useColorModeValue("gray.600", "grey.200");
    const bg = useColorModeValue("gray.100", "gray.800");
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const { deleteProduct, updateProduct } = useProductStore();

    const handleUpdateProduct = async (id, updatedProduct) => {
        const res = await updateProduct(id, updatedProduct);
        if (res.success) {
            toaster.create({
                title: "Product Updated Successfully",
                type: "success",
            });
        }
        else {
            toaster.create({ title: "Error Updating Product", type: "error" });
        }
    }

    const handleDeleteProduct = async (id) => {
        const res = await deleteProduct(id);
        if (res.success) {
            toaster.create({
                title: "Product Deleted Successfully",
                type: "success"
            });
        }
        else {
            toaster.create({ title: "Error Deleting Product", type: "error" });
        }
    }


    return (
        <>
            <Box
                shadow={"lg"}
                rounded={"lg"}
                overflow={"hidden"}
                transition={"all 0.3s"}
                _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
                w={"sm"}
                bg={bg}
            >
                <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
                <Box p={4}>
                    <Heading as={"h3"} size={"md"} mb={2}>
                        {product.name}
                    </Heading>
                    <Text fontWeight={"bold"} fontSize={"xl"} color={textcolor} mb={4}>
                        ${product.price}
                    </Text>
                    <HStack gap={2}>
                        <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
                            <DialogTrigger asChild>
                                <IconButton colorPalette={"blue"} variant={"subtle"}>
                                    <FaEdit />
                                </IconButton>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                </DialogHeader>
                                <DialogBody>
                                    <VStack gap={4}>
                                        <Input 
                                            placeholder='product name'
                                            name='name'
                                            value={updatedProduct.name}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                        />
                                        <Input 
                                            placeholder='price'
                                            name='price'
                                            value={updatedProduct.price}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                        />
                                        <Input 
                                            placeholder='image URL'
                                            name='image'
                                            value={updatedProduct.image}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                        />
                                    </VStack>
                                </DialogBody>
                                <DialogFooter>
                                    <DialogActionTrigger asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogActionTrigger>
                                    <DialogActionTrigger asChild>
                                        <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                                    </DialogActionTrigger>
                                </DialogFooter>
                                <DialogCloseTrigger />
                            </DialogContent>
                        </DialogRoot>
                        <IconButton colorPalette={"red"} variant={"subtle"} onClick={() => handleDeleteProduct(product._id)}>
                            <MdDelete />
                        </IconButton>
                    </HStack>
                </Box>
                <Toaster />
            </Box>
        </>
    )
}

export default Productcard
