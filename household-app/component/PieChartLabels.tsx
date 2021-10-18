import React from 'react';
import { NumberArray, Text } from 'react-native-svg';

type slice = {
    data: object,
    index: number,
    value: number,
    startAngle: number,
    endAngle: number,
    padAngle: number,
    pieCentroid: NumberArray[],
    labelCentroid: NumberArray[],
}

type LabelProps = {
    slices?: slice[],
    height?: number,
    width?: number,
};

const PieChartLabels = ({ slices }: LabelProps) => {

    // https://stackoverflow.com/q/61733861 //typa upp med slice
    // https://github.com/JesperLekland/react-native-svg-charts#arguments-to-children-5

    //  1. Vad måste göras. Ta in alla SMILEYS i PieChart, skicka ner hit, hantera som del av array i map, variabel.
    //  2. PR sen på vad som finns?


    return (
        <>
            {
                slices!.map((slice, index) => {
                    const { labelCentroid, pieCentroid, data } = slice;
                    return (
                        <Text
                            key={index}
                            x={pieCentroid[0]}
                            y={pieCentroid[1]}
                            fill={'white'}
                            textAnchor={'middle'}
                            alignmentBaseline={'middle'}
                            fontSize={24}
                            stroke={'black'}
                            strokeWidth={0.2}
                        >
                            🦊
                        </Text>
                    )
                })
            }
        </>
    )
};

export default PieChartLabels;


