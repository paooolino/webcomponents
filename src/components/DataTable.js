import React, {PropTypes, Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

import '../css/DataTable.css';

const DataTableItem = ContextMenuLayer("DataTableItemContextMenu")(({name, id}) => {
    return (
        <div className="datatable_element_inner">
            {id} {name}
        </div>
    );
});

class DataTableItemContextMenu extends Component {
    render() {
        return(
            <ContextMenu identifier="DataTableItemContextMenu">
                <MenuItem data={{}} onClick={this.handleClick}>
                    Aggiungi figlio
                </MenuItem>
                <MenuItem data={{}} onClick={this.handleClick}>
                    Aggiungi fratello
                </MenuItem>
                <MenuItem data={{}} onClick={this.handleClick}>
                    Elimina elemento
                </MenuItem>
            </ContextMenu>
        );
    }
    
    handleClick(e, data) {
        console.log(data);
    }
}

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
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        let classes = [];
                        if( item.id == selected_id )
                            classes.push("selected");
                        if( item.id == last_added_id )
                            classes.push("last_added");
                        return(
                            <tr onClick={()=>selectItemHandler(item.id)} className={classes.join(" ")} key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <p>
        { isFetching && 
            <span className="note">Fetching...</span>
        }
        {errorMessage}
        </p>
        
        <DataTableItemContextMenu />
    </div>
);

DataTable.propTypes = {
    addItemHandler: PropTypes.func.isRequired,
    selectItemHandler: PropTypes.func.isRequired
};

export default DataTable;
