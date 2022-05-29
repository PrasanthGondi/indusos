import { Component } from "react";
import "./index.css";

const emojiList = [
  { id: "::happy::", name: "happy", hash: "😁" },
  { id: "::smiley::", name: "smiley", hash: "😊" },
  { id: "::sad::", name: "sad", hash: "😥" },
];

class Components extends Component {
  state = { l1: emojiList, in1: "" };

  SumbitButton = async () => {
    const { in1 } = this.state;
    const inputvalue = { inputValue: in1 };
    const url = "https://emojitextindusos.herokuapp.com/";
    const options = {
      method: "POST",
      body: JSON.stringify(inputvalue),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  };

  change = (event) => {
    const value = event.target.value;
    const { l1 } = this.state;
    const item = l1.filter((n) => value.includes(n.id));
    if (item.length !== 0) {
      const invalue = value.replace(item[0].id, item[0].hash);
      this.setState({ in1: invalue });
    } else {
      this.setState({ in1: value });
    }
  };

  pd = (event) => {
    event.preventDefault();
  };

  render() {
    const { in1 } = this.state;
    return (
      <div className="d1">
        <h1>Text To Emoji Replacer</h1>
        <form className="form1" onSubmit={this.pd}>
          <input
            type="input"
            value={in1}
            className="in1"
            onChange={this.change}
          />
          <br />
          <button type="button" className="bt1" onClick={this.SumbitButton}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Components;
