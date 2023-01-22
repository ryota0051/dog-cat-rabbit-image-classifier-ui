import React, { useState, useRef } from "react"
import axios, { AxiosError } from "axios"
import { Button } from "@chakra-ui/react"
import Header from "./components/header"
import { Box, ChakraProvider, HStack, VStack, Text } from '@chakra-ui/react'


type predictionType = {
  Dog: number
  Cat: number
  Rabbit: number
}


const DefaultPrediction: predictionType = {
  Dog: 0,
  Cat: 0,
  Rabbit: 0
}


function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imgURL, setImgURL] = useState("")
  const [prediction, setPrediction] = useState<predictionType>(DefaultPrediction)
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrediction(DefaultPrediction)
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
      setImgURL(URL.createObjectURL(files[0]))
    }
  }
  const onClickSubmit = async () => {
    if (!file) {
      return
    }
    setIsLoading(true)
    const formData = new FormData()
    formData.append("data", file)
    await axios.post("http://localhost:8080/predictions/dog_vs_cat_vs_rabbit", formData)
      .then((res) => {
        setPrediction({...res.data})
      })
      .catch((e: AxiosError) => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const onClickButton = () => {
    inputRef.current?.click()
  }
  return (
    <>
      <ChakraProvider>
        <Header title="Dog vs Cat vs Rabbit" />
          <VStack>
          <div className="img-show" style={{width: "448px"}}>
            {imgURL ? <img style={{width: "448px"}} src={imgURL}></img> : <></>}
          </div>
          <HStack spacing={4}>
            <Box>
              <input
                  ref={inputRef}
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={onChangeFile}
                  hidden
              />
              <Button colorScheme="teal" onClick={onClickButton}>select image</Button>
            </Box>
            <Box>
              <Button
                colorScheme="teal"
                isDisabled={!file}
                onClick={onClickSubmit}
                isLoading={isLoading}
              >
                send
              </Button>
            </Box>
          </HStack>
          <div>
            <Text fontSize="xl">Dog: {(prediction.Dog * 100).toFixed(1)} %</Text>
            <Text fontSize="xl">Cat: {(prediction.Cat * 100).toFixed(1)} %</Text>
            <Text fontSize="xl">Rabbit: {(prediction.Rabbit * 100).toFixed(1)} %</Text>
          </div>
        </VStack>
      </ChakraProvider>
    </>
  )
}

export default App
