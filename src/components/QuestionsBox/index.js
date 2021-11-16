import { Flex, Center, Box, Text, Input, Button, Select } from "@chakra-ui/react";
import Question from "./Question";
import InfostationDescription from "./InfostationDescription";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
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

  //TODO:: adauga si pt admin pagina si fa buton de X ca sa stearga mesaje rapid
  // si sa se adauge la un atribut al User-ilor removed messages si la al 3-lea esti banat

  useEffect(async () => {
    //console.log(context.jwt);
    console.log("jwt:" + context.jwt)
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
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
        }
      }
    );

    let url2 = "/getCategories"

    await axios({
      method: "GET",
      url: url2,
      headers: config.headers,
    }).then(
      (response) => {
        console.log(response.data)
        setCategories(response.data)
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
        }
      }
    );


  }, [render]);

  const postQuestion = async (e) => {
    e.preventDefault();

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
      params: { "content": postingQuestion, "category": postingQuestionCategory }
    }).then(
      (response) => {
        console.log(response.data)
        setPostQuestionResponse("Question sent for verification");
      },
      async (getError) => {
        if (getError.response.status === 403) {
          console.log("SE CHEAMA REFRESH TOKEN")
          context.refreshAuthToken();
        }
      }
    );
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

  const changeCategory = (e) => {
    let id = e.nativeEvent.target.selectedIndex;
    let choice = e.nativeEvent.target[id].text;
    if (choice == "Choose category...") {
      return
    }
    setPostingQuestionCategory(choice);
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
      return (
        questions.sort((q1, q2) => {
          return (q2.questionAnswerList.reduce((a, b) => {
            return a + b.numberOfLikes
          }, 0)) - (q1.questionAnswerList.reduce((a, b) => {
            return a + b.numberOfLikes
          }, 0))
        }
        ));
    else if (sortBy == "Newest Questions") {
      return (
        questions.sort((q1, q2) => {
          return new Date(q2.postingDate).valueOf() - new Date(q1.postingDate).valueOf();
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


  return (

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
            <option>Most Popular</option>
            <option>Newest Questions</option>
          </Select>
          <Select onChange={filterChanged} placeholder="Filter by...">
            {categories.map((category, index) => {
              return <option key={index}>{category.name}</option>
            })
            }
            <option>All</option>
          </Select>

        </Flex>
        {
          filteredQuestions().length==0 && 
          <Text my="10" fontSize="x-large" color="red">No Such Questions</Text>
        }
        {
          sortedQuestions(filteredQuestions())
            .map((question, index) => {
              console.log(question)
              if (question.content.includes(searchWord))
                return (
                  <Question
                    key={index}
                    id={question.id}
                    author={question.userDto}
                    content={question.content}
                    answers={question.questionAnswerList}
                    reRenderPage={() => setRender(render + 1)}
                  />
                );
            })}

        <Flex m="5" width="70%" flexDirection="column" alignItems="center">
          {context.userInfo.role == "USER" && (
            <form onSubmit={postQuestion}>
              <Text>Submit Your Own Question</Text>
              <Input placeholder="content..." margin="2" onChange={(e) => { setPostingQuestion(e.target.value) }} value={postingQuestion}></Input>
              <Select m="2" mb="5" onChange={changeCategory} placeholder="Choose category...">
                {categories.map((category, index) => {
                  return <option key={index}>{category.name}</option>
                })
                }
              </Select>
              <Button type="submit">Submit</Button>
              <Text color="orange.500">{postQuestionResponse}</Text>
            </form>
          )}
        </Flex>
      </Flex>
    </Center>
    //TODO:: FA CA DIN BACK END SA PRIMESC DOAR CELE MAI BUNE RASPUINSURI SI SA FIE ORDONATE BINE,
  );
};
export default QuestionsBox;
