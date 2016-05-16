import React, {PropTypes} from 'react';

import '../css/ItemCard.css';

// the main component.
const ItemCard = ({
    item, changeHandler, blurHandler
}) => {
    return(
        <div className="itemcard inner">
            <div className="formRow">
                {item.id}
            </div>
            <div className="formRow">
                <div className="formLabel">Name</div>
                <div className="formField">
                    <input type="text" name="name" value={item.name} 
                        onChange={changeHandler} 
                        onBlur={blurHandler}
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="formLabel">Slug</div>
                <div className="formField">
                    <input type="text" name="slug" value={item.slug} 
                        onChange={changeHandler} 
                        onBlur={blurHandler}
                    />
                </div>
            </div>
            {item.fields.map((field) => {
                return(
                    <div key={field.idfd} className="formRow">
                        <div className="formLabel">{field.field_name}</div>
                        <div className="formField">
                            <input type="text" name={field.field_name} value={field.field_value} 
                                onChange={changeHandler} 
                                onBlur={blurHandler}
                            />
                        </div>                        
                    </div>
                );
            })}
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
    blurHandler: PropTypes.func.isRequired
};

export default ItemCard;
