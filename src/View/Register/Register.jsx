import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from '@restart/ui/esm/Button';
import loginImg from "../../assets/img/loginIcon.png";
import logo from "../../assets/img/Imagen3.svg";
import { urlRequest } from '../../urlRequest';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Register.css';
import useru from "../../assets/img/user.png";
import emailu from "../../assets/img/email.png";
import passwordu from "../../assets/img/forgot.png";
import repeat from "../../assets/img/repeat.png";
import uc from "../../assets/img/userchange.png";
import idc from "../../assets/img/id.png";

//new
// import Select from "react-select";


function Register() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [error2, setError2] = useState("");

  const [name, setName] = useState("");

  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  const [validationPassword, setValidationPassword] = useState("");
  const [error5, setError5] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error6, setError6] = useState("");

  const [document_number, setIdValue] = useState('');
  const [error7, setError7] = useState("");


  const options = [
    // { value: "opcion1", label: "" },
    { value: "opcion2", label: "Natural" },
    { value: "opcion3", label: "Compañia" }
  ];




  const history = useHistory();
  const validateInputs = {
    name: false,
    email: false,
    password: false,
    document_number: false
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    // if (name === "") {
      if (name && /^[A-Za-z]+$/.test(name)){
      setError3("");
    } else {
      setError3("*Campo de nombre");

    }
    setName(newName);
  };

  const handleIdChange = (e) => {
    const newID = e.target.value;
    setIdValue(newID);
  };



  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("*Correo no valido");
    } else {
      setError("");
    }
    setEmail(newEmail);
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (password.length < 7) {
      if (regex.test(password)) {
      setError6("");
    } else {
      setError6("*Campo Mayus,Letras,Numeros");
    }

    setPassword(newPassword);;

  };

  const handleValidationPasswordChange = (e) => {
    e.preventDefault();
    const newvalidationPassword = e.target.value;
    if (password !== newvalidationPassword) {
      setError5('*Contraseñas no coinciden');

    } else {
      setError5("");
    }
    setValidationPassword(newvalidationPassword);
  };



  function handleInputChange(selectedOption) {

    setSelectedOption(selectedOption);

  }




  const customStyles = {
    control: (base) => ({
      ...base,

      border: '1px solid #2888FF',
      borderRadius: '30px',
      fontsize: '16px',
      width: '400px',
      height: '50px',
      flex: '1',
      dispose: 'flex',
      fontsize: '16px',
      padding: '0.5rem 0.5rem 0.5rem 0.8rem',
      backgroundcolor: 'White',
      outline: 'none',
      right: '20px',
      textalign: 'center',


    }),
    menu: (provided) => ({
      ...provided,
      fontsize: '16px',
      padding: '0.5rem 0.5rem 0.5rem 0.8rem',
      outline: 'none',
      border: '1px solid #2888FF',
      borderRadius: '30px',
      fontsize: '16px',
      width: '400px',



    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: '30px',
    }),
    option: (provided) => ({
      ...provided,
      borderRadius: '30px',
    }),



  };




  //mensajes de error condiciones
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      document_number: document_number,
      email: email,
      password: password,

    };
    if (name && document_number && email && password) {
      axios.post(`${urlRequest}/register`, data)
        .then(response => {
          console.log(response);
          if (response.status === 201) {
            history.push('/');
          }

        })
        .catch(error => {
          console.log(error);
        });

    } else {
      setError2("Error ejecutamiento");

    }
  };

  // const onSubmit = () => {
  //   setSubmit(true);
  //   if (!validate()) {
  //     axios.post(`${urlRequest}/register`, register)
  //       .then(function (response) {
  //         if (response.status === 201) {
  //           Swal.fire({
  //             title: '¡Registro exitoso!',
  //             text: 'Se ha creado tu perfil',
  //             icon: 'success',
  //             confirmButtonText: "Continuar",
  //             confirmButtonColor: 'rgb(40, 136, 255)',
  //           }).then(resultado => {
  //             history.push('/home');
  //           });
  //         } else {
  //           Swal.fire({
  //             title: '¡Error!',
  //             text: 'Se ha generado un error al crear tu perfil',
  //             icon: 'error',
  //             confirmButtonText: "Continuar",
  //             confirmButtonColor: 'rgb(255, 146, 158)',
  //           });
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });

  //   }

  return (
    <Container className="full-width">

      <Row className="h-100-vh align-items-center">
        <Col className="d-none-mobile">
          <img src={loginImg} alt="Imagen ingreso" className="image-size" />
        </Col>
        <Col className="col-height">
          <Card className="panel-white">
            <Card.Body>

              <Card.Title className="panel-white-title">Registrate</Card.Title>

              <form onSubmit={handleSubmit}>
                <div className="flex-inputs last-input-marginRegister">
                  <img src={useru} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {error3 && <span className="text-validate">{error3}</span>}
                </div>

                <div className="flex-inputs last-input-marginRegister">
                  <img src={idc} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="number"
                    placeholder="Ingrese su numero de documento"
                    name="document_number"
                    value={document_number}
                    onChange={handleIdChange}
                  />

                </div>

                <div className="flex-inputs last-input-marginRegister">
                  <img src={emailu} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="text"
                    placeholder="Ingrese su correo electronico"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {error && <span className="text-validate">{error}</span>}
                </div>

                <div className="flex-inputs last-input-marginRegister">
                  <img src={passwordu} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {error6 && <span className="text-validate">{error6}</span>}
                </div>

                <div className="flex-inputs last-input-marginRegister">
                  <img src={repeat} alt="Imagen ingreso" className="input-icon" />
                  <input
                    className="input"
                    type="password"
                    placeholder="Ingrese nuevamente su contraseña"
                    name="validationPassword"
                    value={validationPassword}
                    onChange={handleValidationPasswordChange}
                  />
                  {error5 && <span className="text-validate">{error5}</span>}
                </div>

                <div className="flex-inputSelect4 last-input-marginRegister" >
                  <img src={useru} alt="Imagen ingreso" className="input-iconu" />

                  <select className="inputSelect">
                    <option value="option1">Seleccione la categoria</option>
                    <option value="1">Natural</option>
                    <option value="2">Empresa</option>
                    {/* onChange={handleInputChange} */}
                  </select>
                  {/* <Select
                    value={selectedOption}
                    onChange={handleInputChange}
                    options={options}
                    styles={customStyles}
                  /> */}
                  {error4 && <span className="text-validate">{error4}</span>}
                </div>

                <Button type="submit" variant="REGISTRARSE" className="button-red1 last-input-marginRegister" onClick={handleSubmit}>REGISTRARSE</Button>
                <p className="login__without-account" >Si tienes una cuenta <a href='/'>inicia sesión aquí</a></p>

              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default Register;