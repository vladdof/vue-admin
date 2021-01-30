<?php

    session_start();
    if ($_SESSION['auth'] != true) {
        header('HTTP/1.0 403 Forbidden');
        die;
    }

    $_POST = json_decode(file_get_contents('php://input'), true);

    $new_file = '../../' . $_POST['name'] . '.html';

    if (file_exists($new_file)) {
        header('HTTP/1.0 400 Bad Request');
        echo 'Файл $name_file существует';
    } else {
        // 'w' параметр для записи
        fopen($new_file, 'w');
    }
