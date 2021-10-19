import React, { FC } from 'react';
import { PieChart as ImportedPieChart } from 'react-native-svg-charts';
import task from '../../Common/Task';
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import PieChartLabels from './PieChartLabels';

interface Props {
    data: MemberStatistics[];
}

const PieChart: FC<Props> = ({ data }): React.ReactElement => {

    return (
        <ImportedPieChart
            style={{ height: 240 }}
            data={data}
            outerRadius={'92%'}
            innerRadius={'0%'}
            padAngle={0.01}
            valueAccessor={({ item }) => { //Piechart slice calculation.
                let totalValue = 0;
                for (let i = 0; i < item.tasksDone.length; i++) {
                    // const doneTask = allTasks.find(task => task.id === item.tasksDone[i]);
                    // if (!doneTask || doneTask == undefined) return totalValue = 0;

                    // const valueOfTask = doneTask.value!;
                    // totalValue += valueOfTask;

                    totalValue += item.tasksDone[i].value;

                }

                return totalValue;
            }}
        >
            <PieChartLabels />
        </ImportedPieChart>
    )
};

export default PieChart;


