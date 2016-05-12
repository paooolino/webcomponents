<?php
    namespace CMS;
    
    require_once('vendor/autoload.php');
    use \Firebase\JWT\JWT;

	/**
	 * A class for managing database data.
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
		
		public function saveItemField($id, $field_name, $field_value) {
            $query = "";
            switch( $field_name ) {
                case "name":
                    $query = self::QUERY_UPDATE_NAME;
                    break;
                case "slug":
                    $query = self::QUERY_UPDATE_SLUG;
                    break;
                default:
                    if($definition = $this->getFieldDefinition($id, $field_name)) {
                        if($field = $this->getField($definition["idfd"], $id)) {
                            // insert new field value    
                            $affected_rows = $this->db->modify(
                                self::QUERY_INSERT_FIELD,
                                array(
                                    $definition["idfd"], $id, $field_value
                                )
                            );
                            if( $affected_rows == 1 ) {
                    		    return array(
                    		        "status" => "ok",
                    		        "affected_rows" => intval($affected_rows)
                    		    ); 
                            }
                        } else {
                            // update existent field value
                            $affected_rows = $this->db->modify(
                                self::QUERY_UPDATE_FIELD,
                                array(
                                    $field_value, $definition["idfv"]
                                )
                            );
                            if( $affected_rows == 1 ) {
                    		    return array(
                    		        "status" => "ok",
                    		        "affected_rows" => intval($affected_rows)
                    		    ); 
                            }
                        }
                    }
                    
                    // not found any field matching this name.
        		    return array(
        		        "status" => "ko",
        		        "error" => "Field not valid."
        		    );      
            }
            
            $affected_rows = $this->db->modify($query, array(
                $field_value, $id
            ));		
		    return array(
		        "status" => "ok",
		        "affected_rows" => intval($affected_rows)
		    );           
		   
		}
		
		public function fetchItems($id_parent, $lang, $offset=null, $howmany=null, $filter=null, $search=null, $orderby=null) {
		    $rs = $this->db->select(self::QUERY_SELECT_ITEMS_BY_PARENT, array(
                $id_parent, $lang
            ));
            $items = $rs->fetchAll(\PDO::FETCH_ASSOC);
            
            // get the complete fields
            for($i = 0; $i < count($items); $i++) {
                $items[$i]["fields"] = $this->getFields($items[$i]["id"]);
            }
            
            // get the parent item
            $parent = array();
            $rs = $this->db->select(self::QUERY_SELECT_ITEM, array(
                $id_parent
            ));
            if( $rs->rowCount() == 1 ) {
                $parent = $rs->fetch(\PDO::FETCH_ASSOC);
            }
            
            return array(
                "status" => "ok",
                "items" => $items,
                "parent" => $parent
            );
		}
		
		public function fetchItem($id) {
            $rs = $this->db->select(self::QUERY_SELECT_ITEM, array(
                $id
            ));
            $item = $rs->fetch(\PDO::FETCH_ASSOC);

            return array(
                "status" => "ok",
                "item" => $item
            );
		}
		
		public function addItem($id_parent, $lang) {
            $last_id = $this->db->insert(self::QUERY_ADD_ITEM, array(
                $id_parent, $lang
            ));
            
            return array(
                "status" => "ok",
                "last_id" => intval($last_id)
            );
		}
		
		public function deleteItem($id) {
		    $affected_rows = $this->db->modify(self::QUERY_DELETE_ITEM, array($id));

		    return array(
		        "status" => "ok",
		        "affected_rows" => intval($affected_rows)
		    );		    
		}
		
		private function getField($idfd, $id_finalitem) {
		    print_r($idfd . " " . $id_finalitem);die();
		    $rs = $this->db->select(self::QUERY_GET_FIELD, array(
                $idfd, $id_finalitem     
            ));
            return $rs->fetch(\PDO::FETCH_ASSOC);
		}
		
		private function getFieldDefinition($id, $field_name) {
            $fields = $this->getFields($id);
            
            foreach($fields as $field) {
                if( $field["field_name"] == $field_name ) {
                    return $field;
                }
            }
		}
		
		private function getOptions() {
            $options = array();
            $rs = $this->db->select(self::QUERY_SELECT_OPTIONS, array());
            while($row = $rs->fetch(\PDO::FETCH_ASSOC)) {
                $options[$row["option_name"]] = json_decode($row["option_value"]);
            }
            return $options;
		}
		
        private function getParent($id) {
            $rs = $this->db->select(self::QUERY_GET_PARENT, array(
                $id
            ));
            $parent = $rs->fetch(\PDO::FETCH_ASSOC);
            
            return $parent["id"] ? $parent : null;
        }
		
        private function getParents($id) {
            $parents = array();
            
            $current_id = $id;
            while($parent = $this->getParent($current_id)) {
                $current_id = $parent["id"];
                array_push($parents, $parent);
            }
            
            return $parents;
        }
		
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
    }
    