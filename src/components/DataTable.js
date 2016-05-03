import React, {PropTypes} from 'react';

import '../css/DataTable.css';

const DataTable = ({
    items, isFetching, errorMessage, last_added_id, last_deleted_id, 
    selected_id, addItemHandler, deleteItemHandler, selectItemHandler
}) => (
    <div className="datatable inner">
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
    </div>
);

DataTable.propTypes = {
    addItemHandler: PropTypes.func.isRequired,
    selectItemHandler: PropTypes.func.isRequired
};

export default DataTable;
