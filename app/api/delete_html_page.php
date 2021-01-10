<?php

    $_POST = json_decode(file_get_contents('php://input'), true);

    $name_file = '../../' . $_POST['name'];

    if (file_exists($name_file)) {
        unlink($name_file);
    } else {
        echo 'Файл $name_file не существует';
        header('HTTP/1.0 400 Bad Request');
    }
