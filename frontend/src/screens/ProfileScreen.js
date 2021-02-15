import React, { useState, useEffect } from "react";
import { Row, Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  userDetailsAction,
  userUpdateProfileAction,
} from "../actions/userAction";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const userLogin = useSelector((state) => state.userLogin);

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);

  const { user, error, isLoading } = userDetails;
  const { userInfo } = userLogin;
  const { success } = userProfileUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(userDetailsAction());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user.name, user.email, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(
        userUpdateProfileAction({ id: user._id, name, email, password })
      );
      dispatch(userDetailsAction());
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Sign In</h1>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col>
        <h1>MY ORDERS</h1>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
