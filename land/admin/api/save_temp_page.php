<?php

    $_POST = json_decode(file_get_contents('php://input'), true);
    var_dump($_POST);
    $new_file = '../../temp.html';

    if ($_POST['html']) {
        file_put_contents($new_file, $_POST['html']);
    } else {
        header('HTTP/1.0 400 Bad Request');
    }