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

        public function testGetOptions() {
            $options = $this->de->getOptions();

            $this->assertEquals(array_key_exists("languages", $options), true);
            $this->assertEquals($options["languages"]["main_language"], "en");
        }
        
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

            $item = $this->de->fetchItem(9);
            $this->assertEquals($item["id"], 9);
            $this->assertEquals($item["name"], "Madonna");
            $this->assertEquals(array_key_exists("field_for_all", $item["fields"]), true);
            $this->assertEquals(array_key_exists("field_for_homepage", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_1", $item["fields"]), false);
            $this->assertEquals(array_key_exists("field_for_level_2", $item["fields"]), false);
            $this->assertEquals(array_key_exists("author_description_for_music_childs", $item["fields"]), true);  
            $this->assertEquals($item["fields"]["author_description_for_music_childs"], "A rising star.");
        }
	
		public function testFetchItems() {
			$result = $this->de->fetchItems(0, "en");
			$this->assertEquals(count($result), 1);
            $this->assertEquals(count($result[0]["fields"]), 2);
			
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
            // save internal field
			$this->de->saveItemField(1, "name", "Test");
			$this->de->saveItemField(1, "slug", "test");
			
			$result = $this->de->fetchItem(1);
			$this->assertEquals($result["name"], "Test");
			$this->assertEquals($result["slug"], "test");
            
            // save external field
            $this->de->saveItemField(8, "author_description_for_music_childs", "An old style folk.");
            
            $result = $this->de->fetchItem(8);
            $this->assertEquals($result["fields"]["author_description_for_music_childs"], "An old style folk.");
        
            $this->de->saveItemField(8, "author_description_for_music_childs", "An old style folk that rocks!");

            $result = $this->de->fetchItem(8);
            $this->assertEquals($result["fields"]["author_description_for_music_childs"], "An old style folk that rocks!");
        }
        
        public function testAddFieldDefinition() {
            $this->de->addFieldDefinition(5, "author_picture", "text", "", 1);
            
            $item = $this->de->fetchItem(8);
            $this->assertEquals(array_key_exists("author_picture", $item["fields"]), true);
        }

        public function testAuth() {
            $token = $this->de->auth("admin", "admin");
            $this->assertNotEquals($token, "");
            
            $token = $this->de->auth("admin", "wrong password");
            $this->assertEquals($token, "");
            
            $token = $this->de->auth("wrong username", "wrong password");
            $this->assertEquals($token, "");
            
            $token = $this->de->auth("", "");
            $this->assertEquals($token, "");
        }
        
        public function testDeleteItem() {
            $affected_rows = $this->de->deleteItem(8);
            $this->assertEquals($affected_rows, 1);
            
            $item = $this->de->fetchItem(8);
            $this->assertEquals($item, 0);
            
            $affected_rows = $this->de->deleteItem(8);
            $this->assertEquals($affected_rows, 0);
        }
        
		public function tearDown() {
			//
		}
		
	}