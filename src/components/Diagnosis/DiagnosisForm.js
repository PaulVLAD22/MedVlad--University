import { Flex, Text } from '@chakra-ui/layout'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../App'
import SymptomLabel from './SymptomLabel'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import DiagnosisResult from './DiagnosisResult'

const DiagnosisForm = () => {
    const context = useContext(UserContext)
    const [symptoms, setSymptoms] = useState([])
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [error, setError] = useState("")
    const [render, setRender] = useState(0)
    const [searchWord, setSearchWord] = useState("")
    const [diagnosisResult, setDiagnosisResult] = useState([])



    useEffect(() => {
        const loadSymptoms = async () => {
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + context.jwt,
                },
            };

            let url2 = "/getSymptoms"

            await axios({
                method: "GET",
                url: url2,
                headers: config.headers,
            }).then(
                (response) => {
                    console.log(response.data)
                    setSymptoms(response.data.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    }))
                    setError("")
                    // NU STIU DE CE NU SE SETEAZA SYMPTOS DE LA PRIMUL RENDER
                    if (symptoms.length == 0) {
                        setRender(render + 1)
                    }

                    if (selectedSymptoms.length == 0) {
                        let arrayOfZeros = []
                        for (let i = 0; i < symptoms.length; i++) {
                            arrayOfZeros.push(0);
                        }
                        setSelectedSymptoms((old) => [...arrayOfZeros])
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
        }
        loadSymptoms();


    }, [render])

    const selectSymptom = (index) => {
        console.log(index)
        const newArray = [...selectedSymptoms]
        newArray[index] = 1 - newArray[index];
        setSelectedSymptoms([...newArray])
    }
    const resetSelectedSymptoms = () =>{
        let arrayOfZeros = []
                        for (let i = 0; i < symptoms.length; i++) {
                            arrayOfZeros.push(0);
                        }
                        setSelectedSymptoms((old) => [...arrayOfZeros])
    }
    const calculateCondition = async () => {
        let url = "/user/calculateDiagnosis"

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
            data:{selectedSymptoms},
        }).then(
            (response) => {
                console.log(response.data)
                setDiagnosisResult(response.data)
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
    }

    return (
        <Flex width="min(1024px,100%)" height="60%" boxShadow="dark-lg" p="10" flexDir="column" alignItems="center" >
            <Flex width="100%" position="relative" justifyContent="space-between" className="responsive-flex" height="60%" >
                <Flex flexDir="column" height="400px" overflowY="auto">
                    <Text m="3" fontSize="lg" letterSpacing="wide" fontWeight="500">Select your Symptoms</Text>
                    <Input value={searchWord} onChange={(e) => { setSearchWord(e.target.value) }} mb="3"></Input>
                    {console.log(selectedSymptoms)}
                    {symptoms.map((symptom, index) => {
                        if (symptom.name.includes(searchWord))
                            return <SymptomLabel selectSymptom={() => { selectSymptom(index) }} key={symptom.id} name={symptom.name} selected={selectedSymptoms[index] == 1} />
                    })}
                </Flex>
                {selectedSymptoms.indexOf(1) != -1 &&
                    <Flex flexDir="column" height="100%" p="2" overflowY="auto">
                        {symptoms.map((symptom, index) => {
                            return selectedSymptoms[index] == 1 ?
                                <SymptomLabel key={symptom.id} name={symptom.name} selected={false} /> :
                                null
                        })}
                    </Flex>
                }
            </Flex>
            <Button width="30%" onClick={resetSelectedSymptoms} mb="3"> Reset Symptomps</Button>
            <Button width="30%" onClick={calculateCondition}> Calculate Condition</Button>
            <DiagnosisResult diagnosisResult={diagnosisResult} />
        </Flex>
    )
}

export default DiagnosisForm
