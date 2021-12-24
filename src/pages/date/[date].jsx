import Head from 'next/head'
import Layout from '../../components/layouts/home/layout'
import serverSidePropsClient from '../../utills/serverSitePropsClient'
import { useRouter } from 'next/router'
import useFetch from '../../utills/useFetch'
import { useEffect, useState } from 'react'
import { useStore } from '../../context/store'
import FullLoading from '../../components/fullloading'
import Alive from '../../components/main/Alive'
import { FixProvider } from '../../context/fix'

export default function LeaguePage(props) {

    const [live, setLive] = useState([])
    const router = useRouter()
    const [bets, setBets] = useState(1)
    const { date } = router.query
    const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { data, error } = useFetch(`/api/betApi/soccer?date=${date}&tzid=${tzid}`)
    useEffect(() => {if (data) setLive(data.soccer.response)}, [data])

    if (error) return console.log(error)
    if (!data) return <FullLoading />

    return (
        <>
            <Head>
                <title>Betbol - Futebol</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout userString={props.userString}>
                <FixProvider>
                    <Alive live={live} bets={bets} setBets={setBets} title={`Jogos de ${date}`} />
                </FixProvider>
            </Layout>
        </>
    )
}
export async function getServerSideProps(context) {
    const ret = serverSidePropsClient(context)
    return ret
}