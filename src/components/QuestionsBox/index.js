import { Flex, Center, Box, Text, Input, Button } from "@chakra-ui/react";
import Question from "./Question";
import InfostationDescription from "./InfostationDescription";
import {BsSearch} from "react-icons/bs"
import { useState, useContext } from "react";
import {UserContext} from "../../App"
const QuestionsBox = () => {
  const context = useContext(UserContext);
  const [searchWord,setSearchWord] = useState("")
  return (
    <Center>
    {context.userInfo.role=="doctor" &&
    <>
    <h2>SUNT UN DOCTOR</h2>
    <h2>ADAUGA SA POT DA LIKE LA COMMENT-URI SI SA ADAUG RASPUNS</h2>
    <h2>Doctorii pot sa vada toate raspunsurile</h2>
    <h2>Userii doar pe primele 3 cele mai populare</h2>
    </>
}
      <Flex
        position="relative"
        flexDirection="column"
        overflowY="auto"
        width="min(1024px,100vw)"
        height="100vh"
        boxShadow="dark-lg"
        alignItems="center"
        p={5}
      >
        <InfostationDescription />

        <Flex width="50%" m="3">
          <Input width="90%" mx="2" placeholder="Search for a question..."
          onChange={(e) => {
                  setSearchWord(e.target.value)
								}}
								value={searchWord}>
          </Input>
          <Button width="10%">
            <BsSearch />
          </Button>
        </Flex>
        {
          "Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?".includes(searchWord) &&
        <Question
          content="Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?"
          answerA={{
            content: "Raspuns Corect",
            author: "Doctor Marian",
            numberOfLikes: 20,
          }}
          answerB={{
            content: "Raspuns Corect",
            author: "Doctor Marian",
            numberOfLikes: 20,
          }}
          answerC={{
            content: "Raspuns Corect",
            author: "Doctor Marian",
            numberOfLikes: 20,
          }}
        />
        }
        {
          "Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?".includes(searchWord) &&
        
        <Question
          content="Intrebare lunga lunga lunga lunga lunga lunga lunga lunga?Intrebare lunga lunga lunga lunga lunga lunga lunga lunga"
          answerA={{
            content: "Raspuns Corect",
            author: "Doctor Marian",
            numberOfLikes: 20,
          }}
          answerB={{
            content: "Raspuns Corect Raspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns CorectRaspuns Corect",
            author: "Doctor Marian",
            numberOfLikes: 20,
          }}
          answerC={{
            content: "Raspuns Corect",
            author: "Doctor Marian",
            numberOfLikes: 20,
          }}
        />
        }
        <Flex m="5" width="70%" flexDirection="column" alignItems="center">
          <Text fontSize="lg">Submit your own question</Text>
          <Input variant="filled"></Input>
          <Button m="2" width="50%">
            Submit
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};
export default QuestionsBox;
