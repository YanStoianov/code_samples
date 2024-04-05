import styled from "styled-components";

export default styled.div`
  .main-layout {
    .layout-content {
      min-height: calc(100vh - 64px - 70px);
    }

    .layout-logo {
      max-height: 54px;
    }

    .layout-header {
      display: flex;
      align-items: center;

      .layout-title {
        margin: 0 auto 0 auto;
        color: #fcfcfc;
        font-size: 30px;
      }
    }

    .layout-footer {
      display: flex;
      justify-content: center;
    }

    .approved {
      color: green;
    }

    .disapproved {
      color: red;
    }
  }
`;