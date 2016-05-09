<?php
    namespace CMS;
    
    require_once('vendor/autoload.php');
    use \Firebase\JWT\JWT;

    class DataEngine {

        const QUERY_SELECT_USERS            = "SELECT * FROM users WHERE username = ? AND password = ?";
        const QUERY_SELECT_ITEMS_BY_PARENT  = "SELECT * FROM items WHERE id_parent = ? AND lang = ?";
        const QUERY_SELECT_ITEM             = "SELECT * FROM items WHERE id = ?";
        const QUERY_ADD_ITEM                = "INSERT INTO items (id_parent, lang) VALUES (?, ?)";
        const QUERY_DELETE_ITEM             = "DELETE FROM items WHERE id = ?";
        const QUERY_UPDATE_NAME             = "UPDATE items SET name = ? WHERE id = ?";
        const QUERY_UPDATE_SLUG             = "UPDATE items SET slug = ? WHERE id = ?";
        const QUERY_SELECT_OPTIONS          = "SELECT * FROM options";
        
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
		
		public function saveItemField($id, $field, $value) {
            $query = "";
            switch( $field ) {
                case "name":
                    $query = self::QUERY_UPDATE_NAME;
                    break;
                case "slug":
                    $query = self::QUERY_UPDATE_SLUG;
                    break;
                default:
        		    return array(
        		        "status" => "ko",
        		        "error" => "Field not valid."
        		    );                    
            }
            
            $affected_rows = $this->db->modify($query, array(
                $value, $id
            ));		
		    return array(
		        "status" => "ok",
		        "affected_rows" => intval($affected_rows)
		    );           
		   
		}
		
		public function fetchItems($id_parent, $lang, $offset, $howmany, $filter, $search, $orderby) {
		    $rs = $this->db->select(self::QUERY_SELECT_ITEMS_BY_PARENT, array(
                $id_parent, $lang
            ));
            $items = $rs->fetchAll(\PDO::FETCH_ASSOC);
            
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
		
		private function getOptions() {
            $options = array();
            $rs = $this->db->select(self::QUERY_SELECT_OPTIONS, array());
            while($row = $rs->fetch(\PDO::FETCH_ASSOC)) {
                $options[$row["option_name"]] = json_decode($row["option_value"]);
            }
            return $options;
		}
    }
    