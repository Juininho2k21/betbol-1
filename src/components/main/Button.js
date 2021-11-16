import { useEffect, useState } from "react"
import { useStore } from "../../context/store"
import Translate from "../../utills/translate"

export default function Button(props) {
    const [checked, setChecked] = useState(false)
    const { setGoBetsInNote, removeBetsInNote, note } = useStore()

    const bets = props.bets
    useEffect(() => {
        const fix = note.find(item => {
            if (item.fix.fixture.id == props.fixId.fixture.id) {
                if (item.choice.betsChoice == props.bets) {
                    if (props.val.odd == item.choice.odd && item.choice.value == props.val.value) {
                        return true
                    } else {
                    }
                } else { }
            } else {
                return false
            }
        })
        if (fix) {
            setChecked(true)
        } else { setChecked(false) }
    }, [note])

    const betGo = (val, fix) => {
        if (checked) {
            note.map((n, i) => {
                if (n.fix.fixture.id == fix.fixture.id) {
                    removeBetsInNote(i)
                }
            })
        } else {
            const bet = {
                fix,
                choice: {
                    ...val,
                    betsChoice: bets
                }
            }

            if (note.length > 0) {
                const existequalFix = note.filter(n => {
                    return n.fix.fixture.id == props.fixId.fixture.id
                })
                if (existequalFix.length > 0) {
                } else {
                    setGoBetsInNote(bet)
                }
            } else {
                setGoBetsInNote(bet)
            }
        }
    }
    return <div className="group inline-block relative w-full">
        <button onClick={() => betGo(props.val, props.fixId)} className={`${checked ? `bg-primary-ligth hover:bg-primary text-white` : `bg-gray-200 hover:bg-gray-200`} p-3 font-normal text-gray-700 cursor-pointer rounded-sm active:outline-none focus:outline-none w-full`}>
            {props.val.odd}
            <span className="hidden text-xs md:block">{Translate(props.val.value)}</span>
        </button>
        <span className="text-xs hidden group-hover:block absolute z-10 bg-white p-2 shadow-md">{Translate(props.val.value)}</span>
    </div>
}