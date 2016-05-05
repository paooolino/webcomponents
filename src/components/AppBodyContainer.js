import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from './DataTable';
import { fetchItems, addItem, selectItem, deleteItem, expandItem } from '../actions/itemsActions';

class AppBodyContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <DataTable 
                    items={this.props.items} 
                    parent={this.props.parent}
                    isFetching={this.props.isFetching}
                    errorMessage={this.props.errorMessage}
                    last_added_id={this.props.last_added_id}
                    last_deleted_id={this.props.last_deleted_id}
                    selected_id={this.props.selected_id}
                    addItemHandler={this.addItemHandler}
                    deleteItemHandler={this.deleteItemHandler}
                    selectItemHandler={this.selectItemHandler}
                    contextMenuHandler={this.contextMenuHandler}
                    expandItemHandler={this.expandItemHandler}
                />
            </div>
        );
    }
    
    componentDidMount() {
        this.props.dispatch(fetchItems(this.props.selected_id_parent));
    }
    
    componentWillReceiveProps(nextProps) {
        // senza la condizione !isFetching viene fatto il dispatch di questa 
        //  azione due volte perchè questo codice viene eseguito anche in 
        //  risposta al cambiamento di stato determinato da fetchItems
        // così invece se sta già facendo il fetch evito di rilanciarlo
        if( nextProps.invalidated && !nextProps.isFetching ) {
            this.props.dispatch(fetchItems(nextProps.selected_id_parent));   
        }
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
    
    expandItemHandler = (id) => {
        this.props.dispatch(expandItem(id));
    }
    
    contextMenuHandler = (id, id_parent, menuaction) => {
        switch(menuaction) {
            case "addChild":
                this.props.dispatch(addItem(id));
                break;
            case "addSibling":
                this.props.dispatch(addItem(id_parent));
                break;
            case "deleteItem":
                this.props.dispatch(deleteItem(id));
                break;
        }
    }
}
   
const mapStateToProps = function(store) {
    return {
        isFetching: store.items.isFetching,
        items: store.items.items,
        parent: store.items.parent,
        errorMessage: store.items.errorMessage,
        selected_id: store.items.selected_id,
        last_added_id: store.items.last_added_id,
        last_deleted_id: store.items.last_deleted_id,
        invalidated: store.items.invalidated,
        selected_id_parent: store.items.selected_id_parent
    };
};

export default connect(
    mapStateToProps
)(AppBodyContainer);


