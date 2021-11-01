import React from "react";
import { NumberArray, Text } from "react-native-svg";
import { MemberStatistics } from "../../screens/Tasks/helpers/MemberStatistics";

type slice = {
    data: MemberStatistics;
    index: number;
    value: number;
    startAngle: number;
    endAngle: number;
    padAngle: number;
    pieCentroid: NumberArray[];
    labelCentroid: NumberArray[];
};

type LabelProps = {
    slices?: slice[];
    height?: number;
    width?: number;
};

const PieChartLabels = ({ slices }: LabelProps) => {
    return (
        <>
            {slices!.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;

                return (
                    <Text
                        key={index}
                        x={pieCentroid[0]}
                        y={slices!.length > 1 ? pieCentroid[1] : Number(pieCentroid[1]) - 50}
                        fill={"white"}
                        textAnchor={"middle"}
                        alignmentBaseline={"middle"}
                        fontSize={24}
                        stroke={"black"}
                        strokeWidth={0.2}
                    >
                        {data.emoji}
                    </Text>
                );
            })}
        </>
    );
};

export default PieChartLabels;
