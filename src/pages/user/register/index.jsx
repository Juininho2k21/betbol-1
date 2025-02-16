import Head from 'next/head'
import InputMask from "react-input-mask"
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import { getSession, } from 'next-auth/client'
import axios from 'axios'
import getUser from '../../../utills/getUser'
import { useRouter } from 'next/router'
import LayoutUser from '../../../components/layouts/user'
import { ToastContainer, toast } from 'react-toastify';

export default function register(props) {
  const [popularForm, setPopularForm] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const router = useRouter()
  const [getStateRegister, setStateRegister] = useState({
    name: "",
    lastname: "",
    tel: "",
    cpf: "",
    cep: "",
    andress: "",
    numhouse: "",
  })

  useEffect(() => {
    setPopularForm(true)
    setValue('cep', getStateRegister.cep)
    if (props.profile) {
      setStateRegister(props.profile)
    }
  })
  const getAndress = async (data) => {
    const cep = data.target.value.replace(/\D/g, '')
    if (cep.length == 8) {
      const andress = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      if (andress.data.erro == true) {
        data.target.value = null
        data.target.blur()
        return
      }
      const duplicateDataDefault = { ...getStateRegister }
      duplicateDataDefault.andress = andress.data
      duplicateDataDefault.cep = cep
      setStateRegister(duplicateDataDefault)
    }
  }

  const onSubmit = async data => {
    const sendData = await axios.post('/api/register', { data })
    if (sendData.status == 203) {
      toast.success("Dados atualizados com sucesso!",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
      router.push('/')
    }
  }
  const FormRegister = () => {
    if (popularForm) {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="text-sm font-semibold text-gray-700 tracking-wide">Insira seu E-mail</div>
            email: {props.session.user.email}
          </div>
          <div>
            <div className="mt-2 text-sm font-semibold text-gray-700 tracking-wide">Nome</div>
            <input
              {...register('name', { required: true })}
              name="name"
              type="text"
              placeholder="Mike"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.name}
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 tracking-wide">Sobrenome</div>
            <input
              {...register('lastname', { required: true })}
              name="lastname"
              type="text"
              placeholder="Adams Silva"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.lastname}
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 tracking-wide">Telefone</div>
            <InputMask
              mask="\+\5\5 (99) 99999-9999"
              {...register('tel', { required: true })}
              placeholder="+55 (99) 99999-9999"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.tel}
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700 tracking-wide">CPF</div>
            <InputMask
              mask="999.999.999-99"
              {...register('cpf', { required: true })}
              placeholder="123.456.789-10"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.cpf}
            />
          </div>
          <div>
            <h2 className="mt-5 font-semibold uppercase text-gray-400">Endereço</h2>
            <div className="text-sm font-semibold text-gray-700 tracking-wide">CEP</div>
            <InputMask
              mask="99999-999"
              {...register('cep', { required: true })}
              placeholder="12345-678"
              onChange={getAndress}
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.cep}
            />
          </div>
          <div>
            <div className="mt-2 text-sm font-semibold text-gray-700 tracking-wide">Logradouro</div>
            <input
              {...register('logradouro', { required: true })}
              name="logradouro"
              type="text"
              placeholder="Endereço"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.andress.logradouro}
            />
          </div>

          <div>
            <div className="mt-2 text-sm font-semibold text-gray-700 tracking-wide">Bairro</div>
            <input
              {...register('bairro', { required: true })}
              name="bairro"
              type="text"
              placeholder="Bairro"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.andress.bairro}
            />
          </div>

          <div>
            <div className="mt-2 text-sm font-semibold text-gray-700 tracking-wide">Localidade</div>
            <input
              {...register('localidade', { required: true })}
              name="localidade"
              type="text"
              placeholder="Cidade"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.andress.localidade}
            />
          </div>

          <div>
            <div className="mt-2 text-sm font-semibold text-gray-700 tracking-wide">Estado</div>
            <input
              {...register('uf', { required: true })}
              name="uf"
              type="text"
              placeholder="Estado"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.andress.uf}
            />
          </div>
          <div>
            <div className="mt-2 text-sm font-semibold text-gray-700 tracking-wide">Numero</div>
            <input
              {...register('numhouse', { required: true })}
              name="numhouse"
              type="number"
              placeholder="30"
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-primary-ligth"
              defaultValue={getStateRegister.numhouse}
            />
          </div>
          <div>
          </div>
          <div className="mt-10">
            <button className="btn p-4 w-full">
              Atualizar Dados
            </button>
          </div>
        </form>
      )
    }
    return ""
  }
  return (
    <>
      <Head>
        <title>Atualize seus dados</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <FormRegister />
      </LayoutUser>
      <ToastContainer />
    </>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const user = await getUser(session.user.email)
  if (user.user) {
    const profile = {
      name: user.user.name,
      lastname: user.user.lastname,
      tel: user.user.tel,
      cpf: user.user.cpf,
      cep: user.user.cep,
      andress: {
        logradouro: user.user.logradouro,
        bairro: user.user.bairro,
        localidade: user.user.localidade,
        uf: user.user.uf
      },
      numhouse: user.user.numhouse,
    }


    return {
      props: { session, profile }
    }
  }
  return {
    props: { session }
  }
}