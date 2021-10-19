import * as React from 'react';
import './index.scss';

interface IState {
  channels: any[];
}

export default class Home extends React.PureComponent<any, IState> {
  state: IState = {
    channels: [],

  };

  render() {
    return (
      <div className="home">
        <div className="top-barrage-wrapper"></div>
        <div>视频播放内容</div>
      </div>
    );
  }
}
