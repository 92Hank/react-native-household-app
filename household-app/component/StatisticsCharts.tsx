import React, { FC } from 'react';
import { View } from 'react-native';
import PieChart from "../component/PieChart";
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import SmallPieChart from './SmallPieChart';

interface Props {
    data: MemberStatistics[];
}

const StatisticsCharts: FC<Props> = ({ data }): React.ReactElement => {
    // const [currentlyDoneTasks, setCurrentlyDoneTasks] = useState(); //beror på utskickad info från API:t om ny doneTask finns. Ta bort?

    //data = MemberStatistics[].doneTasks[].taskId

    let allDoneTaskIdsArray: string[] = []; //pusha unika idn till array, OM de inte redan finns.
    data.forEach((member) => {
        member.doneTasks.forEach((doneTask) => {
            allDoneTaskIdsArray.push(doneTask.id);
            console.log("pushed" + doneTask.id)//TEEEEEEEEEEST
        })
    })


    console.log("------------------------------")//TEEEEEEEEEEST


    allDoneTaskIdsArray.filter((taskId, index, self) => {
        self.indexOf(taskId) === index;
        if (self.indexOf(taskId) === index) console.log(taskId)//TEEEEEEEEEEST
    })

    /**
     * Function to loop through the MemberStatistics data array and remove from
     * it all household members not having the taskId in their doneTasks[] parameter.
     *
     * @param data 
     * @param taskId 
     * @returns {MemberStatistics[]}
     */
    const filterOutNonparticipantMembers = (data: MemberStatistics[], taskId: string) => {
        let filteredMembers: MemberStatistics[] = [];

        data.forEach((member) => {
            member.doneTasks.filter((doneTask, index) => {
                if (member.doneTasks[index].taskId == taskId)
                    filteredMembers.push(member);
            })
        })

        return filteredMembers;
    }

    // 1. ta alla unika taskidn för done tasks från members
    // - loopa igenom en members taskDone, plocka ut idn, skicka in
    // - rensa upp icke-unika idn.
    // 2. skapa piecharts.

    const generateSmallPieCharts = () => {
        return allDoneTaskIdsArray.map((taskId, index) => {
            console.log("taskId to child react:" + taskId) //TEST

            return (
                <SmallPieChart
                    data={filterOutNonparticipantMembers(data, taskId)} //för en Task-Piechart där viss member har 0 value, ta bort från array!!!!!!!!!!!!
                    specificTaskId={taskId} //detta måste stämma
                    key={index}
                />
            );
        });
    }

    return (
        <>
            <PieChart data={data} />
            <View>
                {generateSmallPieCharts()}
            </View>
        </>
    )
};

export default StatisticsCharts;


