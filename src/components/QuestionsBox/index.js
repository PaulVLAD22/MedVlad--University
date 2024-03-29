import { Flex, Center, Box, Text, Input, Button, Select } from "@chakra-ui/react";
import Question from "./Question";
import InfostationDescription from "./InfostationDescription";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../App";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Prompt } from "react-router";

const QuestionsBox = () => {
  const context = useContext(UserContext);
  const [searchWord, setSearchWord] = useState("");
  const [questions, setQuestions] = useState([]);
  const [render, setRender] = useState(0);
  const [postQuestionResponse, setPostQuestionResponse] = useState("")
  const [postingQuestionCategory, setPostingQuestionCategory] = useState("")
  const [postingQuestion, setPostingQuestion] = useState("")
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [filterBy, setFilterBy] = useState("")

  const [formWasFocused, setFormWasFocused] = useState("")
  const [loadingMessage, setLoadingMessage] = useState("")
  const [error, setError] = useState("")

  const [symptoms,setSymptoms] = useState([])

  const [selectedSymptoms, setSelectedsymptoms] = useState([])

  //TODO:: adauga si pt admin pagina si fa buton de X ca sa stearga mesaje rapid
  // si sa se adauge la un atribut al User-ilor removed messages si la al 3-lea esti banat

  useEffect(() => {
    //console.log(context.jwt);
    const loadInfo = async () => {
      console.log("jwt:" + context.jwt)

      setLoadingMessage("loading...")

      let url1 = "/getQuestions";

      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + context.jwt,
        },
      };

      await axios({
        method: "GET",
        url: url1,
        headers: config.headers,
      }).then(
        (response) => {
          console.log(response.data)
          setQuestions(response.data);
          setError("")
        },
        async (getError) => {
          if (getError.response.status === 401) {
            console.log("SE CHEAMA REFRESH TOKEN")
            context.refreshAuthToken();
            setRender(render + 1)
          }
          else {
            setError("Unknown Error")
          }
        }
      );

      let url2 = "/getSymptoms"

      await axios({
        method: "GET",
        url: url2,
        headers: config.headers,
      }).then(
        (response) => {
          console.log(response.data)
          setSymptoms(response.data)
          setError("")
          // NU STIU DE CE NU SE SETEAZA SYMPTOS DE LA PRIMUL RENDER
          if (symptoms.length==0){
            setRender(render+1)
          }

          if (selectedSymptoms.length == 0) {
            let arrayOfZeros = []
            for (let i = 0; i < symptoms.length; i++) {
              arrayOfZeros.push(0);
            }
            setSelectedsymptoms((old)=>[...old,...arrayOfZeros])
    
          }
        },
        async (getError) => {
          if (getError.response.status === 401) {
            console.log("SE CHEAMA REFRESH TOKEN")
            context.refreshAuthToken();
            setRender(render + 1)
          }
          else {
            setError("Unknown Error")
          }
        }
      );
      setLoadingMessage("")

      
    }
    loadInfo();
  }, [render]);


  const postQuestion = async (e) => {
    e.preventDefault();
    let noSymptomsSelected = true;
    for (let i=0;i<selectedSymptoms.length;i++){
      if (selectedSymptoms[i]==1){
        noSymptomsSelected=false;
      }
    }
    if (noSymptomsSelected){
      setPostQuestionResponse("You have to choose a symptom");
      return;
    }

    if (!postingQuestion.trim() != '') {
      setPostQuestionResponse("Question must not be empty.")
      return
    }
    setPostQuestionResponse("Sending...")

    let url = "/user/postQuestion";

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + context.jwt,
      },
    };

    await axios({
      method: "POST",
      url: url,
      headers: config.headers,
      data:{content:postingQuestion, selectedSymptoms: selectedSymptoms}
    }).then(
      (response) => {
        console.log(response.data)
        setPostQuestionResponse("Question sent for verification");
      },
      async (getError) => {
        if (getError.response.status === 401) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
        }
      }
    );
    setFormWasFocused(false);
    setPostingQuestion("");
  };

  const sortChanged = (e) => {
    let id = e.nativeEvent.target.selectedIndex;
    let choice = e.nativeEvent.target[id].text;
    if (choice == "Sort by...") {
      return
    }
    setSortBy(choice);
  }

  const toggleSymptom = (e) => {

    let id = e.nativeEvent.target.selectedIndex;
    let choice = e.nativeEvent.target[id].text;
    console.log(choice)
    if (choice == "Choose Symptoms...") {
      return
    }
    console.log(selectedSymptoms)
    let indexOfSymptom = symptoms.findIndex(symptom => symptom.name == choice)

    let newArray = [...selectedSymptoms]
    newArray[indexOfSymptom] = 1 - newArray[indexOfSymptom]

    console.log(newArray)
    setSelectedsymptoms([ ...newArray ])

    const symptomsSelect = document.getElementById("symptomsSelect");
    symptomsSelect.selectedIndex = 0;
  }
  const filterChanged = (e) => {
    let id = e.nativeEvent.target.selectedIndex;
    let choice = e.nativeEvent.target[id].text;
    if (choice == "Filter by...") {
      return
    }
    if (choice == "All") {
      choice = ""
    }
    setFilterBy(choice);
  }
  const sortedQuestions = (questions) => {
    if (sortBy == "Most Popular")
      return;
    else if (sortBy == "Newest Questions") {
      return (
        questions.sort((q1, q2) => {
          return new Date(q2.postingDate).valueOf() - new Date(q1.postingDate).valueOf();
        }
        ));
    }
    else if (sortBy == "Oldest Questions") {
      return (
        questions.sort((q1, q2) => {
          return new Date(q1.postingDate).valueOf() - new Date(q2.postingDate).valueOf();
        }
        ));
    }
    else if (sortBy == "") {
      return questions;
    }
  }

  const filteredQuestions = () => {
    if (filterBy == "") {
      return questions;
    }
    return (
      questions.filter((question, index) => {
        return question.questionCategory.name == filterBy
      }));
  }

  const formFocusHandler = () => {
    setFormWasFocused(true);
  }

  return (
    <>
      {/* <Prompt when={formWasFocused}
      message={()=> 'Are you sure you want to leave? All your data will be lost!'}
      
      /> */}
      <Center>
        {console.log(context.jwt)}
        <Flex
          position="relative"
          flexDirection="column"
          overflowY="auto"
          width="min(1024px,100vw)"
          height="100%"
          boxShadow="dark-lg"
          alignItems="center"
          p={5}
        >
          <InfostationDescription />

          <Flex m="3">
            <Input
              width="90%"
              placeholder="Search for a question..."
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
              value={searchWord}
            ></Input>
            <Select mx="2" onChange={sortChanged} placeholder="Sort by...">
              {/* <option>Most Popular</option> */}
              <option>Newest Questions</option>
              <option>Oldest Questions</option>
            </Select>
            {/* <Select onChange={filterChanged} placeholder="Filter by...">
              {categories.map((category, index) => {
                return <option key={index}>{category.name}</option>
              })
              }
              <option>All</option>
            </Select> */}

          </Flex>
          <Text color="red" fontSize="large"> {error}</Text>
          {
            loadingMessage != "" ?
              <Box my="10">
                <AiOutlineLoading3Quarters fontSize="30px" />
              </Box>
              :
              filteredQuestions().length == 0 &&
              <Text my="10" fontSize="x-large">No Such Questions</Text>
          }
          {loadingMessage == "" &&
            sortedQuestions(filteredQuestions())
              .map((question, index) => {
                console.log(question)
                if (question.content.includes(searchWord))
                  return (
                    <Question
                      key={question.id}
                      id={question.id}
                      symptoms = {question.symptoms}
                      author={question.userDto}
                      content={question.content}
                      answer={question.answer}
                      reRenderPage={() => setRender(render + 1)}
                    />
                  );
              })}

          <Flex m="5" width="70%" flexDirection="column" alignItems="center">
            {context.userInfo.role == "USER" && (
              <form onSubmit={postQuestion} onFocus={formFocusHandler}>
                <Text>Submit Your Own Question</Text>
                <Input placeholder="content..." margin="2" onChange={(e) => { setPostingQuestion(e.target.value) }} value={postingQuestion}></Input>
                <Select id="symptomsSelect" m="2" onChange={toggleSymptom} placeholder="Choose Symptoms..." >
                  {symptoms.map((symptom, index) => {
                    return <option key={symptom.id} id={"option" + index} style={{ backgroundColor: selectedSymptoms[index] == 1 ? "green" : "" }}>{symptom.name}</option>
                  })
                  }
                </Select>
                <Text mb="4">{symptoms.map((symptom,index)=>{
                  return selectedSymptoms[index]==1 ? symptom.name : ""
                }).join(' ')}
                </Text>
                <Button type="submit">Submit</Button>
                <Text color="orange.500">{postQuestionResponse}</Text>
              </form>
            )}
          </Flex>
        </Flex>
      </Center>
    </>
  );
};
export default QuestionsBox;
