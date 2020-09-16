import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            msg: "",
            isLoading: false,
            // redirect: false,
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // unremark after test is completed
    // componentDidMount() {
    //     if (localStorage["isLoggedIn"]) {
    //         this.props.history.push("/home");
    //     }
    // }

    // update state by prop name and value
    handleFieldChange(e) {
        let data = {};
        data[e.target.name] = e.target.value;
        this.setState(data);
    }

    // call login api
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ isLoading: true });

        axios
            .post("/api/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(response => {
                this.setState({ isLoading: false });
                if (response.data.success) {
                    localStorage["isLoggedIn"] = true;
                    localStorage["userData"] = JSON.stringify(
                        response.data.data
                    );
                    this.props.history.push("/home");
                    // this.setState({
                    //     msg: response.data.message,
                    //     redirect: true
                    // });
                } else if (response.data.errors) {
                    this.setState({
                        errors: response.data.errors,
                        msg: ""
                    });
                } else {
                    this.setState({
                        errors: [],
                        msg: response.data.message
                    });
                    // setTimeout(() => {
                    //     this.setState({ msg: "" }), 10000;
                    // });
                }
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
                <Form className="containers" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className={
                                this.hasErrorField("email") ? "is-invalid" : ""
                            }
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleFieldChange}
                        />
                        {this.renderErrorField("email")}
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
                            value={this.state.password}
                            onChange={this.handleFieldChange}
                        />
                        {this.renderErrorField("password")}
                    </FormGroup>
                    <p className="text-danger">{this.state.msg}</p>
                    <Button className="text-center mb-4" color="success">
                        Login
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm ml-5"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <span></span>
                        )}
                    </Button>
                </Form>
            </div>
        );
    }
}
