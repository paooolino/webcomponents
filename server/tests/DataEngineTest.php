<?php
	include("config.php");
	include("DB.php");
	include("DataEngine.php");
	
	// The tests for a class DataEngine go into a class DataEngineTest.
	// The test class inherits (most of the time) from PHPUnit_Framework_TestCase.
	class DataEngineTest extends PHPUnit_Framework_TestCase {
		private $db;
		private $de;
		
		function __construct() {
			$this->db = new \CMS\DB(\CMS\DB_HOST, \CMS\DB_NAME, \CMS\DB_USER, \CMS\DB_PASS);
			$this->de = new \CMS\DataEngine($this->db);		
			$this->de->db->exec(file_get_contents("startup_database.sql"));	
		}
		
		public static function setUpBeforeClass() {
			//
		}
		
		// The tests are public methods that are named test*
		public function testDummy() {
			// inside the test methods, assertion methods such as assertEquals()
			$this->assertEquals("c9", \CMS\DB_NAME);
		}
		
		public static function tearDownAfterClass() {
			//
		}
		
	}