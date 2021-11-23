import Head from 'next/head'
import Layout from '../../components/layouts/home/layout'
import serverSidePropsClient from '../../utills/serverSitePropsClient'
import { useRouter } from 'next/router'
import Fix from '../../components/main/Fix'
import SelectOddsBets from '../../components/main/SelectOddsBets'
import useFetch from '../../utills/useFetch'
import { useEffect, useState } from 'react'
import { useStore } from '../../context/store'
import { ImSpinner9 } from 'react-icons/im'
import Alive from '../../components/main/Alive'

export default function LeaguePage(props) {

    const [bets, setBets] = useState(1)
    const router = useRouter()
    const { id, year, name } = router.query
    const { setFixState } = useStore()
    const { data, error } = useFetch(`/api/betApi/fix-to-league?league=${id}&season=${year}`)

    useEffect(() => {
        if (data) {
            setFixState(data.res_filter)
        }
    }, [data])
    let fix = {}
    if (error) console.log(error)
    if (data) {
        fix = data.res_filter
    }

    return (
        <>
            <Head>
                <title>Betbol - Futebol</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout userString={props.userString}>
                <Alive live={fix} bets={bets} setBets={setBets} title={name} />

                {/* <div className="mx-3 mt-3 md:col-span-7 col-span-full bg-white p-3">
                        <div>
                            <h2 className="page-title inline-block">{name}</h2>
                            <SelectOddsBets setBets={setBets} bets={bets} />
                        </div>
                        {!data &&
                            <><ImSpinner9 className="text-5xl animate-spin  mx-auto text-primary p-3" /></>
                        }
                        {fix.length == 0 &&
                            <span className="p-3 bg-gray-100 block">Não há jogos disponíeis</span>
                        }
                        {fix.length > 0 && fix.map(f => {
                            return <Fix key={f.fixture.id} fix={f} bets={bets} />
                        })}
                    </div> */}
            </Layout>
        </>
    )
}
export async function getServerSideProps(context) {
    const ret = serverSidePropsClient(context)
    return ret
}