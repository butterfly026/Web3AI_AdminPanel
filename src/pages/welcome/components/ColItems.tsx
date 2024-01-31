const styles: any = {
  items: {
    width: "100%",
    height: "70px",
    lineHeight: "70px",
    textAlign: "center",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
};
export default function ColItems({ title, bgcolor }: any) {
  return (
    <div style={{ backgroundColor: bgcolor, ...styles.items }}>{title}</div>
  );
}
