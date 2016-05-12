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
		}
		
		public function setUp() {
			$this->de->db->exec(file_get_contents("startup_database.sql"));	
		}
		
		// The tests are public methods that are named test*
		public function testDummy() {
			// inside the test methods, assertion methods such as assertEquals()
			$this->assertEquals("1", 1);
		}
		
		public function testFetchItems() {
			$result = $this->de->fetchItems(0, "en");
			$this->assertEquals(count($result["items"]), 4);
			$this->assertEquals(count($result["parent"]), 0);
			
			$result = $this->de->fetchItems(3, "en");
			$this->assertEquals(count($result["items"]), 2);
			$this->assertEquals($result["parent"]["id"], 3);
		}
		
		public function testAddItem() {
			$result = $this->de->fetchItems(0, "en");
			$n_items_before = count($result["items"]);
			
			$this->de->addItem(0, "en");
			$result = $this->de->fetchItems(0, "en");
			$n_items_after = count($result["items"]);
			
			$this->assertEquals($n_items_after - $n_items_before, 1);
		}
		
		public function testSaveItemField() {
			$this->de->saveItemField(1, "name", "Test");
			$this->de->saveItemField(1, "slug", "test");
			
			$result = $this->de->fetchItem(1);
			
			$this->assertEquals($result["item"]["name"], "Test");
			$this->assertEquals($result["item"]["slug"], "test");
		}
		
		public function tearDown() {
			//
		}
		
	}