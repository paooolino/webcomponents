<?php
    namespace CMS;
    
    require_once(__DIR__.'/../vendor/autoload.php');
    use \Firebase\JWT\JWT;

    /**
     *  Exposes public methods to manage the database elements.   
     */
    class DataEngine {

        const QUERY_SELECT_USERS            = "SELECT * FROM users WHERE username = ? AND password = ?";
        const QUERY_SELECT_ITEMS_BY_PARENT  = "SELECT * FROM items WHERE id_parent = ? AND lang = ?";
        const QUERY_SELECT_ITEM             = "SELECT * FROM items WHERE id = ?";
        const QUERY_ADD_ITEM                = "INSERT INTO items (id_parent, lang) VALUES (?, ?)";
        const QUERY_DELETE_ITEM             = "DELETE FROM items WHERE id = ?";
        const QUERY_UPDATE_NAME             = "UPDATE items SET name = ? WHERE id = ?";
        const QUERY_UPDATE_SLUG             = "UPDATE items SET slug = ? WHERE id = ?";
        const QUERY_SELECT_OPTIONS          = "SELECT * FROM options";
        const QUERY_GET_AVAILABLE_FIELDS    = "
            SELECT * FROM field_definitions
            WHERE id_item = ? AND (inheritance = ? OR inheritance = -1)
        ";
        const QUERY_GET_PARENT              = "
            SELECT B.* FROM items AS A
            JOIN items as B ON A.id_parent = B.id
            WHERE A.id = ?
        ";
        const QUERY_GET_FIELD_VALUE         = "SELECT * FROM field_values WHERE id_item = ? AND field_name = ?";
        const QUERY_GET_FIELD               = "SELECT * FROM field_definitions
                                                LEFT JOIN field_values ON id_definition = idfd
                                                WHERE idfd = ? AND id_finalitem = ?";
        const QUERY_INSERT_FIELD            = "INSERT INTO field_values 
                                                (id_definition, id_finalitem, field_value) VALUES (?, ?, ?)";
        const QUERY_UPDATE_FIELD            = "UPDATE field_values SET field_value = ? WHERE idfv = ?";
        
        const QUERY_GET_EXTERNAL_FIELD      = "SELECT * FROM field_values WHERE id_item = ? AND field_name = ?";
        const QUERY_INSERT_EXTERNAL_FIELD   = "INSERT INTO field_values (id_item, field_name, field_value) VALUES (?, ?, ?)";
        const QUERY_UPDATE_EXTERNAL_FIELD   = "UPDATE field_values SET field_value = ? WHERE id_item = ? AND field_name = ?";
        
        const QUERY_ADD_FIELD_DEFINITION    = "INSERT INTO field_definitions (id_item, field_name, field_type, field_options, inheritance) VALUES (?, ?, ?, ?, ?)";
        
        public $db;
 
        /**
         * @codeCoverageIgnore
         */ 
        function __construct($db) {
            $this->db = $db;
        }

        /**
         * User authentication
         *
         * @param string $username The field name.
         * @param string $password The field value.
         *
         * @uses QUERY_SELECT_USERS
         *
         * @return string The JWT token, or empty string if failure.
         */ 
        public function auth($username, $password) {
            $rs = $this->db->select(self::QUERY_SELECT_USERS, array(
                $username, md5(md5($password))
            ));
            $row = $rs->fetch(\PDO::FETCH_ASSOC);

            if( !$row )
                return "";
                
            $issuedAt = time();
            $token = array(
                // tokee id
                "jti" => base64_encode(mcrypt_create_iv(32)),
                // issued at
                "iat" => $issuedAt,
                // not before
                "nbf" => $issuedAt + 10,
                // expire
                "exp" => $issuedAt + 60,
                // payload
                "data" => array(
                    "idu" => $row["idu"],
                    "username" => $row["username"]
                )
            );

            return JWT::encode($token, \CMS\AUTH_JWT_KEY);
        }

        /**
         * Save a field value associated to an item.
         *
         * @param int $id The id of the item.
         * @param string $field_name The field name.
         * @param string $field_value The field value.
         *
         * @uses saveIncludedItemField to save fields included in the items table.
         * @uses saveExternalItemField to save fields in the external field_values table.
         *
         * @return mixed The number of affected rows or an error string on failure.
         */ 
        public function saveItemField($id, $field_name, $field_value) {
            // check if the field is included in the items table or is external.
            $included_fields = array("name", "slug");
            
            if( in_array($field_name, $included_fields) ) {
                return $this->saveIncludedItemField($id, $field_name, $field_value);
            } else {
                return $this->saveExternalItemField($id, $field_name, $field_value);
            }
        }

        /**
         * Return a list of items having the same parent.
         *
         * This method is intended to be used only by back-end calls.
         * It make uses of the getFieldsWithDefsInfos to get all the needed informations for the UI.
         *
         * @param int $id_parent The id of the parent. Pass 0 to retrieve the first-level childs of the tree.
         * @param string $lang A string to filter items by lang field.
         * @param mixed $offset Not yet used.
         * @param mixed $howmany Not yet used.
         * @param mixed $filter Not yet used.
         * @param mixed $search Not yet used.
         * @param mixed $orderby Not yet used.
         *
         * @uses getFieldsWithDefsInfos to retrieve the full list of associated field for each item.
         * @uses QUERY_SELECT_ITEMS_BY_PARENT to get the items having the specified parent.
         *
         * @return array An array of items.
         */        
        public function fetchItems($id_parent, $lang, $offset=null, $howmany=null, $filter=null, $search=null, $orderby=null) {
            $rs = $this->db->select(self::QUERY_SELECT_ITEMS_BY_PARENT, array(
                $id_parent, $lang
            ));
            $items = $rs->fetchAll(\PDO::FETCH_ASSOC);
            
            // get the complete fields
            for($i = 0; $i < count($items); $i++) {
                $withDefs = true;
                $items[$i]["fields"] = $this->getFields($items[$i]["id"], $withDefs);
            }
            
            return $items;
        }
        
        /**
         * Fetches a single item from the database by id.
         *
         * @param int $id The id of the element to retrieve.
         *
         * @uses getFields to retrieve the full list of associated field for the item.
         * @uses QUERY_SELECT_ITEM to get the item.
         *
         * @return array An associative array containing the field values.
         */
        public function fetchItem($id) {          
            $rs = $this->db->select(self::QUERY_SELECT_ITEM, array(
                $id
            ));
            $item = $rs->fetch(\PDO::FETCH_ASSOC);
            
            // get the complete fields
            if( $item ) {
                $item["fields"] = $this->getFields($id);
            }
            
            return $item;
        }
        
        /**
         * Add an item.
         *
         * @param int $id_parent The id of the parent element.
         * @param string $lang The lang of the item.
         *
         * @uses QUERY_ADD_ITEM to insert an item.
         *
         * @return int The id of the inserted element.
         */
        public function addItem($id_parent, $lang) {
            $last_id = $this->db->insert(self::QUERY_ADD_ITEM, array(
                $id_parent, $lang
            ));
            
            return $last_id;
        }
        
        /**
         * Delete an item.
         *
         * @param int $id_parent The id of the parent element.
         * @param string $lang The lang of the item.
         *
         * @uses QUERY_DELETE_ITEM to delete the item.
         *
         * @return int 1
         */
        public function deleteItem($id) {
            $affected_rows = $this->db->modify(self::QUERY_DELETE_ITEM, array($id));

            return $affected_rows;    
        }

        /**
         * Add a field definition.
         *
         * @param int $id_item
         * @param string $field_name
         * @param string $field_type The type of the field. Should be one of the following: text, textarea, image, attachment, select, multiselect
         * @param string $field_options
         * @param int $inheritance
         *
         * @uses QUERY_ADD_FIELD_DEFINITION
         *
         * @return int 1
         */        
        public function addFieldDefinition($id_item, $field_name, $field_type, $field_options, $inheritance) {
            $rs = $this->db->insert(self::QUERY_ADD_FIELD_DEFINITION, array(
                $id_item, $field_name, $field_type, $field_options, $inheritance
            ));
            return 1;
        }
        
        /**
         * Return the defined general options for the CMS.
         *
         * @uses QUERY_SELECT_OPTIONS
         *
         * @return array
         */ 
        public function getOptions() {
            $options = array();
            $rs = $this->db->select(self::QUERY_SELECT_OPTIONS, array());
            while($row = $rs->fetch(\PDO::FETCH_ASSOC)) {
                $options[$row["option_name"]] = json_decode($row["option_value"], true);
            }
            return $options;
        }
        
        /**
        * Get an external field record.
        *
        * @param int $id_item The id of the item.
        * @param string $field_name The name of the field to retrieve.
        *
        * @uses QUERY_GET_EXTERNAL_FIELD to retrieve the field record.
        *
        * @return array|NULL The external field or NULL on failure.
        */  
        private function getExternalField($id_item, $field_name) {
            $rs = $this->db->select(self::QUERY_GET_EXTERNAL_FIELD, array(
                $id_item, $field_name
            ));
            return $rs->fetch(\PDO::FETCH_ASSOC);
        }
        
        /**
         * Retrieve the parent for an item.
         *
         * @param int $id The id of the item.
         *
         * @uses QUERY_GET_PARENT to retrieve the parent of the item.
         *
         * @return array A list of parents, the nearest first.
         */  
        private function getParent($id) {
            $rs = $this->db->select(self::QUERY_GET_PARENT, array(
                $id
            ));
            return $rs->fetch(\PDO::FETCH_ASSOC);
        }
        
        /**
         * Retrieve the list of parents for an item.
         *
         * @param int $id The id of the item.
         *
         * @uses getParent to retrieve the parent item.
         *
         * @return array A list of parents, the nearest first.
         */  
        private function getParents($id) {
            $parents = array();
            
            $current_id = $id;
            while($parent = $this->getParent($current_id)) {
                $current_id = $parent["id"];
                array_push($parents, $parent);
            }
            
            return $parents;
        }

        /**
         * Retrieve the value for an external field. 
         *
         * @param int $id The id of the item.
         * @param string $field_name The name of the field to retrieve.
         *
         * @uses QUERY_GET_FIELD_VALUE to retrieve the fields defined on the item.
         *
         * @return string The field value.
         */        
        private function getFieldValue($id, $field_name) {
            $rs = $this->db->select(self::QUERY_GET_FIELD_VALUE, array(
                $id, $field_name
            ));
            $row = $rs->fetch(\PDO::FETCH_ASSOC);
            
            return $row ? $row["field_value"] : ""; 
        }
        
        /**
         * Retrieve the field values for an item. 
         *
         * @param int $id The id of the item.
         * @withDefs bool Whether return the field definitions together
         *
         * @uses getParents to retrieve the full list of parents in order to check for defined fields on them.
         * @uses getFieldValue to retrieve the value for the found external fields.
         * @uses QUERY_GET_AVAILABLE_FIELDS to retrieve the fields defined on the item.
         *
         * @return array An associative array of fields with their values.
         */         
        private function getFields($id, $withDefs=false) {
            $ids = array($id);
            
            // look for parents
            $parents = $this->getParents($id);
            foreach($parents as $parent) {
                array_push($ids, $parent["id"]);
            }
            
            // for each id, look for fields.
            $fields = array();
            $inheritance_level = 0;
            foreach($ids as $the_id) {
                $rs = $this->db->select(self::QUERY_GET_AVAILABLE_FIELDS, array(
                    $the_id,
                    $inheritance_level
                ));
                while($row = $rs->fetch(\PDO::FETCH_ASSOC)) {
                    if( $withDefs ) {
                        $row["field_value"] = $this->getFieldValue($id, $row["field_name"]);
                        array_push($fields, $row);
                    } else {
                        $fields[$row["field_name"]] = $this->getFieldValue($id, $row["field_name"]);
                    }
                }
                
                $inheritance_level++;
            }
            
            return $fields;
        }
        
        /**
         * Save a value in the items table.
         *
         * @param int $id The id of the item.
         * @param string $field_name The field name.
         * @param string $field_value The field value.
         *
         * @uses QUERY_UPDATE_NAME to update the "name" field.
         * @uses QUERY_UPDATE_SLUG to update the "slug" field.
         *
         * @return mixed The number of affected rows or an error string on failure.
         */ 
        private function saveIncludedItemField($id, $field_name, $field_value) {
            $query = "";
            switch( $field_name ) {
                case "name":
                    $query = self::QUERY_UPDATE_NAME;
                    break;
                case "slug":
                    $query = self::QUERY_UPDATE_SLUG;
                    break;
            }
            $affected_rows = $this->db->modify($query, array(
                $field_value, $id
            ));
            
            return $affected_rows;
        }
 
        /**
         * Save a value in the field_values table.
         *
         * @param int $id The id of the item.
         * @param string $field_name The field name.
         * @param string $field_value The field value.
         *
         * @uses getExternalField to check if the external field has been used yet.
         * @uses QUERY_UPDATE_EXTERNAL_FIELD
         * @uses QUERY_INSERT_EXTERNAL_FIELD
         *
         * @return int 1
         */  
        private function saveExternalItemField($id, $field_name, $field_value) {
            if( $this->getExternalField($id, $field_name) ) {
                $this->db->modify(self::QUERY_UPDATE_EXTERNAL_FIELD, array(
                    $field_value, $id, $field_name
                ));
                return 1;
            } else {
                $this->db->insert(self::QUERY_INSERT_EXTERNAL_FIELD, array(
                    $id, $field_name, $field_value
                ));
                return 1;
            }
        }    
    }
    