import React from "react";

const TEST_ARRAY = [
  {
    foo: "foo",
    bar: "bar"
  },
  {
    foo: "foo2",
    bar: "bar"
  }
];

class TestArray extends React.Component {
  render() {
    var testArray = TEST_ARRAY.map(testArray => testArray.foo);

    console.log(testArray);

    return (
      <div>
        <label className="testArray">kek</label>
      </div>
    );
  }
}

export default TestArray;
