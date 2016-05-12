<?php
    namespace CMS;

    class DB {

        const ERROR_CONNECTION = 'Error connecting to database';
    	private $handler;
	
		function __construct($host, $dbname, $dbuser, $dbpass) {
			try {
				$this->handler = new \PDO(
					"mysql:host=$host;dbname=$dbname",
					$dbuser,
					$dbpass,
					array(
						\PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
						\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
					)
				);
			} catch(\PDOException $e) {
				echo $e->getMessage();
				die(self::ERROR_CONNECTION);
			}
		}
		
		public function modify($query, $data = Array()){
			try {
				$stmt = $this->handler->prepare($query);
				$stmt->execute($data);
				return $stmt->rowCount();
			} catch(\PDOException $e) {
				echo $e->getMessage();
			}
		}
		
		public function insert($query, $data = Array()){
			try {
				$stmt = $this->handler->prepare($query);
				$stmt->execute($data);
				return $this->handler->lastInsertId();
			} catch(\PDOException $e) {
				echo $e->getMessage();
			}
		}
		
		public function getLastId(){
			return $this->handler->lastInsertId();
		}
		
		public function select($query, $data = Array()){
			try {
				$stmt = $this->handler->prepare($query);
				$stmt->execute($data);
				return $stmt;
			} catch(\PDOException $e) {
				echo $e->getMessage();
			}
		}
		
		public function exec($sql) {
			$result = $this->handler->exec($sql);
		}
		
    }
    