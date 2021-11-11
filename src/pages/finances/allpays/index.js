import useFetch from '../../../utills/useFetch'
import { format } from 'date-fns'
import { MdOutlineSchedule, MdMonetizationOn, MdDangerous, MdDoneOutline } from 'react-icons/md'
import axios from 'axios'
import { FcSynchronize } from 'react-icons/fc'

export default function AllPays(props) {
    const url = `/api/payments/getpayments`
    const { data, error } = useFetch(url)
    if (error) return `ERROR`
    if (!data) return <div className="text-center flex items-center">
        <FcSynchronize className="text-5xl animate-spin  mx-auto text-yellow-400 p-3" />
    </div>
    console.log('payments ', data)
    const payments = data.payments

    const receiverPoints = async (pay, e) => {
        await axios.post('/api/payments/received', { pay, points: props.user.points })
            .then(function (response) {
                console.log('diabeiss ?')
                location.reload()
            })
    }

    return <>
        {payments.reverse().map(pay => {
            const date = format(new Date(pay.date), 'dd.MM.yy')
            const status = (value) => {
                if (value) {
                    if (value.status = `approved`) return true
                    return false
                }
            }
            return <div className="bg-gray-100 p-2 shadow-sm my-1 grid grid-cols-4" key={pay.id}>
                <div className=""><MdOutlineSchedule className="inline-block" /> {date}</div>
                <div className=""><MdMonetizationOn className="inline-block" /> R${pay.points.toFixed(2)}</div>
                <div className={`${status(pay.values) ? `text-green-500` : `text-red-600 `}`} >STATUS: {status(pay.values) ? <MdDoneOutline className="inline-block text-green-500" /> : <MdDangerous className="inline-block text-red-600" />}</div>
                <div> {status(pay.values) && !pay.received && <button onClick={e => receiverPoints(pay, e)} className="float-right uppercase font-semibold text-sm text-white bg-green-500 hover:bg-green-400 p-1">Resgatar Pontos</button>
                }
                    {pay.received && <span className="float-right uppercase font-semibold text-sm text-white bg-gray-300 p-1 cursor-not-allowed">
                        Recebido
                    </span>}
                </div>
            </div>
        })}
    </>
}