export const mapStateToProps = (state) => {
    return {
        app: state.app,
        modal: state.modal,
        filter: state.filter,
        home: state.home,
        drawer: state.drawer,
        shop: state.shop,
        product: state.product,
    };
};
