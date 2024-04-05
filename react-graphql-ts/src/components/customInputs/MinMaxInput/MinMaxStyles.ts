import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  min-width: 300px;
  margin: 10px 20px;

  input {
    border-radius: 5px;
    max-width: 50px;
  }

  .title {
    margin-right: 10px;
    font-weight: 800;
    white-space: nowrap;
  }

  .mark {
    margin: 0 5px;
  }
`;