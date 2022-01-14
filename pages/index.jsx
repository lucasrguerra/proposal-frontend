'use strict';

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
const axios = require('axios');

export default function home() {
  var [proponent, setProponent] = useState('');
  var [proposed, setProposed] = useState('');
  var [proponentEmail, setProponentEmail] = useState('');
  var [type, setType] = useState(false);

  async function submit() {
    let bodyFormData = new FormData();

    bodyFormData.append('proponent', proponent);
    bodyFormData.append('proposed', proposed);
    bodyFormData.append('proponentEmail', proponentEmail);
    bodyFormData.append('type', type);

    await axios({
      method: "post",
      url: `http://35.208.220.109/create`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
      alert('Perfeito (^-^)\n\nAgora confira o seu e-mail!');
    })
    .catch(function (response) {
      alert('Confira as informações e tente novamente');
    });
  };

  return <center className='h-screen font-sans'>
    <h1 className='text-2xl font-semibold mt-16'>Crie um pedido</h1>
    <br />
    <form onSubmit={(event) => {event.preventDefault()}} action="" className='p-4 bg-teal-200 mx-8 rounded-xl shadow-2xl md:w-3/5 lg:w-2/5'>
      <div>
        <label htmlFor="proponent" className='font-semibold'>
          Seu nome:
        </label><br />
        <input
          className='rounded pl-2 w-4/5'
          type="text"
          name="proponent"
          id="proponent"
          placeholder='Lorem Ipsum Dolor'
          onChange={(event) => {setProponent(event.target.value)}}
        />
      </div>

      <br />

      <div>
        <label htmlFor="proposed"  className='font-semibold'>
          Nome da pessoa:
        </label><br />
        <input
          className='rounded pl-2 w-4/5'
          type="text"
          name="proposed"
          id="proposed"
          placeholder='Dolor Ipsum Lorem'
          onChange={(event) => {setProposed(event.target.value)}}
        />
      </div>

      <br />

      <div>
        <label htmlFor="proponentEmail"  className='font-semibold'>
          Seu e-mail:
        </label><br />
        <input
          className='rounded pl-2 w-4/5'
          type="email"
          name="proponentEmail"
          id="proponentEmail"
          placeholder='Dolor Ipsum Lorem'
          onChange={(event) => {
            if(event.target.checkValidity()) {setProponentEmail(event.target.value)}
            else {setProponentEmail('')};
          }}
        />
      </div>

      <br />

      <div>
        <label htmlFor="type"  className='font-semibold'>
          Tipo do pedido:
        </label><br />
        <select
          name="type"
          id="type"
          className='w-4/5 rounded pl-2'
          onChange={(event) => {setType(event.target.value)}}
        > 
          <option defaultValue value={false}></option>
          <option value={1}>Casamento</option>
          <option value={2}>Namoro</option>
        </select>
      </div>

      <br />

      <button
        className='rounded-lg px-6 py-2 text-2xl shadow-xl bg-white hover:text-white hover:bg-blue-400'
        onClick={async () => {
          if(proponent != '') {
            if(proposed != '') {
              if(proponentEmail) {
                if(type) {
                  await submit();
                } else {alert('Por favor, escolha um tipo de pedido')};
              } else {alert('Por favor, preencha o terceiro campo com o seu e-mail válido')};
            } else {alert('Por favor, preencha o segundo campo com o nome da pessoa')};
          } else {alert('Por favor, preencha o primeiro campo com o seu nome')};
        }}
      >
        Enviar
      </button>
    </form>
  </center>
}