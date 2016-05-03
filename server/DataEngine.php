<?php
    namespace CMS;
    
    require_once('vendor/autoload.php');
    use \Firebase\JWT\JWT;

    class DataEngine {

        const QUERY_SELECT_USERS    = "SELECT * FROM users WHERE username = ? AND password = ?";
        const QUERY_SELECT_ITEMS    = "SELECT * FROM items WHERE id_parent = ?";
        const QUERY_ADD_ITEM        = "INSERT INTO items (id_parent) VALUES (?)";
        const QUERY_DELETE_ITEM     = "DELETE FROM items WHERE id = ?";
        
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
                "authcode" => JWT::encode($token, \CMS\AUTH_JWT_KEY)
            );
		}
		
		public function fetchItems($id_parent, $offset, $howmany, $filter, $search, $orderby) {
		    $rs = $this->db->select(self::QUERY_SELECT_ITEMS, array(
		        $id_parent
		    ));
		    $items = $rs->fetchAll(\PDO::FETCH_ASSOC);
		    
		    return array(
		        "status" => "ok",
		        "items" => $items
		    );
		}
		
		public function addItem($id_parent) {
		    $last_id = $this->db->insert(self::QUERY_ADD_ITEM, array($id_parent));

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
    }
    