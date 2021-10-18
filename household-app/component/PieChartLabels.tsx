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
    labelImage?: string, //Kolla över hur detta kan kopplas.
};

const PieChartLabels = ({ slices }: LabelProps) => {

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


