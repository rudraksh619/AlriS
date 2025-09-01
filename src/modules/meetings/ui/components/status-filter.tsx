
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, LoaderIcon, VideoIcon } from "lucide-react";
import { MeetingStatus } from "../../type";
import { MeetingFilters } from "../../hooks/use-meetings-filters";
import { CommandSelect } from "./command-select";


//  cvreating the options on the basis of which we filter the meetings 

const options = [
    {
        id : MeetingStatus.upcoming,
        value  : MeetingStatus.upcoming,
        children : (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {MeetingStatus.upcoming}
            </div>
        )
    },
     {
        id : MeetingStatus.active,
        value  : MeetingStatus.active,
        children : (
            <div className="flex items-center gap-x-2 capitalize">
                <VideoIcon />
                {MeetingStatus.active}
            </div>
        )
    },
     {
        id : MeetingStatus.cancelled,
        value  : MeetingStatus.cancelled,
        children : (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleXIcon />
                {MeetingStatus.cancelled}
            </div>
        )
    },
     {
        id : MeetingStatus.completed,
        value  : MeetingStatus.completed,
        children : (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleCheckIcon />
                {MeetingStatus.completed}
            </div>
        )
    },
     {
        id : MeetingStatus.processing,
        value  : MeetingStatus.processing,
        children : (
            <div className="flex items-center gap-x-2 capitalize">
                <LoaderIcon />
                {MeetingStatus.processing}
            </div>
        )
    }
]


export const MeetingStatusFilter = ()=>{
    const[filter , setfilter] = MeetingFilters();
    
    return(
        <CommandSelect
        placeholder = "Status"
        className = "h-9"
        options = {options}
      onSelect={(value) => setfilter({status : value as MeetingStatus})}
       value = {filter.status || ""}
        />
    )
}