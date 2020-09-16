import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../../../css/Register.css";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.defaultRegister = {
            name: "",
            email: "",
            phone: "",
            password: ""
        };
        this.state = {
            registerData: this.defaultRegister,
            isLoading: false,
            msg: "",
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasErrorField = this.hasErrorField.bind(this);
        this.renderErrorField = this.renderErrorField.bind(this);
    }

    // unremark after test is completed
    // componentDidMount() {
    //     if (localStorage["isLoggedIn"]) {
    //         this.props.history.push("/home");
    //     }
    // }

    // update state by prop name and value
    handleFieldChange(e) {
        const { registerData } = this.state;
        registerData[e.target.name] = e.target.value;
        this.setState(registerData);
    }

    // call register api
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

        axios
            .post("/api/register", this.state.registerData)
            .then(response => {
                this.setState({ isLoading: false });
                if (response.data.success) {
                    this.props.history.push("/home");
                    // this.setState({
                    //     msg: response.data.message,
                    //     registerData: this.defaultRegister
                    // });
                } else if (response.data.errors) {
                    this.setState({
                        errors: response.data.errors,
                        msg: ""
                    });
                } else {
                    this.setState({ errors: [], msg: response.data.message });
                }
                // setTimeout(() => {
                //     this.setState({ msg: "" });
                // }, 2000);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // evaluate whether specified field has error and return a boolean
    hasErrorField(field) {
        return !!this.state.errors[field];
    }

    // call hasErrorField and if return true then render error message
    renderErrorField(field) {
        if (this.hasErrorField(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
                <Form
                    className="containers shadow"
                    onSubmit={this.handleSubmit}
                >
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            className={
                                this.hasErrorField("name") ? "is-invalid" : ""
                            }
                            type="name"
                            name="name"
                            placeholder="Enter name"
                            value={this.state.registerData.name}
                            onChange={this.handleFieldChange}
                        />
                        {this.renderErrorField("name")}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className={
                                this.hasErrorField("email") ? "is-invalid" : ""
                            }
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.registerData.email}
                            onChange={this.handleFieldChange}
                        />
                        {this.renderErrorField("email")}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            type="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={this.state.registerData.phone}
                            onChange={this.handleFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            className={
                                this.hasErrorField("password")
                                    ? "is-invalid"
                                    : ""
                            }
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.registerData.password}
                            onChange={this.handleFieldChange}
                        />
                        {this.renderErrorField("password")}
                    </FormGroup>
                    <p className="text-danger">{this.state.msg}</p>
                    <Button className="text-center mb-4" color="success">
                        Register
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm ml-5"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            <span />
                        )}
                    </Button>
                    <Link to="/login" className="text-white ml-5">
                        I'm already member
                    </Link>
                </Form>
            </div>
        );
    }
}
