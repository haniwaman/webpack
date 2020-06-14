import "./sass/style.scss"; // Sassのエントリーポイント

const test = ({ foo, bar, ...others }) => {
  console.log(others);
}

const keyName = 'hei';

let params = {
  foo: 'fffff',
  bar: 'baaaaa',
  baz: 'zzzzzz',
};

test(params);
// window.alert('webpack test in my-main.js');
