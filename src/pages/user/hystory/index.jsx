import Head from 'next/head'
import serverSidePropsClient from '../../../utills/serverSitePropsClient'
import useFetch from '../../../utills/useFetch'
import FullLoading from '../../../components/fullloading'
import LayoutUser from '../../../components/layouts/user'
import { useEffect, useState } from 'react'
import ListBetsHistory from  '../../../components/listBetsHistory'
import { useStore } from '../../../context/store'

export default function historyBets(props) {
  const { user } = useStore()
  const [statusSearch, setStatusSearch] = useState('Todos');
  useEffect(()=>{
    console.log('user ', user)
  }, [user])
  const { data, error } = useFetch(`/api/user/betsHistory?email=${user.email}`)
  if (error) return console.log(error)
  if (!data) return <FullLoading />
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Futebol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutUser>
      <div className="p-1">
        <h1 className="font-bold text-sm">Histórico de Apostas</h1>
        <div className='flex justify-between mb-2'> 
        {/* <span onClick={ () => setStatusSearch('Todos')}  className={`${statusSearch == "Todos" ? `bg-gray-600 text-white` : `bg-gray-200 hover:bg-gray-300`} uppercase text-xs font-semibold cursor-pointer transition-colors   block w-full p-2`}>Todos</span>
        <span onClick={ () => setStatusSearch('Aberta')}  className={`${statusSearch == "Aberta" ? `bg-blue-500 text-white` : `bg-gray-200 hover:bg-gray-300`} uppercase text-xs font-semibold cursor-pointer transition-colors   block w-full p-2`}>Abertas</span>
        <span onClick={ () => setStatusSearch('Ganhou')} className={`${statusSearch == "Ganhou" ? `bg-green-500 text-white` : `bg-gray-200 hover:bg-gray-300`} uppercase text-xs font-semibold cursor-pointer transition-colors block w-full p-2`}>Ganhas</span>
        <span onClick={ () => setStatusSearch('Perdeu')} className={`${statusSearch == "Perdeu" ? `bg-red-600 text-white` : `bg-gray-200 hover:bg-gray-300`} uppercase text-xs font-semibold cursor-pointer transition-colors   block w-full p-2`}>Percas</span> */}
      </div>
      <div className="bg-gray-100 flex justify-between px-2 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Bilhetes
        </span>
        <span className="text-xs font-semibold text-gray-500 uppercase">
          Status
        </span>
      </div>
      <div className=" md:h-auto overflow-auto">
            {data && data.betHistory.reverse().map((bi) => {
              return <ListBetsHistory bi={bi} key={bi._id} />
              })}            
    </div>
    </div>
      </LayoutUser>
    </>
  )
}
