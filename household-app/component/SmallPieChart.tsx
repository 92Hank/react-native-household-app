import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PieChart as ImportedPieChart } from 'react-native-svg-charts';
import { MemberStatistics } from "../screens/Tasks/memberStatistics";

interface Props {
    data: MemberStatistics[];
    specificTaskId: string;
    style: StyleProp<ViewStyle>;
}

const SmallPieChart: FC<Props> = ({ data, specificTaskId, style }): React.ReactElement => {

    return (
        <ImportedPieChart
            style={style}
            data={data}
            outerRadius={'92%'}
            innerRadius={'0%'}
            padAngle={0.00}
            valueAccessor={({ item }) => {
                let totalValue = 0;
                for (let i = 0; i < item.doneTasks.length; i++) {
                    if (item.doneTasks[i].taskId == specificTaskId) totalValue += item.doneTasks[i].value!;
                }
                return totalValue;
            }}
        />
    )
};

export default SmallPieChart;


