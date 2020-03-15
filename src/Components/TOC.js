import React, { Component } from 'react';


class TOC extends Component {
    // shouldComponentUpdate(newProps(바뀐값), newState(현재값)) : 렌더 함수가 실행될지 실행되지 않을지를 개발자가 결정할수 있도록 특수한 약속의 함수
    shouldComponentUpdate(newProps, newState) {
        console.log('===> TOC render shouldComponentUpdate'
            , newProps.data
            , this.props.data
        );
        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        console.log('====>TOC render')
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while (i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a
                        href={"/content/" + data[i].id}
                        data-id={data[i].id}
                        onClick={function (e) {
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id);
                        }.bind(this)}>
                        {/* bind(this , 값)값을넣어주면 그 함수의 맨처음 매개변수로 값이 들어간다. */}
                        {data[i].title}</a>
                </li>);
            i = i + 1;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;