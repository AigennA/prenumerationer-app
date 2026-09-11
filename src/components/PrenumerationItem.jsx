function PrenumerationItem({ data }) {
  return (
    <div className="item">
      <h3>{data.serviceName}</h3>
      <p>{data.note}</p>
      <span>{data.isActive ? "Aktiv" : "Avslutad"}</span>
    </div>
  );
}

export default PrenumerationItem;