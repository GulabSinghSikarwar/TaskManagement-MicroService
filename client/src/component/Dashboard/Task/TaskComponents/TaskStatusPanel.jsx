import React, { useState } from 'react'
import { ReactComponent as StatusIcon } from '../../../../icons/clickup_icons/status.svg'
import { ReactComponent as CalendarIcon } from '../../../../icons/clickup_icons/calender.svg'
import { ReactComponent as FlagIcon } from '../../../../icons/clickup_icons/flag.svg'
import { ReactComponent as StaopWatchIcon } from '../../../../icons/clickup_icons/stop-watch.svg'
import { ReactComponent as TagIcon } from '../../../../icons/clickup_icons/tag.svg'
import { ReactComponent as TimeIcon } from '../../../../icons/clickup_icons/time.svg'
import { ReactComponent as AssigneIcon } from '../../../../icons/clickup_icons/assignee.svg'
import { ReactComponent as PriorityFlag } from '../../../../icons/clickup_icons/flag.svg'
import { storageHelper } from '../../../utils/storage'
import '../task.css'
import { PriorityIcon } from '../../../utils/utils'
import Tooltip from './ToolTip'
function TaskStatusPanel({ task }) {
    const [avtarInitials, setAvtarInitials] = useState('')
    function generateInitials(name) {
        const names = name.split(' ');
        const initials = names.map(n => n[0].toUpperCase()).join('');
        return initials;
    }
    const priorityIcon = PriorityIcon(task.priority)
    React.useEffect(() => {

        // Setting Avatar Initials
        let user = storageHelper.get('USER')
        console.log("priority  : ", task.priority);
        console.log("icons : ", priorityIcon);
        if (user.username) {
            const initials = generateInitials(user.username)
            setAvtarInitials(initials)
        }

    }, []);


    return (
        <div className='flex  w-full pt-5 pl-5'>
            <div className='w-1/2 mr-5'>
                <div className="flex py-2 px">
                    <div className="w-1/2  text-[13px]  text-commentIconColor flex  items-center">
                        <span className='mr-2'> <StatusIcon /> </span> <span className='capitalize'>status</span>
                    </div>
                    <div className="w-1/2 text-[13px] text-commentIconColor">{(task.status) ? task.status : 'Empty'}</div>
                </div>
                <div className="flex py-2 px">
                    <div className="w-1/2  text-[13px]  text-commentIconColor flex  items-center">
                        <span className='mr-2'><CalendarIcon /> </span> <span className='capitalize' >date</span>
                    </div>
                    <div className="w-1/2 text-[13px] text-commentIconColor">{(task.createdAt) ? new Date(task.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : 'Empty'}</div>
                </div>
                <div className="flex py-2 px">
                    <div className="w-1/2  text-[13px]  text-commentIconColor flex  items-center">
                        <span className='mr-2'><TimeIcon /> </span> <span className='capitalize'>time</span>
                    </div>
                    <div className="w-1/2 text-[13px] text-commentIconColor">{(task.estimated_time) ? task.estimated_time : 'Empty'}</div>
                </div>
                <div className="flex py-2 px">
                    <div className="w-1/2  text-[13px]  text-commentIconColor flex  items-center">
                        <span className='mr-2'><TagIcon /> </span> <span className='capitalize'>tags</span>
                    </div>
                    <div className="w-1/2 text-[13px] text-commentIconColor">{(task.tags.length > 0) ? task.status : 'Empty'}</div>
                </div>


            </div>
            <div className='w-1/2'>
                <div className="flex py-2 px">
                    <div className="w-1/2  text-[13px]  text-commentIconColor flex  items-center">
                        <span className='mr-2'> <AssigneIcon /> </span> <span className='capitalize'>Assigness</span>
                    </div>
                    <div className="w-1/2 text-[13px] text-commentIconColor"> {avtarInitials && <div class="avatar" id="avatar">
                        <span class="initials" id="initials">{avtarInitials}</span>
                    </div>}</div>
                </div>
                <div className="flex py-2 px item-center">
                    <div className="w-1/2  text-[13px]  text-commentIconColor flex  items-center">
                        <span className='mr-2'> <PriorityFlag /> </span> <span className='capitalize'>Priority</span>
                    </div>
                    <div className="w-1/2 text-[13px]   relative inline-block ">
                        <Tooltip message={task.priority}>
                            {/* <button
                                type="button"
                                className="inline-flex items-center rounded-lg border border-gray-500 p-3 text-center
                                  text-sm font-medium text-zinc-800
                                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Hover Me!
                            </button> */}
                            <img src={priorityIcon} />
                        </Tooltip>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TaskStatusPanel