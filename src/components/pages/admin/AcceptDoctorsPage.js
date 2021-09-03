import { Center } from "@chakra-ui/react"
import DoctorRequest from "./adminRequests/DoctorRequest"
const AcceptDoctorsPage = () => {
    return (
        <Center width="100%" height="80%">
            <DoctorRequest 
            imgLink="https://media.istockphoto.com/vectors/female-asian-doctor-id-card-templatemedical-identity-badge-with-vector-id1141608383?k=20&m=1141608383&s=612x612&w=0&h=6xls_f7xY40UtP7jM7yYUiMNU1zid85x21mrMeUwHDI="
            name="Marian Algeria"
            nationality="Roman"
            hospital="Elias"
            profession="Dentist" ></DoctorRequest>
        </Center>
    )
}
export default AcceptDoctorsPage