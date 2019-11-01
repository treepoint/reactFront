import React from "react";

class Button extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "4px" }}>
          <input
            type="submit"
            style={{
              backgroundColor: "rgb(70, 132, 156)",
              color: "#fff",
              padding: "6px 12px",
              border: "0",
              borderRadius: "2px",
              fontfamily: "sans-serif",
              fontsize: "14px"
            }}
            value={this.props.value}
          />
        </p>
      </div>
    );
  }
}

export default Button;
