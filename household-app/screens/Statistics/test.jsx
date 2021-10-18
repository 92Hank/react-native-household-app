import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'

class StatisticsScreen extends React.PureComponent {

    render() {

        const data = [50, 10, 40, 95, -4, -24, 85, 91]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: { fill: randomColor() },
                key: `pie-${index}`,
            }))

            console.log("data type is: " + typeof(data))
            console.log("piedata type is: " + typeof(pieData))

        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                // console.log("slice:" + typeof (slice))
                // console.log("labelCentroid:" + typeof(labelCentroid) + ", pieCentroid:" + typeof(pieCentroid) + ", data: " + typeof(data))
                // console.log("slice:" + typeof(slice))

                var keys = Object.keys(slice);
                console.log("XXXXXXXXX parent : " + slice.Parent)

                for (var i = 0; i < keys.length; i++) {
                    var val = slice[keys[i]];
                    console.log(keys[i] + ": " + val)
                    console.log("value type: " + typeof(val))


                    // if(keys[i] == 'pieCentroid' || keys[i] == 'labelCentroid') {
                    //     var keys2 = Object.keys(keys[i]);
                    //     console.log(keys2[i] + "PROPERTIES:::")

                    //     for (var j = 0; j < keys2.length; j++) {
                    //         var val2 = keys[i][keys2[j]];
                    //         console.log("   " + keys[j] + ": " + val2)
                    //         console.log("   " + "value type: " + typeof(val2))
                    //     }

                    // }

                }

                console.log("----------------------------\n\n")

                return (
                    <G key={index} >
                        <Line
                            x1={labelCentroid[0]}
                            y1={labelCentroid[1]}
                            x2={pieCentroid[0]}
                            y2={pieCentroid[1]}
                            stroke={data.svg.fill}
                        />
                        <Circle
                            cx={labelCentroid[0]}
                            cy={labelCentroid[1]}
                            r={15}
                            fill={data.svg.fill}
                        />
                    </G>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 200 }}
                data={pieData}
                innerRadius={20}
                outerRadius={55}
                labelRadius={80}
            >
                <Labels />
            </PieChart>
        )
    }

}

export default StatisticsScreen
