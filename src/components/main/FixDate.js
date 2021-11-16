import { zonedTimeToUtc, utcToZonedTime, format } from "date-fns-tz"
import { fixStatus } from "../../utills/fixstatus";

export default function FixDate(props) {
    const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(zonedTimeToUtc(props.fix.fixture.date, tzid))
    const DateDayAndMoth = format(date, `dd/MM`)
    const DateHours = format(date, `HH:mm`)

    const status = fixStatus.find(status => {
        if(status.name == props.fix.fixture.status.short){
            return true
        }else {
            return false
        }
    })
    return <>
        <span className={`${status.classNames} text-xs block md:inline-block leading-none text-primary font-semibold p-0.5`}>{status.label}</span>
        <span className="text-xs leading-none text-center pt-3 text-gray-500 font-normal">{DateDayAndMoth}</span>
        <span className="text-xs leading-none text-center text-gray-500 ml-1 font-normal">{DateHours}</span>
    </>
}