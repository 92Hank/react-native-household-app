import React, { FC, useState } from 'react';
import task from '../../Common/Task';
import PieChart from "../component/PieChart";
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import SmallPieChart from './SmallPieChart';

interface Props {
    data: MemberStatistics[];
    allTasks: task[];
}

const StatisticsCharts: FC<Props> = ({ data, allTasks }): React.ReactElement => {
    // const [currentlyDoneTasks, setCurrentlyDoneTasks] = useState(); //beror på utskickad info från API:t om ny doneTask finns. Ta bort?

    //funktion för att spamma ut smallpiecharts per task i allTasks

    const allDoneTasks = allTasks.map((task) => {


		return (
			<SmallPieChart
            //properties 
			/>
		);
	});

    return ( //lägg ut först stora piechart, sen för varje task som är gjord minst 1 gång under tidsperiod, alla små charts
        // om viss member har 0 på viss task, ta bort ur data somskkickas ner dit

        <>
              <PieChart data={data} allTasks={allTasks} />
        </>

    )
};

export default StatisticsCharts;


