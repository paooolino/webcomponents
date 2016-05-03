import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from './DataTable';
import { fetchItems, addItem, selectItem, deleteItem } from '../actions/itemsActions';

class AppBodyContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <DataTable 
                items={this.props.items} 
                isFetching={this.props.isFetching}
                errorMessage={this.props.errorMessage}
                last_added_id={this.props.last_added_id}
                last_deleted_id={this.props.last_deleted_id}
                selected_id={this.props.selected_id}
                addItemHandler={this.addItemHandler}
                deleteItemHandler={this.deleteItemHandler}
                selectItemHandler={this.selectItemHandler}
            />
        );
    }
    
    componentDidMount() {
        this.props.dispatch(fetchItems(0));
    }
    
    addItemHandler = () => {
        const id_parent = this.props.selected_id;
        this.props.dispatch(addItem(id_parent));
    }
    
    deleteItemHandler = (id) => {
        this.props.dispatch(deleteItem(id));
    }
    
    selectItemHandler = (id) => {
        this.props.dispatch(selectItem(id));
    }
}
   
const mapStateToProps = function(store) {
    return {
        isFetching: store.items.isFetching,
        items: store.items.items,
        errorMessage: store.items.errorMessage,
        selected_id: store.items.selected_id,
        last_added_id: store.items.last_added_id,
        last_deleted_id: store.items.last_deleted_id
    };
};

export default connect(
    mapStateToProps
)(AppBodyContainer);
