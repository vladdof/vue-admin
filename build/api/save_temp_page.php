<?php

    session_start();
    if ($_SESSION['auth'] != true) {
        header('HTTP/1.0 403 Forbidden');
        die;
    }

    $_POST = json_decode(file_get_contents('php://input'), true);
    var_dump($_POST);
    $new_file = '../../fsferggd.html';

    if ($_POST['html']) {
        file_put_contents($new_file, $_POST['html']);
    } else {
        header('HTTP/1.0 400 Bad Request');
    }
