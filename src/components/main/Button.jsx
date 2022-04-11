import { useEffect, useState } from "react"
import { useStore } from "../../context/store"
import useFetch from "../../utills/useFetch"
import FullLoading from "../fullloading"
import { toast } from 'react-toastify';
import Translate from '../../utills/translate'
import translateBets from "../../utills/translates/translateBets";

export default function Button({ fix, val, bets, value }) {
    const [checked, setChecked] = useState(false)
    const [config, setConfig] = useState({})
    const { data, error } = useFetch('/api/adm/config')
    const { setGoBetsInNote, removeBetsInNote, note, replaceBetsInNote } = useStore()
    
    useEffect(() => {if(data) setConfig(data.config[0].config)}, [data])
 
    useEffect(()=> {
        // console.log("note buttom", note)
        note.map((n, i) => {
            if (n.fix.fixture.id == fix.fixture.id && n.choice.betsChoice == bets) {
                if (n.choice.value == val.value && n.choice.odd == val.odd) {
                    setChecked(true)
                } else {
                    if (checked) setChecked(false)
                }
            }
        })
    },[note])
    if(!config) return <FullLoading />
    const betGo = (val, fix, bets) => {
        const bet = {
            fix,
            choice: {
                ...val,
                betsChoice: bets
            }
        }
        if (checked) {
            note.map((n, i) => {
                if (n.fix.fixture.id == fix.fixture.id) {
                    removeBetsInNote(i)
                    setChecked(false)
                }
            })
        } else {
            if(note.length <= config.max_events_ticket -1) {
                const indexNoteEquals = note.findIndex((n, i) => n.fix.fixture.id == fix.fixture.id)
                if (indexNoteEquals < 0) {
                    setGoBetsInNote(bet)
                } else {
                    replaceBetsInNote(bet)
                }
            }else {
                toast.success("Limite de jogos por bilhete alcançado!",{
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            }
        }
    }
    if(val.odd > 20) val.odd = 20

 return <div className={` page group  uppercase inline-block w-full h-full`}>
        <button onClick={() => betGo(val, fix, bets)} className={`${value ? 'flex flex-row justify-between px-1.5 py-3 w-full': 'rounded-lg w-12 h-12'} ${checked ? `bg-primary hover:bg-primary-ligth text-white` : `bg-gray-200 hover:bg-gray-300 text-black`} cursor-pointer active:outline-none focus:outline-none h-full text-base font-bold`}>
           {value && <span className="block  text-xs">{translateBets(val.value, bets)}</span>}
            <span className="block font-normal text-xs" >{val.odd}</span>
        </button>
 </div>
}