import styled from "styled-components";

export default styled.div`
  padding: 10px 30px;

  .pika-table {
    th {
      text-transform: capitalize;
    }

    tr td:first-child {
      text-transform: capitalize;
    }
  }

  .name-block {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 100%;
    }
  }
`;