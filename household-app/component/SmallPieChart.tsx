import React, { FC } from 'react';
import { PieChart as ImportedPieChart } from 'react-native-svg-charts';
import task from '../../Common/Task';
import { MemberStatistics } from "../screens/Tasks/memberStatistics";
import PieChartLabels from './PieChartLabels';

interface Props {
    data: MemberStatistics[];
    specificTask: task;
}

const SmallPieChart: FC<Props> = ({ data, specificTask }): React.ReactElement => {

    return (
        <ImportedPieChart
            style={{ height: 175 }}
            data={data}
            outerRadius={'92%'}
            innerRadius={'0%'}
            padAngle={0.01}
            valueAccessor={({ item }) => {
                let totalValue = 0;
                for (let i = 0; i < item.tasksDone.length; i++) {
                    if (item.tasksDone[i] == specificTask.id) totalValue += specificTask.value!;
                }
                return totalValue;
            }}
        >
            <PieChartLabels />
        </ImportedPieChart>
    )
};

export default SmallPieChart;


