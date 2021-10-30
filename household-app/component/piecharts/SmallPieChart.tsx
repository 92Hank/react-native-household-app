import React, { Children, FC } from "react";
import { StyleProp, StyleSheet, ViewStyle, Text, View } from "react-native";
import { PieChart as ImportedPieChart } from "react-native-svg-charts";
import { MemberStatistics } from "../../screens/Tasks/MemberStatistics";

interface Props {
    data: MemberStatistics[];
    specificTaskId: string;
    style: StyleProp<ViewStyle>[];
    taskName: string;
}

const SmallPieChart: FC<Props> = ({ data, specificTaskId, style, children }): React.ReactElement => {
    return (
        <View style={styles.smallChartSingleViewStyle}>
            <ImportedPieChart
                style={style[0]}
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
            {children}
        </View>
    );
};

export default SmallPieChart;

const styles = StyleSheet.create({
    smallChartSingleViewStyle: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        flexBasis: "30%",
    },
});
