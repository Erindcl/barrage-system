import * as React from 'react';
import './index.scss';

interface IState {
  showBarrages: any[];
  allBarrages: any[];
  barrageTimeMap: any;
  currentTime: number;
  timer: any;
  channelTimeAccount: any[];
  channelTopDistance: any[];
  channelHeight: number;
  channelNum: number;
}

export default class Home extends React.PureComponent<any, IState> {
  state: IState = {
    showBarrages: [],
    allBarrages: [],
    currentTime: 0,
    timer: null,
    barrageTimeMap: new Map(),
    channelTimeAccount: [],
    channelTopDistance: [],
    channelHeight: 40,
    channelNum: 3,
  };

  componentDidMount() {
    this.initData();
    this.startTimer();
  }

  initData = () => {
    let barrageData: any[] = [
      { time: 20, content: '这是一条第 20s 发的弹幕' },
      { time: 0, content: '这是一条第 0s 发的弹幕' },
      { time: 10, content: '这是一条第 10s 发的弹幕' },
    ];
    let newMap: any = new Map();
    for (let ele of barrageData) {
      let tempArr: any[] = newMap.get(ele.time);
      if (!tempArr) {
        newMap.set(ele.time, [ele]);
        continue;
      }
      newMap.set(ele.time, [...tempArr, ele]);
    }

    const { channelNum, channelHeight } = this.state;
    let channelTopDistance: any[] = [];
    let channelTimeAccount: any[] = [];
    for(let i = 0; i < channelNum; i++) {
      channelTopDistance.push(channelHeight * i);
      channelTimeAccount.push(0);
    }

    this.setState({
      allBarrages: barrageData,
      barrageTimeMap: newMap,
      channelTopDistance,
      channelTimeAccount
    }, () => {
      this.addBarrage(0);
    })
  }

  startTimer = () => {
    let tempTimer: any = setInterval(() => {
      let nextTime: number = this.state.currentTime + 1;
      this.addBarrage(nextTime);
      this.setState({
        currentTime: nextTime
      })
    }, 1000);
    this.setState({
      timer: tempTimer,
    })
  }

  addBarrage = (nextTime: number) => {
    const { channelTimeAccount, barrageTimeMap, showBarrages } = this.state;
    let currBarrages = barrageTimeMap[nextTime] || [];
    let newShowBarrages = [ ...showBarrages ];
    let newChannelTimeAccount = [...channelTimeAccount];
    // currBarrages.forEach((item: any) => {
    //   let channelIndex = newChannelTimeAccount.findIndex(ele => ele <= item.time);
    //   if (channelIndex)
    // })
    this.setState({
      channelTimeAccount: [],
      showBarrages: newShowBarrages,
    })
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div className="home">
        <div className="top-barrage-wrapper">
          <div className="barrage-channels">
            
          </div>
        </div>
        <div>视频播放内容 {currentTime}</div>
      </div>
    );
  }
}
