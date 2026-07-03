node_modules 다시 설치: npm install
server 띄우기: npm run dev

router:npm install react-router-dom
CSS(스타일): npm install styled-components
아이콘 : npm install react-icons
redux: npm install react-redux @reduxjs/toolkit
json-server(RestfulAPI): npm install -g json-server
json-server 실행(node) : json-server --watch db.json --port 3001
api 라이브러리: npm install axios
query 라이브러리 : npm install @tanstack/react-query
antd 라이브러리 : npm install antd ag-grid-react ag-grid-community
chart 라이브러리 : npm install chart.js react-chartjs-2

reducer
dispatch : reduce 함수 실행
action : 전체 object 인수
action.type : 함수 타입 (어떤 함수인지 지정)
action.payload : state 변화 시킬 수 있는 인수


useState => useReducer => useContext => redux(slice, query)

context : state, 내부 함수(reducers)
redux : state, 내부함수(reducers), 외부함수(extraReducers: api)


Restful API
get 전체 방식   : url         => return : 테이블(json)
get 하나 데이터 : url+id      => return : object(row)
post          : url, obj    => return : object
put           : url+id, obj => return : object
delete        : url+id      => return : id