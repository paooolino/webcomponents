Configuration setup
--------------------
cp src/config.sample.php src/config.php
 

Installing dependencies
-------------------------
composer install


Running tests
---------------
cd server
vendor/bin/phpunit tests
(an html coverage report is generated in the coverage folder)


Generate docs
---------------
cd server
vendor/bin/apigen generate --config apigen.conf