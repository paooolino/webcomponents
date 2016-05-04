import React, {PropTypes, Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

import '../css/DataTable.css';

// the target component for the context menu.
const DataTableItem = ContextMenuLayer("DataTableItemContextMenu", (props) => ({
        id: props.id,
        id_parent: props.id_parent
    }))(({name, id}) => {
    return (
        <div className="datatable_element_inner">
            {id} {name}
        </div>
    );
});

// the context menu.
class DataTableItemContextMenu extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <ContextMenu identifier="DataTableItemContextMenu">
                <MenuItem data={{action:'addChild'}} onClick={this.handleClick}>
                    Aggiungi figlio
                </MenuItem>
                <MenuItem data={{action:'addSibling'}} onClick={this.handleClick}>
                    Aggiungi fratello
                </MenuItem>
                <MenuItem data={{action:'deleteItem'}} onClick={this.handleClick}>
                    Elimina elemento
                </MenuItem>
            </ContextMenu>
        );
    }
    
    handleClick = (e, data) => {
        this.props.contextMenuHandler(data.id, data.id_parent, data.action);
    }
}

// the main component.
const DataTable = ({
    items, isFetching, errorMessage, last_added_id, last_deleted_id, 
    selected_id, addItemHandler, deleteItemHandler, selectItemHandler,
    contextMenuHandler
}) => (
    <div className="datatable inner">
    
        {items.map(item => {
            let classes = ["datatable_element"];
            if( item.id == selected_id )
                classes.push("selected");
            if( item.id == last_added_id )
                classes.push("last_added");
            return(
                <div 
                    className={classes.join(" ")}
                    key={item.id}
                    onClick={()=>selectItemHandler(item.id)}
                >
                    <DataTableItem 
                        name={item.name}
                        id_parent={item.id_parent}
                        id={item.id}
                    />
                </div>
            );
        })}
        
        <p>
            DataTable 
        </p>
        <p>
            <button onClick={addItemHandler}>New item</button>
        </p>
        <div>
            n.items: {items.length}
        </div>
        <p>
        { isFetching && 
            <span className="note">Fetching...</span>
        }
        {errorMessage}
        </p>
        
        <DataTableItemContextMenu contextMenuHandler={contextMenuHandler} />
    </div>
);

DataTable.propTypes = {
    addItemHandler: PropTypes.func.isRequired,
    selectItemHandler: PropTypes.func.isRequired,
    contextMenuHandler: PropTypes.func.isRequired
};

export default DataTable;
