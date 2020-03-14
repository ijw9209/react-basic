import React, { Component } from 'react';
import './App.css';
import TOC from "./Components/TOC";
import Content from "./Components/Content";
import Subject from "./Components/Subject";


class App extends Component {
  //컴퍼넌트 실행시킬때 제일먼저 
  //초기화 시키고싶은 코드는 constructor 안에 코드를 작성한다
  constructor(props) {
    super(props);
    this.state = {
      mode: "Read",
      selected_content_id: 2,
      subject: { title: 'WEB', sub: 'Wolrd Wide WEB!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interative' }
      ]
    }
  }
  // state : react에서 props의 값이나 , state값이 바뀌면 state를 
  // 가지고있는 컴포넌트의 render() 함수가 다시호출됨
  // 그 하위의 컴포넌트의 렌더들도 다시호출됨
  render() {
    var _title, _desc = null;
    if (this.state.mode === 'Welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'Read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }
    //onChangePage이벤트 컴포넌트안에서 링크클릭시 이벤트에 설치한 함수를 호출하도록 만듬 
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: 'Welcome'
            })
          }.bind(this)}></Subject>
        {/*
            //위처럼 쓰면 에러
            // e.preventDefault a 태그의 동작을 멈추게함
            // debugger : 크롬개발자 도구를 켜놓으면 이부분에서 실행을 멈춤
            // bind() : App 이라는 컴포넌트의 자체를 가르키는 객체를 함수 안으로 주입 
            // this가 그객체가 되게함
          */}
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'Read',
              selected_content_id: Number(id)
            })
          }.bind(this)}
          data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
