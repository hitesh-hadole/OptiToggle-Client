import { React, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import Base from "../../components/Base";
import AdminNav from "../../components/AdminNav";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { getCurrentUser } from "../../auth";
import { updateUser } from "../../services/user-service";
import { BiSolidUser } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
function ProfileInfo() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    emailid: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  useEffect(() => {
    setData(getCurrentUser());
  }, []);

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();
    updateUser(data, data.userid)
      .then((resp) => {
        toast.success("User updated successfully !");
        setData({
          firstName: "",
          lastName: "",
          emailid: "",
          password: "",
        });
        navigate("/user/user-management");
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <AdminNav />
      <Container>
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h6>
                  User Profile <CgProfile size={25} />
                </h6>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <h6>
                      <BiSolidUser size={27} /> User Id {data.userid}
                    </h6>
                    <Label for="firstName" className="mt-2">
                      <FaRegUser size={25} /> Enter first name*
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      id="firstName"
                      onChange={(e) => handleChange(e, "firstName")}
                      value={data.firstName}
                      invalid={
                        error.errors?.response?.data?.lastName ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.firstName}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="lastName">
                      <FaRegUser size={25} /> Enter last name*
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      id="lastName"
                      onChange={(e) => handleChange(e, "lastName")}
                      value={data.lastName}
                      invalid={
                        error.errors?.response?.data?.lastName ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.lastName}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="emailid">
                      <MdEmail size={25} /> Enter email address*
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      id="emailid"
                      onChange={(e) => handleChange(e, "emailid")}
                      value={data.emailid}
                      invalid={
                        error.errors?.response?.data?.emailid ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.emailid}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">
                      <RiLockPasswordFill size={25} /> Enter new password*
                    </Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center mt-5">
                    <Button color="light" outline>
                      Update Profile
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default ProfileInfo;
