<?php
	include("src/config.php");
	include("src/DB.php");
	include("src/DataEngine.php");
	
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
        
        /**
         * @covers DataEngine::fetchItem
         * @covers DataEngine::getFields
         */        
        public function testFetchItem() {
            $item = $this->de->fetchItem(1);
            $this->assertEquals($item["id"], 1);
            $this->assertEquals($item["name"], "Homepage");
            $this->assertEquals(array_key_exists("field_for_all", $item["fields"]), true);
            $this->assertEquals(array_key_exists("field_for_homepage", $item["fields"]), true);
            $this->assertEquals(array_key_exists("field_for_level_1", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_2", $item["fields"]), false);
            $this->assertEquals(array_key_exists("author_description_for_music_childs", $item["fields"]), false);    

            $item = $this->de->fetchItem(3);
            $this->assertEquals($item["id"], 3);
            $this->assertEquals($item["name"], "Products");
            $this->assertEquals(array_key_exists("field_for_all", $item["fields"]), true);
            $this->assertEquals(array_key_exists("field_for_homepage", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_1", $item["fields"]), true);
            $this->assertEquals(array_key_exists("field_for_level_2", $item["fields"]), false);
            $this->assertEquals(array_key_exists("author_description_for_music_childs", $item["fields"]), false);    
             
            $item = $this->de->fetchItem(5);
            $this->assertEquals($item["id"], 5);
            $this->assertEquals($item["name"], "Music");
            $this->assertEquals(array_key_exists("field_for_all", $item["fields"]), true);
            $this->assertEquals(array_key_exists("field_for_homepage", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_1", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_2", $item["fields"]), true);
            $this->assertEquals(array_key_exists("author_description_for_music_childs", $item["fields"]), false);
            
            $item = $this->de->fetchItem(8);
            $this->assertEquals($item["id"], 8);
            $this->assertEquals($item["name"], "Michael Bublé");
            $this->assertEquals(array_key_exists("field_for_all", $item["fields"]), true);
            $this->assertEquals(array_key_exists("field_for_homepage", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_1", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_2", $item["fields"]), false);
            $this->assertEquals(array_key_exists("author_description_for_music_childs", $item["fields"]), true);  
        }

        /**
         * @covers DataEngine::fetchItems
         */		
		public function testFetchItems() {
			$result = $this->de->fetchItems(0, "en");
			$this->assertEquals(count($result), 1);
			
			$result = $this->de->fetchItems(3, "en");
			$this->assertEquals(count($result), 2);
		}
		
		public function testAddItem() {
			$result = $this->de->fetchItems(0, "en");
			$n_items_before = count($result);
			
			$this->de->addItem(0, "en");
			$result = $this->de->fetchItems(0, "en");
			$n_items_after = count($result);
			
			$this->assertEquals($n_items_after - $n_items_before, 1);
		}
		
		public function testSaveItemField() {
			$this->de->saveItemField(1, "name", "Test");
			$this->de->saveItemField(1, "slug", "test");
			
			$result = $this->de->fetchItem(1);
			
			$this->assertEquals($result["name"], "Test");
			$this->assertEquals($result["slug"], "test");
		}
        
        public function testAddFieldDefinition() {
            /*
            $this->de->addFieldDefinition(0, "field_for_all", "text", "", -1);
            $this->de->addFieldDefinition(0, "field_for_homepage", "text", "", 0);
            $this->de->addFieldDefinition(0, "field_for_level_1", "text", "", 1);
            $this->de->addFieldDefinition(0, "field_for_level_2", "text", "", 2);
            $this->de->addFieldDefinition(3, "price_for_products", "text", "", 0);
            */
        }
		
		public function tearDown() {
			//
		}
		
	}