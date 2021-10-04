import Head from 'next/head'
import Layout from '../components/layouts/home/layout'
import SoccerLive from '../components/bet/football/live'
import NoteBets from '../components/bet/football/noteBets'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'
import getUser from '../utills/getUser.js'
import ListMenu from '../components/layouts/home/listMenu'
import Main from '../components/main'
import { useStore } from '../context/store'
import { fetchAlive } from '../utills/fetchAlive'

export default function Home(props) {

  const [listBetState, setListBetState] = useState([])
  const [getTimeBet, setTimeBet] = useState([])
  const [getValorFinal, setValorFinal] = useState(0)
  const [getLeague, setLeague] = useState({})
  const { setChoiceForMenu } = useStore()

  useEffect(() => {
    const fetcherAlive = async () => {
        const fetch = await fetchAlive()
        setChoiceForMenu(`ALIVE`, fetch)
    }
    fetcherAlive()
}, [])

  return (
    <>
      <Head>
        <title>Betbol - Futebol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userString={props.userString}>
        <div className="page grid grid-cols-12 bg-gray-100">
          <div className="col-span-full md:col-span-2 mt-3 mx-3">
            <ListMenu getLeague={getLeague} setLeague={setLeague} setTimeBet={setTimeBet} />
          </div>
          <div className="mx-3 mt-3 md:col-span-7 col-span-full">
            {/* <LiveUpdate /> */}
            <Main />
          </div>
          <div className="mx-3 md:col-span-3 col-span-full">
            <NoteBets userString={props.userString} setListBetState={setListBetState} listBetState={listBetState} getValorFinal={getValorFinal} setValorFinal={setValorFinal} />
          </div>
        </div>
      </Layout>
    </>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    const user = await getUser(session.user.email)
    const userString = JSON.stringify(user)
    if (typeof user.user == 'undefined') {
      return {
        redirect: {
          destination: '/register',
          permanent: false,
        },
      }
    } if (user.nivel == 5) {
      return {
        redirect: {
          destination: '/adm/dash',
          permanent: false,
        },
      }
    }
    return {
      props: { userString },
    }
  }
  return {
    props: {},
  }
}