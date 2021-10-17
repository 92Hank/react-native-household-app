import React from 'react';
import { Circle, G, Image, NumberArray } from 'react-native-svg';
import Assets from '../assets';

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

    return (
        slices!.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <G
                    key={index}
                    x={labelCentroid[0]}
                    y={labelCentroid[1]}
                >
                    <Circle
                        r={18}
                        fill={'#fff'}
                    />
                    <Image
                        x={-10}
                        y={-10}
                        width={20}
                        height={20}
                        preserveAspectRatio="xMidYMid slice"
                        opacity="1"
                        href={Assets.images[2]}
                    />
                </G>
            )
        })
    )


};

export default PieChartLabels;


