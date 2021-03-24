const theme = {
  flexMixin: (direction, justify, align) => `
     display: flex ;
    justify-content: ${justify ? justify : "space-between"};
     align-items:  ${align ? align : "center"};
     flex-direction: ${direction ? direction : "row"};
     `,
};

export default theme;
