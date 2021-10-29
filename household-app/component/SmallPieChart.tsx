import React, { FC } from "react";
import { StyleProp, ViewStyle, Text } from "react-native";
import { PieChart as ImportedPieChart } from "react-native-svg-charts";
import { MemberStatistics } from "../screens/Tasks/memberStatistics";

interface Props {
    data: MemberStatistics[];
    specificTaskId: string;
    style: StyleProp<ViewStyle>;
    taskName: string;
}

const SmallPieChart: FC<Props> = ({ data, specificTaskId, style, taskName }): React.ReactElement => {
    return (
        <>
            <ImportedPieChart
                style={style}
                data={data}
                outerRadius={"92%"}
                innerRadius={"0%"}
                padAngle={0.0}
                valueAccessor={({ item }) => {
                    let totalValue = 0;
                    for (let i = 0; i < item.doneTasks.length; i++) {
                        if (item.doneTasks[i].taskId === specificTaskId && item.doneTasks[i].value) {
                            totalValue += item.doneTasks[i].value as number;
                        }
                    }
                    return totalValue;
                }}
            />
            <Text>{taskName}</Text>
        </>
    );
};

export default SmallPieChart;
