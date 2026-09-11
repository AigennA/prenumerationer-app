import PrenumerationItem from './PrenumerationItem';

const dummyData = [
  { id: 1, serviceName: "Netflix", note: "Månadsplan", isActive: true },
  { id: 2, serviceName: "Spotify", note: "Årsplan", isActive: false },
];

function PrenumerationList() {
  return (
    <div className="list">
      {dummyData.map(item => (
        <PrenumerationItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default PrenumerationList;