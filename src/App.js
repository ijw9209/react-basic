import React, { Component } from 'react';
import './App.css';
import TOC from "./Components/TOC";
import ReadContent from "./Components/ReadContent";
import Subject from "./Components/Subject";
import Controll from "./Components/Controll";
import CreateContent from "./Components/CreateContent";
import UpdateContent from "./Components/UpdateContent";

class App extends Component {
  //컴퍼넌트 실행시킬때 제일먼저 
  //초기화 시키고싶은 코드는 constructor 안에 코드를 작성한다
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "Welcome",
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
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }

  }

  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'Welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'Read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add contend to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title , desc:_desc}
        // );
        // 성능 개선시 훨씬 좋음,concat 원본을 바꾸지않고 사용할수있다.
        // concat()을 사용하는이유는 수정할때 원본을 수정하지않고 복제본을 수정하기위해
        // var _contents = this.state.contents.concat(
        //   { id: this.max_content_id, title: _title, desc: _desc }
        // )
        var _contents = Array.from(this.state.contents);
        _contents.push({
          id: this.max_content_id, title: _title, desc: _desc
        });
        this.setState({
          contents: _contents,
          mode: 'Read',
          selected_content_id: this.max_content_id
        });

      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = { id: _id, title: _title, desc: _desc }
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            mode: 'Read'
          });

        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    console.log('App render')
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
        <Controll onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm('really')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < this.state.contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode: 'Welcome',
                contents: _contents
              });
              alert('deleted!')
            }
          } else {

          }
          this.setState({
            mode: _mode
          });
        }.bind(this)} />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
