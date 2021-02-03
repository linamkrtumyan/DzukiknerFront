// import react from "react";
import { Table } from "react-bootstrap";

function FeedingHistory({ foodHistory }) {
  return (
    <>
      <div
        className="container"
        style={{
          paddingTop: "50px",
          backgroundColor: "white",
          height: "110vh",
        }}
      >
        <Table bordered hover style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th>Կերի տեսակ</th>
              <th>Քաշ </th>
              <th>Գործակից</th>
              <th>Ամսաթիվ</th>
            </tr>
          </thead>
          <tbody>
            {foodHistory.length > 0 ? (
              foodHistory.map((food, index) => {
                return (
                  <tr key={index}>
                    <td>{food.foodName}</td>
                    <td>{food.weight}</td>
                    <td>{food.coefficient}</td>
                    <td>{food.insertedDate}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Տվյաներ չկան</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default FeedingHistory;
