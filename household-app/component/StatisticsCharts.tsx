import React, { FC } from 'react';
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
        member.tasksDone.forEach((doneTask) => {
            allDoneTaskIdsArray.push(doneTask.id);
        })
    })

    allDoneTaskIdsArray.filter((taskId, index, self) => {
        self.indexOf(taskId) === index;
    })



    // 1. ta alla unika taskidn för done tasks från members
    // - loopa igenom en members taskDone, plocka ut idn, skicka in
    // - rensa upp icke-unika idn.
    // 2. skapa piecharts.

    const smallPieCharts = allDoneTaskIdsArray
        .map((taskId, index) => {
            return (
                <SmallPieChart
                    data={data}
                    specificTaskId={taskId}
                    key={index}
                />
            );
        });

    return ( //lägg ut först stora piechart, sen för varje task som är gjord minst 1 gång under tidsperiod, alla små charts
        // om viss member har 0 på viss task, ta bort ur data somskkickas ner dit

        <>
            <PieChart data={data} />
            {smallPieCharts}
        </>

    )
};

export default StatisticsCharts;


