import { useState } from "react"
import { useStore } from "../../context/store"
import Translate from "../../utills/translate"

export default function Button(props) {
    const [toggle, setToggle] = useState(false)
    const { setGoBetsInNote, note } = useStore()

    const betGo = (val, fix) => {
        
        if (note.length > 0) {
            const existequalFix = note.filter(n => {
                return n.fix.fixture.id == props.fixId.fixture.id
            })
            if(existequalFix.length > 0) {
                console.log(`existe igual`)
            }else {
                setGoBetsInNote(val, fix)
            }
            // idsFixesNote.map(n => {
            //     if (n.fix.fixture.id != props.fixId.fixture.id) {
            //         console.log(n.fix.fixture.id != props.fixId.fixture.id, n.fix.fixture.id, props.fixId.fixture.id)
            //         setGoBetsInNote(val, fix)
            //     }
            // })


            // for (let n of note) {
            //     console.log(n.fix.fixture.id, props.fixId.fixture.id)
            //     if (n.fix.fixture.id != props.fixId.fixture.id) {
            //         console.log('não existe aposta nesse jogo, apostando...')
            //         setGoBetsInNote(val, fix)
            //     } else {
            //         console.log('já existe aposta nesse jogo, não pode ser feita a aposta')
            //         return 
            //     }
            // }
        } else {
            setGoBetsInNote(val, fix)
        }

    }
    return <div className="group inline-block relative">
        <button onClick={() => betGo(props.val, props.fixId)} className={`${toggle ? `bg-yellow-400 hover:bg-yellow-500` : `bg-gray-100 hover:bg-gray-200`}  p-3 m-1 font-normal text-gray-700 cursor-pointer rounded-sm active:outline-none focus:outline-none`}>
            {props.val.odd}
            <span className="md:hidden text-xs block">{Translate(props.val.value)}</span>
        </button>
        <span className="text-xs hidden group-hover:block absolute z-10 bg-white p-2 shadow-md">{Translate(props.val.value)}</span>
    </div>
}