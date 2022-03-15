import { HtmlEmailSendBet } from '../../../../utills/htmlEmailSendBet'
import { useSession } from "next-auth/client"
import axios from 'axios'
import { useStore } from '../../../../context/store'
import { ConfirmDialog } from '../../../confirm-dialog'
import { useState } from 'react'
import ItemBetNote from './item-bet-note'
import { useRouter } from 'next/dist/client/router'
import FullLoading from '../../../fullloading'

export default function NoteBtn(props) {
    const { user } = useStore()
    const [ loading , setLoading ] = useState(false)
    const toast = props.toast
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const { note, clearNote } = useStore()
    const [session] = useSession()
    const ValorFinal = (vf) => {
        if (vf.vf) {
            if (vf.vf.length > 0) {
                return `R$ ${vf.vf}`
            }
        }
        return ``
    }

    const startBet = (user, valor, retornoPotencial) => {
        setLoading(true)
        axios.post('/api/betApi/toBet', {
            points: user.points,
            email: user.email,
            bets: note,
            potencialReturn: retornoPotencial,
            value: valor
        })
            .then(function (response) {
                axios.post('/api/email/send', {
                    subject: `Betbol - Aposta Realizada`,
                    html: HtmlEmailSendBet(note, process.env.NEXTAUTH_URL),
                }).then(function (response) {
                    setLoading(false)
                        toast.success("Aposta Realizada com sucesso!",{
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            })
                        
                        clearNote()
                        props.setToggleNoteBets(false)
                        router.push(`/user/hystory`)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log(error);
            });
        //limpar note
    }
    if (!session) {
        return <div className="group relative w-full ">
            <button className="w-full bg-primary-ligth cursor-not-allowed font-semibold text-md text-white uppercase p-3 disabled:opacity-50" disabled>Fazer Aposta <ValorFinal /><br />
            </button>
            <span className="absolute text-center text-white w-full bottom-0 left-0 select-none cursor-not-allowed group-hover:opacity-100 opacity-0 text-xs">Faça Login para apostar</span>

        </div>
    }

    return <><button onClick={() => {
        if (props.vf > 0 && props.vf < user.points) {
            if (note.length > 0) {
                setOpen(true)
            } else {
                toast.info("Primeiro faça uma escolha.",{
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })

            }
        } else {
            toast.warn("Você não tem pontos suficientes, faça um depósito.",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        }

    }} className="w-full bg-primary hover:bg-primary-ligth cursor-pointer font-semibold text-md text-white uppercase p-3">Fazer Aposta <ValorFinal vf={props.vf} /><span className="text-xs font-bold block text-gray-100">Potencial Retorno: {props.retornoPotencial}</span> </button>
        <ConfirmDialog open={open} setOpen={setOpen} onConfirm={() => {
            startBet(user, props.vf, props.retornoPotencial)
        }}>
            {/* <h1 className="font-bold uppercase">Confirmar Aposta ? R${props.vf.toFixed(2)}</h1> */}
            <div className="overflow-scroll max-h-64">
                {note.map((bet, indice) => {
                    return <ItemBetNote setVf={props.setVf} key={bet.fix.fixture.id} bet={bet} indice={indice} vf={props.vf} />

                })}
            </div>
        </ConfirmDialog>
        {loading && <FullLoading />}
    </>
}