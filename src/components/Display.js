export function Display({ value, size }) {
  const style = {
    fontSize: `${String(size)}px`,
  };
  return <input id="display" disabled value={value} style={style}></input>;
}
