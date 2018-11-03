<?php 
# header('Content-Type: text/event-stream');
header('Content-Type: application/x-httpd-php');  
header('Cache-Control: no-cache'); 
# error: response has a MIME type : application/x-httpd-php
# expect text/event-stream
$time = date('r'); 
echo "data: The server time is: {$time}\n\n"; 
flush(); 
?>