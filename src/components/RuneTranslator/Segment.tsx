const width = 30 * Math.sqrt(2);

export const Segment = {
  verticalLeft: (
    <div
      style={{ width: "30px", height: "30px", borderLeft: "2px solid #a98de0" }}
    />
  ),
  verticalRight: (
    <div
      style={{
        width: "30px",
        height: "30px",
        borderRight: "2px solid #a98de0",
      }}
    />
  ),
  diagonalDown: (
    <div
      style={{
        width: `${width}px`,
        height: `${width}px`,
        borderLeft: "2px solid #a98de0",
        position: "relative",
        transform: "rotate(-45deg)",
        transformOrigin: "top left",
      }}
    />
  ),
  diagonalUp: (
    <div
      style={{
        width: `${width}px`,
        height: `${width}px`,
        borderTop: "2px solid #a98de0",
        position: "relative",
        transform: "rotate(-45deg)",
        transformOrigin: "top left",
      }}
    />
  ),
  horizontalTop: (
    <div
      style={{
        marginLeft: "2px",
        width: "30px",
        height: "30px",
        borderTop: "2px solid #a98de0",
      }}
    />
  ),
  horizontalBot: (
    <div
      style={{
        marginLeft: "2px",
        width: "30px",
        height: "30px",
        borderBottom: "2px solid #a98de0",
      }}
    />
  ),
  placeholder: (
    <div style={{ width: "30px", height: "30px", border: "none" }} />
  ),
};
