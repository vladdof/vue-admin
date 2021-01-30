<?php

    session_start();
    if ($_SESSION['auth'] != true) {
        header('HTTP/1.0 403 Forbidden');
        die;
    }

    $name_file = '../../fsferggd.html';

    if (file_exists($name_file)) {
        unlink($name_file);
    } else {
        echo 'Файл $name_file не существует';
        header('HTTP/1.0 400 Bad Request');
    }
