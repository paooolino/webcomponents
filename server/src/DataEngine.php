<?php
    namespace CMS;
    
    require_once('vendor/autoload.php');
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
        const QUERY_GET_FIELDS              = "SELECT * FROM field_definitions 
                                                LEFT JOIN field_values ON id_definition = idfd
                                                WHERE id_item = ? AND (inheritance = ? OR inheritance = -1)
                                                AND (id_finalitem = ? or id_finalitem IS NULL)";
        const QUERY_GET_PARENT              = "SELECT B.* FROM items AS A
                                                LEFT JOIN items as B ON A.id_parent = B.id
                                                WHERE A.id = ?";
        const QUERY_GET_FIELD               = "SELECT * FROM field_definitions
                                                LEFT JOIN field_values ON id_definition = idfd
                                                WHERE idfd = ? AND id_finalitem = ?";
        const QUERY_INSERT_FIELD            = "INSERT INTO field_values 
                                                (id_definition, id_finalitem, field_value) VALUES (?, ?, ?)";
        const QUERY_UPDATE_FIELD            = "UPDATE field_values SET field_value = ? WHERE idfv = ?";
        
        const QUERY_GET_EXTERNAL_FIELD      = "SELECT * FROM field_values WHERE id_item = ? AND field_name = ?";
        const QUERY_INSERT_EXTERNAL_FIELD   = "INSERT INTO field_values (id_item, field_name, field_value) VALUES (?, ?, ?)";
        const QUERY_UPDATE_EXTERNAL_FIELD   = "UPDATE field_values SET field_value = ? WHERE id_item = ? AND field_name = ?";
        
        public $db;
        
        function __construct($db) {
            $this->db = $db;
        }

        public function auth($username, $password) {
            $rs = $this->db->select(self::QUERY_SELECT_USERS, array(
                $username, md5(md5($password))
            ));
            $row = $rs->fetch(\PDO::FETCH_ASSOC);

            if( !$row )
                return array(
                    "status" => "ko",
                    "error" => "Invalid username or password."
                );
                
            $issuedAt = time();
            $token = array(
                // tokee id
                "jti" => base64_encode(mcrypt_create_iv(32)),
                // issuer
                "iss" => $_SERVER["SERVER_NAME"],
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

            return array(
                "status" => "ok",
                "authcode" => JWT::encode($token, \CMS\AUTH_JWT_KEY),
                "options" => $this->getOptions()
            );
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
         * @param int $id_parent The id of the parent. Pass 0 to retrieve the first-level childs of the tree.
         * @param string $lang A string to filter items by lang field.
         * @param mixed $offset Not yet used.
         * @param mixed $howmany Not yet used.
         * @param mixed $filter Not yet used.
         * @param mixed $search Not yet used.
         * @param mixed $orderby Not yet used.
         *
         * @uses getFields to retrieve the full list of associated field for each item.
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
                $items[$i]["fields"] = $this->getFields($items[$i]["id"]);
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
            $item["fields"] = $this->getFields($item["id"]);

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
        
        private function getOptions() {
            $options = array();
            $rs = $this->db->select(self::QUERY_SELECT_OPTIONS, array());
            while($row = $rs->fetch(\PDO::FETCH_ASSOC)) {
                $options[$row["option_name"]] = json_decode($row["option_value"]);
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
            $parent = $rs->fetch(\PDO::FETCH_ASSOC);
            
            return $parent;
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
         * Retrieve the field definitions and values for an item. 
         *
         * @param int $id The id of the item.
         *
         * @uses getParents to retrieve the full list of parents in order to check for defined fields on them.
         * @uses QUERY_GET_FIELDS to retrieve the fields defined on the item.
         *
         *
         * @return array An associative array of fields with their values.
         */         
        private function getFields($id) {
            $ids = array($id);
            
            // look for parents
            $parents = $this->getParents($id);
            foreach($parents as $parent) {
                array_push($ids, $parent["id"]);
            }
            
            // for each id, look for fields.
            $fields = array();
            $inheritance_level = 0;
            foreach($ids as $id) {
                $rs = $this->db->select(self::QUERY_GET_FIELDS, array(
                    $id,
                    $inheritance_level,
                    $id
                ));
                while($row = $rs->fetch(\PDO::FETCH_ASSOC)) {
                    array_push($fields, $row);
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
                default:
                    // not found any field matching this name.
                    return "Field not valid.";
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
                $this->db->update(self::QUERY_UPDATE_EXTERNAL_FIELD, array(
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
    