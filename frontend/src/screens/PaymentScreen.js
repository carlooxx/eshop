import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { paymentMethodAction } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shipAddress } = cart;

  const dispatch = useDispatch();
  if (!shipAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentMethodAction(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
