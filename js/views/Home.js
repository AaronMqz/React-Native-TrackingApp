import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';
import moment from 'moment';

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const width = Dimensions.get('window').width - 30;
var months = {};
const height = 220;

const modelData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

const Home = ({routes, navigation}) => {
  const [distance, setDistance] = useState(0);
  const [distanceString, setDistanceString] = useState('');
  const [timing, setTiming] = useState(0);
  const [timingString, setTimingString] = useState('');
  const [chartData, setChartData] = useState(modelData);

  useEffect(() => {
    var durations = [];
    var distances = [];
    routes.map((item) => {
      distances.push(item.distance);
      durations.push(item.time);
      var month = moment(new Date(item.datetime)).month();
      if (!months[month]) {
        months[month] = item.distance;
      } else {
        months[month] = months[month] + item.distance;
      }
    });

    for (var x = 0; x < modelData.labels.length; x++) {
      if (months[x]) {
        modelData.datasets[0].data[x] = months[x];
      }
    }

    var totalDuration = durations.slice(1).reduce((prev, cur) => {
      return moment.duration(cur).add(prev);
    }, moment.duration(durations[0]));

    var totalDistance = distances.slice(1).reduce((prev, cur) => {
      return prev + cur;
    }, distances[0]);

    var _distanceString = ' km';
    if (totalDistance < 1000) {
      _distanceString = ' m';
    }

    var _timing = 0;
    var _timingString = '';
    if (moment.utc(totalDuration.asMilliseconds()).format('HH') > 0) {
      _timing = moment.utc(totalDuration.asMilliseconds()).format('HH:mm');
      _timingString = ' hr';
    } else if (moment.utc(totalDuration.asMilliseconds()).format('mm') > 0) {
      _timing = moment.utc(totalDuration.asMilliseconds()).format('m:ss');
      _timingString = ' min';
    } else {
      _timing = parseInt(
        moment.utc(totalDuration.asMilliseconds()).format('ss'),
      );
      _timingString = ' sec';
    }

    setTiming(_timing);
    setTimingString(_timingString);
    setDistance(totalDistance);
    setDistanceString(_distanceString);
    setChartData(modelData);
  }, [routes.length]);

  return (
    <View style={styles.Container}>
      <ScrollView style={styles.ContainerScroll}>
        <View style={styles.DistanceContainer}>
          <Text style={styles.DistanceTitle}>Total Distance</Text>
          <Text style={styles.DistanceTotalTitle}>
            {distance}
            <Text style={styles.DistanceSubTitle}>{distanceString}</Text>
          </Text>
        </View>
        <View style={styles.TimingContainer}>
          <Text style={styles.TimingTitle}>Total Time</Text>
          <Text style={styles.TimingTotalTitle}>
            {timing}
            <Text style={styles.TimingSubTitle}>{timingString}</Text>
          </Text>
        </View>
        <LineChart
          data={chartData}
          width={width}
          height={height}
          chartConfig={chartConfig}
          bezier
          yAxisSuffix={distanceString}
          style={styles.ChartContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ContainerScroll: {
    paddingTop: 10,
  },
  DistanceContainer: {
    height: 130,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 15,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
  },
  DistanceTitle: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'flex-end',
  },
  DistanceTotalTitle: {
    color: 'white',
    fontSize: 60,
    alignSelf: 'center',
  },
  DistanceSubTitle: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },

  TimingContainer: {
    height: 130,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 15,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
  },
  TimingTitle: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'flex-end',
  },
  TimingTotalTitle: {
    color: 'white',
    fontSize: 60,
    alignSelf: 'center',
  },
  TimingSubTitle: {
    color: 'white',
    fontSize: 20,
  },
  ChartContainer: {
    backgroundColor: '#2ecc71',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 15,
  },
});

let mapState = (store) => {
  return {
    routes: store.routes.routes,
  };
};

export default connect(mapState)(Home);
