const renderNestedMap = (map) => (
    Array.from(map.entries()).map(([key, value]) => (
      <div key={key} style={{ marginLeft: '20px' }}>
        <strong>{key}:</strong> {value}
      </div>
    ))
  );

 export const renderEvent = (event, index) => (
    <div key={index} style= {{ p: '2em', minWidth: "1500"}}>
      {Array.from(event.entries()).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value instanceof Map ? renderNestedMap(value) : value}
        </div>
      ))}
    </div>
  );