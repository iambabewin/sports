import React from 'react';
import {connect} from 'dva';
import './style.less';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const token = window.localStorage.getItem("token");

class Winners extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'winners/GetCollegeWinnersNumber',
      payload: {
        token: token,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.initCollegeBar();
      }
    })
    this.props.dispatch({
      type: 'winners/GetGenderWinnersNumber',
      payload: {
        token: token,
      }
    }).then((ret) => {
      if (ret === 0) {
        this.initGenderBar();
      }
    })

  }

  initCollegeBar() {
    const {collegeWinnersList} = this.props;
    let xAxisArr = [];
    let seriesArr = [];
    collegeWinnersList.forEach((item, index) => {
      xAxisArr.push(item.college_name);
      seriesArr.push(item.num);
    });
    let el = document.getElementById("main-college");
    let myChart = echarts.init(el);
    let option = {
      title: {
        subtext: '院系获奖统计',
      },
      color: ['#3398DB'],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxisArr,
        axisLabel: {
          clickable: true,
          interval: 0,
          formatter: function (params, index) {
            if (index % 2 != 0) {
              return '\n\n' + params;
            }
            else {
              return params;
            }
          }
        }
      },
      yAxis: {
        interval: 1,
        type: 'value'
      },
      series: [{
        type: 'bar',
        barWidth: '60%',
        data: seriesArr
      }],
    };
    myChart.setOption(option);
  }

  initGenderBar() {
    const {genderWinnersList} = this.props;
    let xAxisArr = [];
    let seriesArr = [];
    genderWinnersList.forEach((item, index) => {
      if (item.gender == 1) {
        xAxisArr.push('男');
      } else {
        xAxisArr.push('女');
      }
      seriesArr.push(item.num);
    });
    let el = document.getElementById("main-gender");
    let myChart = echarts.init(el);
    let option = {
      title: {
        subtext: '性别获奖统计',
      },
      color: ['#3398DB'],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxisArr,
      },
      yAxis: {
        interval: 1,
        type: 'value'
      },
      series: [{
        type: 'bar',
        barWidth: '60%',
        data: seriesArr
      }],
    };
    myChart.setOption(option);
  }

  render() {
    return (
      <div style={{position: 'relative', background: '#ffffff', display: 'flex',justifyContent:'space-around'}}>
        <div id="main-gender" style={{width: "15%", height: "450px",marginLeft:'15px'}}></div>
        <div id="main-college" style={{width: "80%", height: "450px"}}></div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    collegeWinnersList: state.winners.collegeWinnersList,
    genderWinnersList: state.winners.genderWinnersList
  }
})(Winners);


