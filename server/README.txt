Configuration setup
--------------------
cp config.sample.php config.php
 

Installing dependencies
-------------------------
composer install


Running tests
---------------
vendor/bin/phpunit tests


Generate docs
---------------
vendor/bin/apigen generate --config apigen.conf