import React, { FC } from 'react';
import { PieChart as ImportedPieChart } from 'react-native-svg-charts';
import task from '../../Common/Task';
import { MemberStatistics } from "../screens/Tasks/CurrentWeekScreen";
import PieChartLabels from './PieChartLabels';

interface Props {
    data: MemberStatistics[];
    allTasks: task[];
}

const PieChart: FC<Props> = ({ data, allTasks }): React.ReactElement => {

    return (
        <ImportedPieChart
            style={{ height: 240 }}
            data={data}
            outerRadius={'92%'}
            innerRadius={'0%'}
            padAngle={0.01}
            valueAccessor={({ item }) => {
                let totalValue = 0;
                for (let i = 0; i < item.tasksDone.length; i++) {
                    const doneTask = allTasks.find(task => task.id === item.tasksDone[i]);
                    if (!doneTask || doneTask == undefined) return totalValue = 0;

                    const valueOfTask = doneTask.value!;
                    totalValue += valueOfTask;
                }

                return totalValue;
            }}
        >
            <PieChartLabels />
        </ImportedPieChart>
    )
};

export default PieChart;


