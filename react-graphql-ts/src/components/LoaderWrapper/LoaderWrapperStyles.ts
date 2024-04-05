import styled from 'styled-components';

export default styled.div`
  position: relative;
  height: 100%;

  .loading-block {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .child-blur {
    filter: blur(5px);
  }
`;