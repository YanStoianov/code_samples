import styled from "styled-components";

export default styled.div`
  .filters-block {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;

    .search {
      max-width: 300px;
      border-radius: 5px;
    }

    .types-select {
      min-width: 150px;
      max-width: 300px;
      margin: 0 10px;

      .ant-select-selector {
        border-radius: 5px;
      }
    }
  }

  .additional-cursor {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    background: rgb(0 0 0 / 8%);

    .cursor-title {
      color: gray;
      padding: 0 10px;
    }

    span {
      font-size: 30px;
      color: #001528;
    }
  }

  .flex-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .additional-filters-block {
    padding-bottom: 20px;
    background: rgb(0 0 0 / 8%);

    .newRow {
      width: 100%;
    }
  }
`;